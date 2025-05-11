import { CUSTOM_INPUT_STYLE, CUSTOM_LABEL_STYLE } from '@/styles/inputs/inputs';
import { InputType } from '@/types/enums';
import type { InputComponent } from '@/types/interfaces';
import { ElementBuilder } from '@/utils/element-builder';
import { InputBuilder } from '@/utils/input-builder';

export default class Input {
  private container: ElementBuilder;
  private input: InputBuilder;
  private label: ElementBuilder;
  private isError: boolean;
  private icon: HTMLElement | undefined;

  constructor(parameters: InputComponent) {
    this.isError = false;
    const { placeholder, id, callback, labelText, isRequired, value, type, className } = parameters;

    this.container = new ElementBuilder({
      tag: 'div',
      className: className ?? '',
    });

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

    this.container.getElement().append(this.label.getElement(), this.input.getElement());

    if (type === InputType.PASSWORD) {
      this.addPasswordIcon(type);
    }
  }

  public getElement(): HTMLElement {
    return this.container.getElement();
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

  private addPasswordIcon(type: InputType): void {
    let currentType = type;
    this.container.applyCssClasses('relative');
    this.icon = new ElementBuilder({
      tag: 'div',
      className: [
        'h-6',
        'w-6',
        'absolute',
        'top-9.5',
        'right-2',
        'bg-[url(@/assets/icons/eye-outline.svg)]',
        'hover:cursor-pointer',
      ],
      callback: (): void => {
        this.toggleIcon(
          'bg-[url(@/assets/icons/eye-outline.svg)]',
          'bg-[url(@/assets/icons/eye-off-outline.svg)]'
        );

        if (currentType === InputType.PASSWORD) {
          currentType = InputType.TEXT;
          this.input.applyAttributes({ type: InputType.TEXT });
        } else {
          currentType = InputType.PASSWORD;
          this.input.applyAttributes({ type: InputType.PASSWORD });
        }
      },
    }).getElement();

    this.container.getElement().append(this.icon);
  }

  private toggleIcon(firstIcon: string, secondIcon?: string): void {
    if (this.icon) {
      this.icon.classList.toggle(firstIcon);

      if (secondIcon) {
        this.icon.classList.toggle(secondIcon);
      }
    }
  }
}
