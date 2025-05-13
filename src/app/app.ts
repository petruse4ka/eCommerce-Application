import { BaseComponent } from '@/components/base/component';
import Footer from '@/components/footer';
import Header from '@/components/header/header';
import { ErrorPage } from '@/pages/404';
import { HomePage } from '@/pages/homepage';
import { LoginPage } from '@/pages/login';
import RegistrationPage from '@/pages/registration';
import { Router } from '@/router/router';
import { APP_STYLE } from '@/styles/app/app';
import { Route } from '@/types/enums';

export class App extends BaseComponent {
  private header: Header;
  private footer: Footer;
  private homePage: HomePage = new HomePage();
  private loginPage: LoginPage = new LoginPage();
  private registrationPage: RegistrationPage = new RegistrationPage();
  private errorPage: ErrorPage = new ErrorPage();
  private router: Router;
  private currentPage: BaseComponent = this.homePage;

  constructor() {
    super({ tag: 'div', className: APP_STYLE });
    this.router = new Router(Route.HOME);
    this.setupRoutes();
    this.header = new Header();
    this.footer = new Footer();
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
    this.router.addRoute(Route.HOME, () => this.showPage(this.homePage));

    this.router.addRoute(Route.LOGIN, () => this.showPage(this.loginPage));

    this.router.addRoute(Route.REGISTRATION, () => this.showPage(this.registrationPage));

    this.router.addRoute(Route.ERROR, () => this.showPage(this.errorPage));
  }

  private showPage(newPage: BaseComponent): void {
    if (this.currentPage !== newPage) {
      this.currentPage.getElement().remove();
      this.currentPage = newPage;
      this.component.append(this.currentPage.getElement());
    }
  }
}
