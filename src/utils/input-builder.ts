import type { InputParameters } from '@/types/interfaces';

import { ElementBuilder } from './element-builder';

export class InputBuilder extends ElementBuilder {
  constructor(parameters: InputParameters) {
    super({ ...parameters });
    this.setInputProperties(
      parameters.type,
      parameters.value,
      parameters.placeholder,
      parameters.readonly
    );
  }

  public getValue(): string {
    if (this.element instanceof HTMLInputElement) {
      return this.element.value;
    }
    return '';
  }

  public setValue(value: string): void {
    if (this.element instanceof HTMLInputElement) {
      this.element.value = value;
    }
  }

  private setInputProperties(
    type: InputParameters['type'],
    value: InputParameters['value'],
    placeholder: InputParameters['placeholder'],
    readonly: InputParameters['readonly']
  ): void {
    if (this.element instanceof HTMLInputElement) {
      this.element.type = type;
    }
    if (value && this.element instanceof HTMLInputElement) {
      this.element.value = value;
    }
    if (placeholder && this.element instanceof HTMLInputElement) {
      this.element.placeholder = placeholder;
    }
    if (readonly && this.element instanceof HTMLInputElement) {
      this.element.readOnly = true;
    }
  }
}
