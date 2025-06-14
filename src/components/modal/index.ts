import { MODAL } from '@/styles/modal';
import ElementBuilder from '@/utils/element-builder';

import BaseComponent from '../base';
import Button from '../buttons';
import FormAddNewAddress from '../forms/add-new-address';
import FormEditUserInfo from '../forms/edit-info';
import FormEditPassword from '../forms/edit-password';

export default class Modal extends BaseComponent {
  private callback: (() => void) | undefined;
  constructor(parameters: {
    title: string;
    content: FormEditUserInfo | FormAddNewAddress | FormEditPassword | ElementBuilder;
    callback?: () => void;
  }) {
    super({
      tag: 'dialog',
      className: MODAL.COMPONENT,
      attributes: { 'aria-label': parameters.title },
    });

    this.callback = parameters.callback;

    if (
      parameters.content instanceof FormEditUserInfo ||
      parameters.content instanceof FormAddNewAddress ||
      parameters.content instanceof FormEditPassword
    ) {
      parameters.content.setCallback(this.closeModal.bind(this));
    }
    this.createHeader(parameters.title);
    this.createContent(parameters.content);
    this.addEventListeners();
  }

  public showModal(): void {
    if (this.component instanceof HTMLDialogElement) {
      document.body.style.overflow = 'hidden';
      this.component.showModal();
    }
  }

  public closeModal(): void {
    if (this.component instanceof HTMLDialogElement) {
      this.component.close();
      document.body.style.overflow = '';
    }

    if (this.callback) {
      this.callback();
    }

    this.component.remove();
  }

  private addEventListeners(): void {
    this.component.addEventListener('mousedown', (event: MouseEvent) => {
      const rect = this.component.getBoundingClientRect();
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.bottom &&
        rect.left <= event.clientX &&
        event.clientX <= rect.right;
      if (!isInDialog) {
        this.closeModal();
      }
    });
  }

  private createHeader(titleText: string): void {
    const container = new ElementBuilder({
      tag: 'div',
      className: MODAL.HEADER.CONTAINER,
    }).getElement();

    const title = new ElementBuilder({
      tag: 'h3',
      className: MODAL.HEADER.TITLE,
      textContent: titleText,
    }).getElement();

    const closeButton = new Button({
      style: 'CLOSE',
      textContent: 'X',
      callback: (): void => this.closeModal(),
    }).getElement();

    container.append(title, closeButton);
    this.component.append(container);
  }

  private createContent(
    content: FormEditUserInfo | FormAddNewAddress | FormEditPassword | ElementBuilder
  ): void {
    const container = new ElementBuilder({
      tag: 'div',
      className: MODAL.CONTENT.CONTAINER,
    }).getElement();

    container.append(content.getElement());
    this.component.append(container);
  }
}
