import {
  CHECKBOX_STYLE,
  CUSTOM_INPUT_STYLE,
  CUSTOM_LABEL_STYLE,
  ERROR_MESSAGE_STYLE,
  ICON_IN_INPUT,
} from '@/styles/inputs/inputs';
import { InputType } from '@/types/enums';
import type { InputComponent } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';
import InputBuilder from '@/utils/input-builder';

export default class Input {
  private container: ElementBuilder;
  private input: InputBuilder;
  private label: ElementBuilder;
  private message: ElementBuilder;
  private isError: boolean;
  private icon: HTMLElement | undefined;

  constructor(parameters: InputComponent) {
    this.isError = false;
    const { placeholder, id, callback, labelText, value, type, className } = parameters;
    const { isDisabled, isRequired } = parameters;

    this.container = new ElementBuilder({
      tag: 'div',
      className: className ?? '',
    });

    this.input = new InputBuilder({
      type,
      id,
      className: Input.getInputClasses(type),
      placeholder,
      callback,
      value,
      attributes: Input.getAutocomplete(id),
      required: isRequired,
      disabled: isDisabled,
      eventType: parameters.eventType,
    });

    this.addEventListeners(type);

    this.label = new ElementBuilder({
      tag: 'label',
      className: [...CUSTOM_LABEL_STYLE['LABEL_DEFAULT']],
      textContent: isRequired ? `${labelText}*` : labelText,
      attributes: { for: id },
    });

    if (type === InputType.CHECKBOX) {
      this.container.getElement().append(this.input.getElement(), this.label.getElement());
    } else {
      this.container.getElement().append(this.label.getElement(), this.input.getElement());
    }

    this.message = new ElementBuilder({ tag: 'div', className: ERROR_MESSAGE_STYLE });
    this.container.getElement().append(this.message.getElement());

    if (type === InputType.PASSWORD) this.addPasswordIcon(type);
  }

  public static getAutocomplete(id: string): { autocomplete: string } | undefined {
    if (id === 'password') return { autocomplete: 'current-password' };
    return id === 'email' ? { autocomplete: 'email' } : undefined;
  }

  private static getInputClasses(type: InputType): string[] {
    if (type === InputType.CHECKBOX) {
      return [...CHECKBOX_STYLE];
    }
    if (type === InputType.PASSWORD) {
      return [...CUSTOM_INPUT_STYLE.INPUT_PASSWORD];
    }
    return [...CUSTOM_INPUT_STYLE.INPUT_DEFAULT];
  }

  public getElement(): HTMLElement {
    return this.container.getElement();
  }

  public getValue(): string {
    return this.input.getValue();
  }

  public setError(message: string): void {
    this.isError = true;
    this.message.getElement().textContent = message;
    this.toggleErrorStyle();
  }

  public clearError(): void {
    this.isError = false;
    this.message.getElement().textContent = '';
    this.toggleErrorStyle();
  }

  public toggleErrorStyle(): void {
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

  private addEventListeners(type: InputType): void {
    if (type === InputType.EMAIL || type === InputType.PASSWORD) {
      this.input.getElement().addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === ' ') {
          event.preventDefault();
        }
      });
    }
  }

  private addPasswordIcon(type: InputType): void {
    let currentType = type;
    this.container.applyCssClasses('relative');
    this.icon = new ElementBuilder({
      tag: 'div',
      className: ICON_IN_INPUT,
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
