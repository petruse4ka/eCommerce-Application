import Button from '@/components/buttons';
import Input from '@/components/inputs';
import { BTN_TEXT } from '@/constants';
import { FORM_PROMO_CODE } from '@/styles/forms/forms';
import { InputType } from '@/types/enums';
import ElementBuilder from '@/utils/element-builder';

export default class FormPromoCode {
  protected form: HTMLElement;
  constructor() {
    this.form = new ElementBuilder({
      tag: 'form',
      className: FORM_PROMO_CODE,
    }).getElement();

    this.render();
  }

  public getElement(): HTMLElement {
    return this.form;
  }

  private render(): void {
    const input = new Input({
      id: 'promo-code',
      type: InputType.TEXT,
      placeholder: 'Введите промокод',
    }).getElement();

    const button = new Button({
      style: 'PROMO_CODE_SUBMIT',
      textContent: BTN_TEXT.APPLY,
      callback: (): void => {},
    }).getElement();

    this.form.append(input, button);
  }
}
