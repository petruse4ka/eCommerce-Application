import API from '@/api/api';
import Alert from '@/components/alert/alert';
import { Button } from '@/components/buttons/button';
import Input from '@/components/inputs/input';
import { BTN_TEXT, FIELDSET_LABELS } from '@/constants/constants';
import { INPUTS_ADDRESS_DATA, INPUTS_REGISTRATION_DATA } from '@/data';
import { FORM, REGISTRATION_ADDRESS, REGISTRATION_INPUTS_CONTAINER } from '@/styles/forms/forms';
import { CHECKBOX_CONTAINER_STYLE } from '@/styles/inputs/inputs';
import { MACARON_CONTAINER } from '@/styles/pages/registration';
import { AlertStatus, CheckboxText, InputType } from '@/types/enums';
import { isErrorInfo } from '@/types/guards';
import type { RegistrationBody } from '@/types/interfaces';
import ApiErrors from '@/utils/api-errors';
import { ElementBuilder } from '@/utils/element-builder';
import {
  getValidator,
  validateDateOfBirth,
  validateEMail,
  validateInput,
  validateNoDigitsNoSymbols,
  validatePassword,
  validatePostalCode,
} from '@/utils/validations';

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
    this.createMacaronContainer();
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
    this.isSameAddresses = false;

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
      className: REGISTRATION_ADDRESS.CONTAINER,
    }).getElement();

    const legend = new ElementBuilder({
      tag: 'legend',
      className: REGISTRATION_ADDRESS.LEGEND,
      textContent: FIELDSET_LABELS.PERSONAL_DATA,
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
      className: REGISTRATION_ADDRESS.CONTAINER,
    }).getElement();

    const legend = new ElementBuilder({
      tag: 'legend',
      className: REGISTRATION_ADDRESS.LEGEND,
      textContent: prefix === 'billing' ? FIELDSET_LABELS.BILLING : FIELDSET_LABELS.SHIPPING,
    }).getElement();

    container.append(legend);

    for (const input of INPUTS_ADDRESS_DATA) {
      const { labelText, placeholder, type, isRequired, isDisabled } = input;
      const id = prefix + input.id;
      const inputNode = new Input({
        id,
        labelText,
        placeholder,
        type,
        isRequired,
        isDisabled,
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
      this.inputs.set(id, inputNode);
      container.append(inputNode.getElement());
    }
    if (container instanceof HTMLFieldSetElement) return container;
    return null;
  }

  private createMacaronContainer(): void {
    const macaronContainer = new ElementBuilder({
      tag: 'div',
      className: MACARON_CONTAINER,
    }).getElement();
    if (this.userInfoContainer) {
      this.userInfoContainer.append(macaronContainer);
    }
  }

  private showValidationError(id: string, errorMessage: string | null): void {
    const input = this.inputs.get(id);

    if (!input) return;

    if (errorMessage) {
      input.setError(errorMessage);
    } else {
      input.clearError();
    }
  }

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
    const body = this.createBody();

    if (this.isDataValidBeforeSending(body)) {
      API.userRegistration(body).catch((error: Error) => {
        const parsed: unknown = JSON.parse(error.message);
        if (Array.isArray(parsed)) {
          for (const item of parsed) {
            if (isErrorInfo(item)) {
              const errorInfo = ApiErrors.getErrorInfo(item.code);
              this.showValidationError(item.field, errorInfo);

              Alert.render({
                textContent: errorInfo,
                status: AlertStatus.ERROR,
                visibleTime: 4000,
              });
            }
          }
        }
      });
    }
  }

  private createBody(): RegistrationBody {
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
          streetName: this.formValue.get('shippingStreet') ?? '',
          postalCode: this.formValue.get('shippingPostalCode') ?? '',
        },
      ],
      defaultShippingAddress: indexShippingAddress,
      defaultBillingAddress: indexBillingAddress,
    };

    if (!this.isSameAddresses) {
      body.addresses.push({
        country: 'RU',
        city: this.formValue.get('billingCity') ?? '',
        streetName: this.formValue.get('billingStreet') ?? '',
        postalCode: this.formValue.get('billingPostalCode') ?? '',
      });
    }

    return body;
  }

  private isDataValidBeforeSending(body: RegistrationBody): boolean {
    const isNotValidFirstName = validateNoDigitsNoSymbols(body.firstName);
    this.showValidationError('firstName', isNotValidFirstName);

    const isNotValidLastName = validateNoDigitsNoSymbols(body.lastName);
    this.showValidationError('lastName', isNotValidLastName);

    const isNotValidEmail = validateEMail(body.email);
    this.showValidationError('email', isNotValidEmail);

    const isNotValidDate = validateDateOfBirth(body.dateOfBirth);
    this.showValidationError('dateOfBirth', isNotValidDate);

    const isNotValidPassword = validatePassword(body.password);
    this.showValidationError('password', isNotValidPassword);

    const isNotValidShippingPostalCode = validatePostalCode(body.addresses[0].postalCode);
    this.showValidationError('shippingPostalCode', isNotValidShippingPostalCode);

    const isNotValidShippingCity = validateNoDigitsNoSymbols(body.addresses[0].city);
    this.showValidationError('shippingCity', isNotValidShippingCity);

    const isNotValidShippingStreet = validateInput(body.addresses[0].streetName);
    this.showValidationError('shippingStreet', isNotValidShippingStreet);

    let isNotValidShippingAddress = false;
    if (!this.isSameAddresses) {
      const isNotValidBillingPostalCode = validatePostalCode(body.addresses[1].postalCode);
      this.showValidationError('billingPostalCode', isNotValidBillingPostalCode);

      const isNotValidBillingCity = validateNoDigitsNoSymbols(body.addresses[1].city);
      this.showValidationError('billingCity', isNotValidBillingCity);

      const isNotValidBillingStreet = validateInput(body.addresses[1].streetName);
      this.showValidationError('billingStreet', isNotValidBillingStreet);
      isNotValidShippingAddress =
        !!isNotValidBillingPostalCode && !!isNotValidBillingCity && !!isNotValidBillingStreet;
    }
    return (
      !isNotValidFirstName &&
      !isNotValidLastName &&
      !isNotValidDate &&
      !isNotValidEmail &&
      !isNotValidPassword &&
      !isNotValidShippingPostalCode &&
      !isNotValidShippingCity &&
      !isNotValidShippingAddress
    );
  }
}
