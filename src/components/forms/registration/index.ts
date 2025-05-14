import API from '@/api/api';
import { Button } from '@/components/buttons/button';
import Input from '@/components/inputs/input';
import { INPUTS_REGISTRATION_DATA } from '@/data';
import { FORM, REGISTRATION_INPUTS_CONTAINER } from '@/styles/forms/forms';
import type { InputComponent, RegistrationBody } from '@/types/interfaces';
import { ElementBuilder } from '@/utils/element-builder';

export default class FormRegistration {
  private form: HTMLElement;
  private userInfoContainer: HTMLElement;
  private INPUTS_DATA: InputComponent[];
  private formValue: Map<string, string>;

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

  private render(): void {
    const button = new Button({
      style: 'PRIMARY_PINK',
      textContent: 'Зарегестрироваться',
      callback: (): void => {
        this.submitForm();
      },
    }).getElement();
    this.createInputs();

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
    };
    void API.userRegistration(body);
  }
}
