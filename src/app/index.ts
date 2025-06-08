import API from '@/api';
import BaseComponent from '@/components/base';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import { CONTACTS, DELIVERY, RETURNS, TERMS } from '@/constants/additional';
import AboutPage from '@/pages/about';
import AccountPage from '@/pages/account';
import AdditionalPage from '@/pages/additional';
import CartPage from '@/pages/cart';
import CatalogPage from '@/pages/catalog';
import ErrorPage from '@/pages/errorpage';
import HomePage from '@/pages/homepage';
import LoginPage from '@/pages/login';
import ProductPage from '@/pages/product';
import RegistrationPage from '@/pages/registration';
import Router from '@/router';
import { userState } from '@/store/user-state';
import { APP_STYLE } from '@/styles/app/app';
import { Route } from '@/types/enums';

export default class App extends BaseComponent {
  private header: Header;
  private footer: Footer;
  private homePage: HomePage = new HomePage();
  private loginPage: LoginPage = new LoginPage();
  private catalogPage: CatalogPage = new CatalogPage();
  private productPage: ProductPage = new ProductPage();
  private contactPage: AdditionalPage = new AdditionalPage(CONTACTS);
  private aboutPage: AboutPage = new AboutPage();
  private registrationPage: RegistrationPage = new RegistrationPage();
  private errorPage: ErrorPage = new ErrorPage();
  private deliveryPage: AdditionalPage = new AdditionalPage(DELIVERY);
  private termsPage: AdditionalPage = new AdditionalPage(TERMS);
  private returnsPage: AdditionalPage = new AdditionalPage(RETURNS);
  private accountPage: AccountPage = new AccountPage();
  private cartPage: CartPage = new CartPage();
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
    [Route.CATALOG, this.catalogPage],
    [Route.PRODUCT, this.productPage],
    [Route.CART, this.cartPage],
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
    void API.authentication();
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
