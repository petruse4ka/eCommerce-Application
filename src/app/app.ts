import { BaseComponent } from '@/components/base/component';
import Footer from '@/components/footer';
import Header from '@/components/header/header';
import AboutPage from '@/pages/about';
import AccountPage from '@/pages/account';
import ContactsPage from '@/pages/contacts';
import DeliveryPage from '@/pages/delivery';
import { ErrorPage } from '@/pages/errorpage';
import HomePage from '@/pages/homepage';
import { LoginPage } from '@/pages/login';
import RegistrationPage from '@/pages/registration';
import ReturnsPage from '@/pages/returns';
import TermsPage from '@/pages/terms';
import { Router } from '@/router/router';
import { userState } from '@/store/user-state';
import { APP_STYLE } from '@/styles/app/app';
import { Route } from '@/types/enums';

export class App extends BaseComponent {
  private header: Header;
  private footer: Footer;
  private homePage: HomePage = new HomePage();
  private loginPage: LoginPage = new LoginPage();
  private contactPage: ContactsPage = new ContactsPage();
  private aboutPage: AboutPage = new AboutPage();
  private registrationPage: RegistrationPage = new RegistrationPage();
  private errorPage: ErrorPage = new ErrorPage();
  private deliveryPage: DeliveryPage = new DeliveryPage();
  private termsPage: TermsPage = new TermsPage();
  private returnsPage: ReturnsPage = new ReturnsPage();
  private accountPage: AccountPage = new AccountPage();
  private router: Router;
  private currentPage: BaseComponent;

  private readonly routes = new Map<Route, BaseComponent>([
    [Route.HOME, this.homePage],
    [Route.ABOUT, this.aboutPage],
    [Route.CONTACTS, this.contactPage],
    [Route.LOGIN, this.loginPage],
    [Route.REGISTRATION, this.registrationPage],
    [Route.ERROR, this.errorPage],
    [Route.DELIVERY, this.deliveryPage],
    [Route.TERMS, this.termsPage],
    [Route.RETURNS, this.returnsPage],
    [Route.ACCOUNT, this.accountPage],
  ]);

  constructor() {
    super({ tag: 'div', className: APP_STYLE });
    this.router = new Router(Route.HOME);
    this.setupRoutes();
    this.header = new Header();
    this.footer = new Footer();

    const defaultRoute = this.router.getDefaultRoute();

    if (defaultRoute === Route.ACCOUNT && !userState.getAuthorizationState()) {
      Router.followRoute(Route.LOGIN);
      this.currentPage = this.routes.get(Route.LOGIN) || this.errorPage;
    } else {
      this.currentPage = this.routes.get(defaultRoute) || this.errorPage;
    }

    this.render();
  }

  protected render(): void {
    this.component.append(
      this.header.getElement(),
      this.currentPage.getElement(),
      this.footer.getElement()
    );
  }

  private setupRoutes(): void {
    for (const [route, page] of this.routes.entries()) {
      if (route === Route.LOGIN || route === Route.REGISTRATION) {
        this.router.addRoute(route, () => {
          if (userState.getAuthorizationState()) {
            Router.followRoute(Route.HOME);
            return;
          }
          this.showPage(page);
        });
      } else if (route === Route.ACCOUNT) {
        this.router.addRoute(route, () => {
          if (!userState.getAuthorizationState()) {
            Router.followRoute(Route.LOGIN);
            return;
          }
          this.showPage(page);
        });
      } else {
        this.router.addRoute(route, () => this.showPage(page));
      }
    }
  }

  private showPage(newPage: BaseComponent): void {
    if (this.currentPage !== newPage) {
      this.currentPage.getElement().remove();
      this.currentPage = newPage;
      this.component.insertBefore(this.currentPage.getElement(), this.footer.getElement());
    }
  }
}
