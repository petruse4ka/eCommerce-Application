import API from '@/api/api';
import { Button } from '@/components/buttons/button';
import Input from '@/components/inputs/input';
import { BTN_TEXT } from '@/constants/constants';
import { INPUTS_REGISTRATION_DATA } from '@/data';
import { FORM, REGISTRATION_INPUTS_CONTAINER } from '@/styles/forms/forms';
import { CheckboxText, InputType } from '@/types/enums';
import type { InputComponent, RegistrationBody } from '@/types/interfaces';
import { ElementBuilder } from '@/utils/element-builder';

export default class FormRegistration {
  private form: HTMLElement;
  private userInfoContainer: HTMLElement;
  private INPUTS_DATA: InputComponent[];
  private formValue: Map<string, string>;
  private isDefaultAddress: boolean;

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

    this.formValue = new Map();
    this.isDefaultAddress = false;

    this.render();
  }

  public getElement(): HTMLElement {
    return this.form;
  }

  private createInputs(): void {
    for (const input of this.INPUTS_DATA) {
      const { id, labelText, placeholder, type, isRequired } = input;

      const inputNode = new Input({
        id,
        labelText,
        placeholder,
        type,
        isRequired,
        eventType: 'input',
        callback: (): void => {
          const key = id
            .split('-')
            .map((part, index) =>
              index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
            )
            .join('');
          this.formValue.set(key, inputNode.getValue());
        },
      });

      this.userInfoContainer.append(inputNode.getElement());
    }
  }

  private createCheckboxes(): void {
    const checkboxDefaultAddress = new Input({
      id: 'is-default-address',
      type: InputType.CHECKBOX,
      labelText: CheckboxText.DEFAULT_SAVE,
      className: ['flex', 'justify-between'],
      callback: (): void => {
        this.isDefaultAddress = !this.isDefaultAddress;
      },
    }).getElement();

    this.userInfoContainer.append(checkboxDefaultAddress);
  }

  private render(): void {
    const button = new Button({
      style: 'PRIMARY_PINK',
      textContent: BTN_TEXT.REGISTRATION_PAGE,
      callback: (): void => {
        this.submitForm();
      },
    }).getElement();

    this.createInputs();
    this.createCheckboxes();

    this.form.append(this.userInfoContainer, button);
  }

  private submitForm(): void {
    const body: RegistrationBody = {
      firstName: this.formValue.get('firstName') ?? '',
      lastName: this.formValue.get('lastName') ?? '',
      dateOfBirth: this.formValue.get('dateOfBirth') ?? '',
      email: this.formValue.get('email') ?? '',
      password: this.formValue.get('password') ?? '',
      addresses: [
        {
          country: 'RU',
          city: this.formValue.get('city') ?? '',
          streetName: this.formValue.get('streetName') ?? '',
          postalCode: this.formValue.get('postalCode') ?? '',
        },
      ],
      defaultShippingAddress: this.isDefaultAddress ? 0 : undefined,
    };
    void API.userRegistration(body);
  }
}
