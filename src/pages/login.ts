import '@/styles/main.css';

import { BaseComponent } from '@/components/base/component';
import FormAuthorization from '@/components/forms/authorization';
import Overlay from '@/components/overlay/overlay';
import { CONTAINER, FORM_CONTAINER, TITLE } from '@/styles/pages/login';

import { ElementBuilder } from '../utils/element-builder';

export class LoginPage extends BaseComponent {
  private overlay: HTMLElement;

  constructor() {
    super({
      tag: 'div',
      className: CONTAINER,
    });

    this.overlay = new Overlay().getElement();

    this.renderForm();
  }

  private renderForm(): void {
    const formContainer = new ElementBuilder({
      tag: 'div',
      className: FORM_CONTAINER,
    }).getElement();

    const title = new ElementBuilder({
      tag: 'h2',
      className: TITLE,
      textContent: 'Вход',
    }).getElement();

    const form = new FormAuthorization().getElement();

    formContainer.append(title, form);

    this.component.append(formContainer, this.overlay);
  }
}
