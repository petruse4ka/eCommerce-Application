import { MODAL } from '@/styles/modal';
import ElementBuilder from '@/utils/element-builder';

import BaseComponent from '../base';
import Button from '../buttons';

export default class Modal extends BaseComponent {
  constructor(parameters: { title: string; content: HTMLElement }) {
    super({
      tag: 'dialog',
      className: MODAL.COMPONENT,
      attributes: { 'arial-label': parameters.title },
    });

    this.createHeader(parameters.title);
    this.createContent(parameters.content);
  }

  public showModal(): void {
    if (this.component instanceof HTMLDialogElement) {
      this.component.showModal();
    }
  }

  public closeModal(): void {
    if (this.component instanceof HTMLDialogElement) {
      this.component.close();
    }
  }

  private createHeader(titleTest: string): void {
    const container = new ElementBuilder({
      tag: 'div',
      className: MODAL.HEADER.CONTAINER,
    }).getElement();

    const title = new ElementBuilder({
      tag: 'h3',
      className: MODAL.HEADER.TITLE,
      textContent: titleTest,
    }).getElement();

    const closeButton = new Button({
      style: 'CLOSE',
      textContent: 'Close',
      callback: (): void => this.closeModal(),
    }).getElement();

    container.append(title, closeButton);
    this.component.append(container);
  }

  private createContent(content: HTMLElement): void {
    const container = new ElementBuilder({
      tag: 'div',
      className: MODAL.CONTENT.CONTAINER,
    }).getElement();

    container.append(content);
    this.component.append(container);
  }
}
