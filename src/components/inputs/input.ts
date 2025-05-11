import { CUSTOM_INPUT_STYLE, CUSTOM_LABEL_STYLE } from '@/styles/inputs/inputs';
import type { InputComponent } from '@/types/interfaces';
import { ElementBuilder } from '@/utils/element-builder';
import { InputBuilder } from '@/utils/input-builder';

export default class Input {
  private container: HTMLElement;
  private input: InputBuilder;
  private label: ElementBuilder;
  private isError: boolean;

  constructor(parameters: InputComponent) {
    this.isError = false;
    const { placeholder, id, callback, labelText, isRequired, value, type, className } = parameters;

    this.container = new ElementBuilder({
      tag: 'div',
      className: className ?? '',
    }).getElement();

    this.input = new InputBuilder({
      type,
      id,
      className: [...CUSTOM_INPUT_STYLE['INPUT_DEFAULT']],
      placeholder,
      callback,
      value,
      required: isRequired,
    });

    this.label = new ElementBuilder({
      tag: 'label',
      className: [...CUSTOM_LABEL_STYLE['LABEL_DEFAULT']],
      textContent: isRequired ? `${labelText}*` : labelText,
      attributes: { for: id },
    });

    this.container.append(this.label.getElement(), this.input.getElement());
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  public getValue(): string {
    return this.input.getValue();
  }

  public toggleErrorStyle(): void {
    this.isError = !this.isError;

    if (this.isError) {
      this.label.removeCssClasses([...CUSTOM_LABEL_STYLE['LABEL_DEFAULT']]);
      this.label.applyCssClasses([...CUSTOM_LABEL_STYLE['LABEL_ERROR']]);

      this.input.removeCssClasses([...CUSTOM_INPUT_STYLE['INPUT_DEFAULT']]);
      this.input.applyCssClasses([...CUSTOM_INPUT_STYLE['INPUT_ERROR']]);
    } else {
      this.label.removeCssClasses([...CUSTOM_LABEL_STYLE['LABEL_ERROR']]);
      this.label.applyCssClasses([...CUSTOM_LABEL_STYLE['LABEL_DEFAULT']]);

      this.input.removeCssClasses([...CUSTOM_INPUT_STYLE['INPUT_ERROR']]);
      this.input.applyCssClasses([...CUSTOM_INPUT_STYLE['INPUT_DEFAULT']]);
    }
  }
}
