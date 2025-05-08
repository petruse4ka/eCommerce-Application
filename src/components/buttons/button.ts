import { CustomButtonStyle } from '@/styles/buttons/buttons';
import { ButtonType } from '@/types/enums';
import { ButtonBuilder } from '@/utils/button-builder';

export class Button {
  protected button: ButtonBuilder;

  constructor(parameters: {
    style: keyof typeof CustomButtonStyle;
    textContent: string;
    callback: () => void;
  }) {
    this.button = new ButtonBuilder({
      tag: 'button',
      type: ButtonType.BUTTON,
      className: ['button', ...CustomButtonStyle[parameters.style]],
      textContent: parameters.textContent,
      callback: parameters.callback,
    });
    this.render();
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

  protected render(): void {
    this.button.getElement();
  }
}
