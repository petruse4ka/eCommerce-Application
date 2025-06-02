import type { ElementParameters } from '@/types/interfaces';

export default class ElementBuilder {
  protected element: HTMLElement;

  constructor(parameters: ElementParameters) {
    this.element = document.createElement(parameters.tag);
    this.applyCssClasses(parameters.className);
    this.applyTextContent(parameters.textContent);
    this.applyCallback(parameters.eventType, parameters.callback);
    this.applyAttributes(parameters.attributes);
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public removeElement(): void {
    this.element.remove();
  }

  public removeCssClasses(className: ElementParameters['className']): void {
    if (className) {
      if (Array.isArray(className)) {
        this.element.classList.remove(...className);
      } else {
        this.element.classList.remove(className);
      }
    }
  }

  public replaceCssClasses(
    removedClasses: ElementParameters['className'],
    appliedClasses: ElementParameters['className']
  ): void {
    this.removeCssClasses(removedClasses);
    this.applyCssClasses(appliedClasses);
  }

  public applyCssClasses(className: ElementParameters['className']): void {
    if (className) {
      if (Array.isArray(className)) {
        this.element.classList.add(...className);
      } else {
        this.element.classList.add(className);
      }
    }
  }

  public applyAttributes(attributes: ElementParameters['attributes']): void {
    if (attributes) {
      for (const [key, value] of Object.entries(attributes)) {
        this.element.setAttribute(key, value);
      }
    }
  }

  public deleteAttributes(attributes: string[]): void {
    if (attributes) {
      for (const value of attributes) {
        this.element.removeAttribute(value);
      }
    }
  }

  public applyTextContent(text?: string): void {
    if (text) {
      this.element.textContent = text;
    }
  }

  private applyCallback(
    eventType: ElementParameters['eventType'] = 'click',
    callback: ElementParameters['callback']
  ): void {
    if (eventType && callback) {
      this.element.addEventListener(eventType, (event: Event) => {
        if (!(this.element instanceof HTMLInputElement)) {
          event.preventDefault();
        }
        callback(event);
      });
    }
  }
}
