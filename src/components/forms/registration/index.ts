import API from '@/api/api';
import { Button } from '@/components/buttons/button';
import Input from '@/components/inputs/input';
import { BTN_TEXT } from '@/constants/constants';
import { INPUTS_ADDRESS_DATA, INPUTS_REGISTRATION_DATA } from '@/data';
import {
  FORM,
  REGISTRATION_ADDRESS_CONTAINER,
  REGISTRATION_INPUTS_CONTAINER,
} from '@/styles/forms/forms';
import { CHECKBOX_CONTAINER_STYLE } from '@/styles/inputs/inputs';
import { CheckboxText, InputType } from '@/types/enums';
import type { RegistrationBody } from '@/types/interfaces';
import { ElementBuilder } from '@/utils/element-builder';
import { getValidator, validateEMail, validatePassword } from '@/utils/validations';

export default class FormRegistration {
  private form: HTMLElement;
  private userInfoContainer: HTMLElement | undefined;
  private userShippingAddressContainer: HTMLElement | undefined;
  private userBillingAddressContainer: HTMLElement | undefined;
  private formValue: Map<string, string>;
  private inputs: Map<string, Input>;
  private isDefaultAddress: boolean | undefined;
  private isSameAddresses: boolean | undefined;

  constructor() {
    this.formValue = new Map();
    this.inputs = new Map();
    this.form = new ElementBuilder({
      tag: 'form',
      className: FORM,
    }).getElement();

    this.createFormContainer();
  }

  public getElement(): HTMLElement {
    if (!this.form) {
      throw new Error('Form element is not initialized');
    }
    return this.form;
  }

  public inputErrorHandler(event: Event, type: string): void {
    const validateFunction = getValidator(type);

    if (!validateFunction) return;

    const field = event.target;
    if (field instanceof HTMLInputElement) {
      const errorMessage = validateFunction(field.value);
      this.showValidationError(field.id, errorMessage);
    }
  }

  private createFormContainer(): void {
    this.userInfoContainer = new ElementBuilder({
      tag: 'div',
      className: REGISTRATION_INPUTS_CONTAINER,
    }).getElement();

    this.isDefaultAddress = false;
    this.isSameAddresses = true;

    const button = new Button({
      style: 'PRIMARY_PINK',
      textContent: BTN_TEXT.REGISTRATION_PAGE,
      callback: (): void => {
        this.submitForm();
      },
    }).getElement();

    this.createInputs();
    const shipping = this.createAddressContainer('shipping');

    if (shipping instanceof HTMLFieldSetElement) {
      this.userShippingAddressContainer = shipping;
      this.userInfoContainer.append(this.userShippingAddressContainer);
    }
    this.createCheckboxes();
    const billing = this.createAddressContainer('billing');

    if (billing instanceof HTMLFieldSetElement) {
      this.userBillingAddressContainer = billing;
      this.userInfoContainer.append(this.userBillingAddressContainer);
    }

    if (this.form && this.userInfoContainer) {
      this.userInfoContainer.append();
      this.form.append(this.userInfoContainer, button);
    }
  }

  private createInputs(): void {
    const container = new ElementBuilder({
      tag: 'fieldset',
      className: REGISTRATION_ADDRESS_CONTAINER,
    }).getElement();

    const legend = new ElementBuilder({
      tag: 'legend',
      className: REGISTRATION_INPUTS_CONTAINER,
      textContent: 'Персональные данные',
    }).getElement();

    container.append(legend);

    for (const input of INPUTS_REGISTRATION_DATA) {
      const { id, labelText, placeholder, type, isRequired } = input;

      const inputNode = new Input({
        id,
        labelText,
        placeholder,
        type,
        isRequired,
        eventType: 'input',
        callback: (event: Event): void => {
          this.inputErrorHandler(event, id);
          const key = id
            .split('-')
            .map((part, index) =>
              index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
            )
            .join('');
          this.formValue.set(key, inputNode.getValue());
        },
      });
      container.append(inputNode.getElement());

      this.inputs.set(id, inputNode);
    }
    if (this.userInfoContainer) {
      this.userInfoContainer.append(container);
    }
  }

  private createAddressContainer(prefix: string): HTMLFieldSetElement | null {
    const container = new ElementBuilder({
      tag: 'fieldset',
      className: REGISTRATION_ADDRESS_CONTAINER,
    }).getElement();

    const legend = new ElementBuilder({
      tag: 'legend',
      className: REGISTRATION_INPUTS_CONTAINER,
      textContent: `Адрес ${prefix === 'billing' ? ' оплаты' : ' доставки'}`,
    }).getElement();

    container.append(legend);

    for (const input of INPUTS_ADDRESS_DATA) {
      const { labelText, placeholder, type, isRequired } = input;
      const id = prefix + input.id;
      const inputNode = new Input({
        id,
        labelText,
        placeholder,
        type,
        isRequired,
        eventType: 'input',
        callback: (event: Event): void => {
          console.log(id);
          this.inputErrorHandler(event, id);
          const key = id
            .split('-')
            .map((part, index) =>
              index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
            )
            .join('');
          this.formValue.set(key, inputNode.getValue());
        },
      });
      this.inputs.set(id, inputNode);
      container.append(inputNode.getElement());
    }
    if (container instanceof HTMLFieldSetElement) return container;
    return null;
  }

  private showValidationError(id: string, errorMessage: string | null): void {
    const input = this.inputs.get(id);
    console.log(id, input);
    if (!input) return;

    if (errorMessage) {
      input.setError(errorMessage);
    } else {
      input.clearError();
    }
  }

  /* private createBillingInputs(): void {
    for (const input of this.INPUTS_BILLING_DATA) {
      const { id, labelText, placeholder, type, isRequired } = input;

      const inputNode = new Input({
        id,
        labelText,
        placeholder,
        type,
        isRequired,
        eventType: 'input',
        callback: (event: Event): void => {
          this.inputErrorHandler(event, id);
          const key = id
            .split('-')
            .map((part, index) =>
              index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
            )
            .join('');
          this.formValue.set(key, inputNode.getValue());
        },
      });
      if (this.userBillingAddressContainer) {
        this.userBillingAddressContainer.append(inputNode.getElement());
        this.form.insertBefore(this.userBillingAddressContainer, this.form.lastElementChild);
      }
    }
  }*/

  private toggleVisibleBillingContainer(): void {
    if (this.userBillingAddressContainer) {
      this.userBillingAddressContainer.classList.toggle('hidden');
    }
  }

  private createCheckboxes(): void {
    const checkboxDefaultAddress = new Input({
      id: 'is-default-address',
      type: InputType.CHECKBOX,
      labelText: CheckboxText.DEFAULT_SAVE,
      className: CHECKBOX_CONTAINER_STYLE,
      callback: (): void => {
        this.isDefaultAddress = !this.isDefaultAddress;
      },
    }).getElement();

    const checkboxSameAddresses = new Input({
      id: 'is-same-addresses',
      type: InputType.CHECKBOX,
      labelText: CheckboxText.SAME_ADDRESSES,
      className: CHECKBOX_CONTAINER_STYLE,
      //attributes: { checked: '' },
      callback: (): void => {
        this.isSameAddresses = !this.isSameAddresses;
        this.toggleVisibleBillingContainer();
      },
    }).getElement();
    if (this.userInfoContainer) {
      this.userInfoContainer.append(checkboxSameAddresses, checkboxDefaultAddress);
    }
  }

  private submitForm(): void {
    const indexShippingAddress = this.isDefaultAddress ? 0 : undefined;
    let indexBillingAddress = undefined;

    if (this.isDefaultAddress) {
      indexBillingAddress = 1;
    }

    if (this.isSameAddresses && this.isDefaultAddress) {
      indexBillingAddress = indexShippingAddress;
    }

    const body: RegistrationBody = {
      firstName: this.formValue.get('firstName') ?? '',
      lastName: this.formValue.get('lastName') ?? '',
      dateOfBirth: this.formValue.get('dateOfBirth') ?? '',
      email: this.formValue.get('email') ?? '',
      password: this.formValue.get('password') ?? '',
      addresses: [
        {
          country: 'RU',
          city: this.formValue.get('shippingCity') ?? '',
          streetName: this.formValue.get('shippingStreetName') ?? '',
          postalCode: this.formValue.get('shippingPostalCode') ?? '',
        },
      ],
      defaultShippingAddress: indexShippingAddress,
      defaultBillingAddress: indexBillingAddress,
    };

    /*    if (!this.isSameAddresses) {
      body.addresses.push({
        country: 'RU',
        city: this.formValue.get('billingCity') ?? '',
        streetName: this.formValue.get('billingStreetName') ?? '',
        postalCode: this.formValue.get('billingPostalCode') ?? '',
      });
    }*/
    const isNotValidEmail = validateEMail(body.email);
    this.showValidationError('email', isNotValidEmail);

    const isNotValidPassword = validatePassword(body.password);
    this.showValidationError('password', isNotValidPassword);

    if (!isNotValidEmail && !isNotValidPassword) {
      void API.userRegistration(body);
    }
  }
}
