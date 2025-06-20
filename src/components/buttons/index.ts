import { CUSTOM_BUTTON_STYLE } from '@/styles/buttons/buttons';
import { ButtonType } from '@/types/enums';
import ButtonBuilder from '@/utils/button-builder';

export default class Button {
  protected button: ButtonBuilder;

  constructor(parameters: {
    style: keyof typeof CUSTOM_BUTTON_STYLE;
    textContent: string;
    callback: () => void | Promise<void>;
  }) {
    this.button = new ButtonBuilder({
      type: ButtonType.BUTTON,
      className: ['button', ...CUSTOM_BUTTON_STYLE[parameters.style]],
      textContent: parameters.textContent,
      callback: parameters.callback,
    });
  }

  public getElement(): HTMLElement {
    return this.button.getElement();
  }

  public disableButton(): void {
    this.button.disableButton();
  }

  public enableButton(): void {
    this.button.enableButton();
  }

  public changeTextContent(text: string): void {
    this.button.applyTextContent(text);
  }
}
