import Alert from '@/components/alert';
import Button from '@/components/buttons';
import Input from '@/components/inputs';
import { BTN_TEXT } from '@/constants';
import { FORM } from '@/styles/forms/forms';
import { AlertStatus, AlertText } from '@/types/enums';
import type { InputComponent } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';

export default class FormEditUserInfo {
  private form: HTMLElement;
  private INPUTS_DATA: InputComponent[];
  private inputs: Map<string, Input>;
  private currentInputs: ElementBuilder[];
  private callback: () => void;

  constructor(data: InputComponent[], currentInputs: ElementBuilder[]) {
    this.INPUTS_DATA = data;
    this.inputs = new Map();
    this.callback = (): void => {};
    this.currentInputs = currentInputs;

    this.form = new ElementBuilder({
      tag: 'form',
      className: FORM,
    }).getElement();

    this.render();
  }

  public getElement(): HTMLElement {
    return this.form;
  }

  public setCallback(callback: () => void): void {
    this.callback = callback;
  }

  private createInputs(): void {
    let index = 0;
    for (const input of this.INPUTS_DATA) {
      const { labelText, placeholder, type, isRequired } = input;

      const id = input.id.charAt(0).toLocaleLowerCase() + input.id.slice(1);

      const value = this.currentInputs[index++].getElement().textContent;
      if (typeof value === 'string') {
        const inputNode = new Input({
          id,
          labelText,
          placeholder,
          type,
          isRequired,
          eventType: 'input',
          value,
          callback: (): void => {},
        });

        this.inputs.set(id, inputNode);
        this.form.append(inputNode.getElement());
      }
    }
  }

  private render(): void {
    const button = new Button({
      style: 'PRIMARY_PINK',
      textContent: BTN_TEXT.SAVE_CHANGES,
      callback: (): void => {
        this.callback();
        this.submitForm();
      },
    }).getElement();

    this.createInputs();
    this.form.append(button);
  }

  private submitForm(): void {
    const inputKeys = [...this.inputs.keys()];
    for (const [index, value] of this.currentInputs.entries()) {
      const key = inputKeys[index];

      const valueInput = this.inputs.get(key);
      if (valueInput) {
        value.applyTextContent(valueInput.getValue());
      }
    }

    Alert.render({
      textContent: AlertText.CHANGE_SUCCESS,
      status: AlertStatus.SUCCESS,
      visibleTime: 2000,
    });
  }
}
