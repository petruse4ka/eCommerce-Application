import '@/styles/main.css';

import FormRegistration from '@/components/forms/registration';
import Overlay from '@/components/overlay/overlay';

import { ElementBuilder } from '../utils/element-builder';

export default class RegistrationPage {
  private container: ElementBuilder;
  private overlay: HTMLElement;

  constructor() {
    this.container = new ElementBuilder({
      tag: 'div',
      className: [
        'min-h-screen',
        'font-roboto',
        'bg-[url(@/assets/img/bg-macarons.webp)]',
        'bg-cover',
        'bg-center',
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
      ],
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
      className: [
        'relative',
        'z-1',
        'bg-primary',
        'xl:px-20',
        'xl:py-10',
        'sm:px-10',
        'sm:py-5',
        'px-3',
        'py-3',
        'rounded-xl',
        'mx-10',
        'my-5',
      ],
    }).getElement();

    const title = new ElementBuilder({
      tag: 'h2',
      className: ['text-3xl', 'font-bold', 'text-center'],
      textContent: 'Регистрация',
    }).getElement();

    const form = new FormRegistration().getElement();

    formContainer.append(title, form);

    this.container.getElement().append(formContainer, this.overlay);
  }
}
