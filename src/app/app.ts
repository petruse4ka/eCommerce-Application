import { HomePage } from '@/pages/homepage';
import RegistrationPage from '@/pages/registration';

import { ElementBuilder } from '../utils/element-builder';

export class App {
  private container: ElementBuilder;
  private currentPage: HomePage;
  private registrationPage: RegistrationPage;

  constructor() {
    this.container = new ElementBuilder({ tag: 'div', className: 'font-montserrat' });
    this.currentPage = new HomePage();
    this.registrationPage = new RegistrationPage();
    this.render();
  }

  public getElement(): HTMLElement {
    return this.container.getElement();
  }

  protected render(): void {
    this.container.getElement().append(this.registrationPage.getElement());
  }
}
