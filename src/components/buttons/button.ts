import { CUSTOM_BUTTON_STYLE } from '@/styles/buttons/buttons';
import { BUTTON_TYPE } from '@/types/enums';
import { ButtonBuilder } from '@/utils/button-builder';

export class Button {
  protected button: ButtonBuilder;

  constructor(parameters: {
    style: keyof typeof CUSTOM_BUTTON_STYLE;
    textContent: string;
    callback: () => void;
  }) {
    this.button = new ButtonBuilder({
      tag: 'button',
      type: BUTTON_TYPE.BUTTON,
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
}
