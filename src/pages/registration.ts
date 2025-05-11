import '@/styles/main.css';

import FormRegistration from '@/components/forms/registration';
import Overlay from '@/components/overlay/overlay';
import { CONTAINER, FORM_CONTAINER, TITLE } from '@/styles/pages/registration';

import { ElementBuilder } from '../utils/element-builder';

export default class RegistrationPage {
  private container: ElementBuilder;
  private overlay: HTMLElement;

  constructor() {
    this.container = new ElementBuilder({
      tag: 'div',
      className: CONTAINER,
    });

    this.overlay = new Overlay().getElement();

    this.renderForm();
  }

  public getElement(): HTMLElement {
    return this.container.getElement();
  }

  private renderForm(): void {
    const formContainer = new ElementBuilder({
      tag: 'div',
      className: FORM_CONTAINER,
    }).getElement();

    const title = new ElementBuilder({
      tag: 'h2',
      className: TITLE,
      textContent: 'Регистрация',
    }).getElement();

    const form = new FormRegistration().getElement();

    formContainer.append(title, form);

    this.container.getElement().append(formContainer, this.overlay);
  }
}
