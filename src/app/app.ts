import { BaseComponent } from '@/components/base/component';
import Header from '@/components/header/header';
import AboutPage from '@/pages/about';
import ContactsPage from '@/pages/contacts';
import { ErrorPage } from '@/pages/errorpage';
import HomePage from '@/pages/homepage';
import { LoginPage } from '@/pages/login';
import RegistrationPage from '@/pages/registration';
import { Router } from '@/router/router';
import { APP_STYLE } from '@/styles/app/app';
import { Route } from '@/types/enums';

export class App extends BaseComponent {
  private header: Header;
  private homePage: HomePage = new HomePage();
  private loginPage: LoginPage = new LoginPage();
  private contactPage: ContactsPage = new ContactsPage();
  private aboutPage: AboutPage = new AboutPage();
  private registrationPage: RegistrationPage = new RegistrationPage();
  private errorPage: ErrorPage = new ErrorPage();
  private router: Router;
  private currentPage: BaseComponent = this.homePage;

  private readonly routes = new Map<Route, BaseComponent>([
    [Route.HOME, this.homePage],
    [Route.ABOUT, this.aboutPage],
    [Route.CONTACTS, this.contactPage],
    [Route.LOGIN, this.loginPage],
    [Route.REGISTRATION, this.registrationPage],
    [Route.ERROR, this.errorPage],
  ]);

  constructor() {
    super({ tag: 'div', className: APP_STYLE });
    this.router = new Router(Route.HOME);
    this.setupRoutes();
    this.header = new Header();
    this.render();
  }

  protected render(): void {
    this.component.append(this.header.getElement(), this.currentPage.getElement());
  }

  private setupRoutes(): void {
    for (const [route, page] of this.routes.entries()) {
      this.router.addRoute(route, () => this.showPage(page));
    }
  }

  private showPage(newPage: BaseComponent): void {
    if (this.currentPage !== newPage) {
      this.currentPage.getElement().remove();
      this.currentPage = newPage;
      this.component.append(this.currentPage.getElement());
    }
  }
}
