import type { ElementParameters, SelectOption } from '@/types/interfaces';

import ElementBuilder from './element-builder';

export default class SelectBuilder extends ElementBuilder {
  constructor(parameters: Omit<ElementParameters, 'tag'>) {
    super({ ...parameters, tag: 'select' });
    this.removeFocusOnSelect();
  }

  public addOption(value: string, text: string): void {
    const option = new ElementBuilder({
      tag: 'option',
      className: [],
      textContent: text,
      attributes: { value },
    }).getElement();
    this.element.append(option);
  }

  public addOptions(options: SelectOption[]): void {
    for (const option of options) this.addOption(option.value, option.text);
  }

  public getValue(): string {
    if (this.element instanceof HTMLSelectElement) {
      return this.element.value;
    }
    return '';
  }

  public setValue(value: string): void {
    if (this.element instanceof HTMLSelectElement) {
      this.element.value = value;
    }
  }

  private removeFocusOnSelect(): void {
    if (this.element instanceof HTMLSelectElement) {
      this.element.addEventListener('change', () => {
        this.element.blur();
      });
    }
  }
}
