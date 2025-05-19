import type { InputParameters } from '@/types/interfaces';

import ElementBuilder from './element-builder';

export default class InputBuilder extends ElementBuilder {
  constructor(parameters: Omit<InputParameters, 'tag'>) {
    super({ ...parameters, tag: 'input' });

    this.element.id = parameters.id;

    this.setInputProperties(
      parameters.type,
      parameters.value,
      parameters.placeholder,
      parameters.readonly,
      parameters.required,
      parameters.disabled
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
    readonly: InputParameters['readonly'],
    required: InputParameters['required'],
    disabled: InputParameters['disabled']
  ): void {
    if (this.element instanceof HTMLInputElement) {
      this.element.type = type;

      if (value) {
        this.element.value = value;
      }

      if (placeholder) {
        this.element.placeholder = placeholder;
      }

      if (readonly) {
        this.element.readOnly = true;
      }

      if (required) {
        this.element.required = true;
      }

      if (disabled) {
        this.element.disabled = true;
      }
    }
  }
}
