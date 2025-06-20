import { CUSTOM_BUTTON_STYLE, DEFAULT_BUTTON_WITH_ICON } from '@/styles/buttons/buttons';
import { ButtonType } from '@/types/enums';
import type { customButtonParameters } from '@/types/interfaces';
import ButtonBuilder from '@/utils/button-builder';
import ElementBuilder from '@/utils/element-builder';
import SVGBuilder from '@/utils/svg-builder';

export default class ButtonWithIcon {
  protected button: ButtonBuilder;

  constructor(parameters: customButtonParameters) {
    this.button = new ButtonBuilder({
      type: ButtonType.BUTTON,
      className: [...DEFAULT_BUTTON_WITH_ICON, ...CUSTOM_BUTTON_STYLE[parameters.style]],
      callback: parameters.callback,
    });

    const icon = new SVGBuilder({
      source: parameters.icon.source,
      className: [],
      classNameIcon: parameters.icon.classNameIcon || [],
    }).getElement();

    const text = new ElementBuilder({
      tag: 'span',
      className: parameters.textClassName || [],
      textContent: parameters.textContent,
    }).getElement();

    this.button.getElement().append(icon, text);
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
