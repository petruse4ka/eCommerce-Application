import type { ElementParameters } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';

export default class BaseComponent {
  protected component: HTMLElement;

  protected constructor(parameters: ElementParameters) {
    this.component = new ElementBuilder(parameters).getElement();
  }

  public getElement(): HTMLElement {
    return this.component;
  }

  public remove(): void {
    this.component.remove();
  }

  public setText(text: string): void {
    this.component.textContent = text;
  }

  public addClass(className: string | string[]): void {
    if (Array.isArray(className)) {
      this.component.classList.add(...className);
    } else {
      this.component.classList.add(className);
    }
  }

  public removeClass(className: string | string[]): void {
    if (Array.isArray(className)) {
      this.component.classList.remove(...className);
    } else {
      this.component.classList.remove(className);
    }
  }

  public toggleClass(className: string): void {
    this.component.classList.toggle(className);
  }
}
