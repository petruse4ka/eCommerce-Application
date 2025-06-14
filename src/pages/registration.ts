import '@/styles/main.css';

import BaseComponent from '@/components/base';
import FormRegistration from '@/components/forms/registration';
import Overlay from '@/components/overlay';
import { PAGE_TITLES } from '@/constants';
import { CONTAINER, FORM_CONTAINER, TITLE } from '@/styles/pages/registration';

import ElementBuilder from '../utils/element-builder';

export default class RegistrationPage extends BaseComponent {
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
      textContent: PAGE_TITLES.REGISTRATION,
    }).getElement();

    const form = new FormRegistration().getElement();

    formContainer.append(title, form);

    this.component.append(formContainer, this.overlay);
  }
}
