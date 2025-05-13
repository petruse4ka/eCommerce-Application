import { Button } from '@/components/buttons/button';
import { INPUTS_REGISTRATION_DATA } from '@/components/data';
import Input from '@/components/inputs/input';
import { FORM, REGISTRATION_INPUTS_CONTAINER } from '@/styles/forms/forms';
import type { InputComponent } from '@/types/interfaces';
import { ElementBuilder } from '@/utils/element-builder';

export default class FormRegistration {
  private form: HTMLElement;
  private userInfoContainer: HTMLElement;
  private INPUTS_DATA: InputComponent[];

  constructor() {
    this.INPUTS_DATA = INPUTS_REGISTRATION_DATA;
    this.form = new ElementBuilder({
      tag: 'form',
      className: FORM,
    }).getElement();

    this.userInfoContainer = new ElementBuilder({
      tag: 'div',
      className: REGISTRATION_INPUTS_CONTAINER,
    }).getElement();

    this.render();
  }

  public getElement(): HTMLElement {
    return this.form;
  }

  private createInputs(): void {
    for (const input of this.INPUTS_DATA) {
      const { id, labelText, placeholder, type, isRequired, callback } = input;

      const inputNode = new Input({
        id,
        labelText,
        placeholder,
        type,
        isRequired,
        callback,
      }).getElement();

      this.userInfoContainer.append(inputNode);
    }
  }

  private render(): void {
    const button = new Button({
      style: 'PRIMARY_PINK',
      textContent: 'Зарегестрироваться',
      callback: (): void => {},
    }).getElement();
    this.createInputs();

    this.form.append(this.userInfoContainer, button);
  }
}
