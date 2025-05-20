import API from '@/api';
import Alert from '@/components/alert';
import Button from '@/components/buttons';
import Input from '@/components/inputs';
import { BTN_TEXT, FIELDSET_LABELS } from '@/constants';
import {
  CHECKBOXES_REGISTRATION_DATA,
  INPUTS_ADDRESS_DATA,
  INPUTS_REGISTRATION_DATA,
} from '@/data';
import Router from '@/router';
import {
  FORM,
  REDIRECT_LINK,
  REGISTRATION_ADDRESS,
  REGISTRATION_INPUTS_CONTAINER,
} from '@/styles/forms/forms';
import { CHECKBOX_CONTAINER_STYLE } from '@/styles/inputs/inputs';
import { MACARON_CONTAINER } from '@/styles/pages/registration';
import { AlertStatus, InputType } from '@/types/enums';
import { Route } from '@/types/enums';
import { AlertText } from '@/types/enums';
import { isErrorInfo } from '@/types/guards';
import type { RegistrationBody } from '@/types/interfaces';
import ApiErrors from '@/utils/api-errors';
import ElementBuilder from '@/utils/element-builder';
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
  private isDefaultAddressBilling: boolean | undefined;
  private isDefaultAddressShipping: boolean | undefined;
  private isSameAddresses: boolean | undefined;
  private checkboxes: Map<string, Input>;

  constructor() {
    this.formValue = new Map();
    this.inputs = new Map();
    this.checkboxes = new Map();
    this.form = new ElementBuilder({
      tag: 'form',
      className: FORM,
    }).getElement();

    this.createCheckboxes();
    this.createFormContainer();
    this.createMacaronContainer();
    this.createRedirectLink();
  }

  private static createInputsContainer(textContent: string): HTMLElement {
    const container = new ElementBuilder({
      tag: 'fieldset',
      className: REGISTRATION_ADDRESS.CONTAINER,
    }).getElement();

    const legend = new ElementBuilder({
      tag: 'legend',
      className: REGISTRATION_ADDRESS.LEGEND,
      textContent,
    }).getElement();

    container.append(legend);

    return container;
  }

  public getElement(): HTMLElement {
    if (!this.form) {
      throw new Error('Form element is not initialized');
    }
    return this.form;
  }

  public inputErrorHandler(value: string, type: string): void {
    const validateFunction = getValidator(type);

    if (!validateFunction) return;
    const errorMessage = validateFunction(value);
    this.showValidationError(type, errorMessage);
  }

  private createFormContainer(): void {
    this.userInfoContainer = new ElementBuilder({
      tag: 'div',
      className: REGISTRATION_INPUTS_CONTAINER,
    }).getElement();

    this.isDefaultAddressBilling = false;
    this.isDefaultAddressShipping = false;
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

    const billing = this.createAddressContainer('billing');

    if (billing instanceof HTMLFieldSetElement) {
      this.userBillingAddressContainer = billing;
      this.userInfoContainer.append(this.userBillingAddressContainer);
    }

    if (this.form && this.userInfoContainer) {
      this.form.append(this.userInfoContainer, button);
    }
  }

  private createInputs(): void {
    const container = FormRegistration.createInputsContainer(FIELDSET_LABELS.PERSONAL_DATA);

    for (const input of INPUTS_REGISTRATION_DATA) {
      const { id, labelText, placeholder, type, isRequired } = input;

      const inputNode = new Input({
        id,
        labelText,
        placeholder,
        type,
        isRequired,
        eventType: 'input',
        callback: (): void => {
          const value = inputNode.getValue();
          this.inputErrorHandler(value, id);
          this.formValue.set(id, value);
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
    const container = FormRegistration.createInputsContainer(
      prefix === 'billing' ? FIELDSET_LABELS.BILLING : FIELDSET_LABELS.SHIPPING
    );

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
        callback: (): void => {
          const value = inputNode.getValue();
          this.inputErrorHandler(value, id);
          this.formValue.set(id, value);
          if (prefix === 'shipping' && this.isSameAddresses) {
            this.setSameAddresses();
          }
        },
      });
      this.inputs.set(id, inputNode);
      container.append(inputNode.getElement());
    }

    if (prefix === 'billing') {
      const checkboxSameAddresses = this.checkboxes.get('is-same-addresses');
      if (checkboxSameAddresses) {
        container.append(checkboxSameAddresses.getElement());
      }
    }

    const checkboxDefaultAddress = this.checkboxes.get(`is-default-address-${prefix}`);
    if (checkboxDefaultAddress) {
      container.append(checkboxDefaultAddress.getElement());
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

  private setSameAddresses(): void {
    const inputsShippingId = ['shippingCity', 'shippingStreet', 'shippingPostalCode'];
    const inputsBillingId = ['billingCity', 'billingStreet', 'billingPostalCode'];

    for (const [index, id] of inputsShippingId.entries()) {
      const inputBillingId = inputsBillingId[index];
      const inputShipping = this.inputs.get(id);
      const inputsBilling = this.inputs.get(inputBillingId);

      if (inputShipping && inputsBilling) {
        const currentValue = inputShipping.getValue();
        inputsBilling.setValue(inputShipping.getValue());
        this.formValue.set(inputBillingId, currentValue);

        if (currentValue) {
          this.inputErrorHandler(currentValue, inputBillingId);
        } else {
          inputsBilling.clearError();
        }
      }
    }
  }

  private createCheckboxes(): void {
    for (const checkboxData of CHECKBOXES_REGISTRATION_DATA) {
      const { id, labelText } = checkboxData;
      let callback;

      if (id === 'is-same-addresses') {
        callback = (): void => {
          const inputsBillingId = ['billingCity', 'billingStreet', 'billingPostalCode'];
          for (const id of inputsBillingId) {
            const inputsBilling = this.inputs.get(id);
            if (inputsBilling) {
              inputsBilling.toggleDisabledInput();
            }
          }

          this.isSameAddresses = !this.isSameAddresses;
          this.setSameAddresses();
        };
      } else if (id === 'is-default-address-shipping') {
        callback = (): void => {
          this.isDefaultAddressShipping = !this.isDefaultAddressShipping;
        };
      } else {
        callback = (): void => {
          this.isDefaultAddressBilling = !this.isDefaultAddressBilling;
        };
      }

      const checkbox = new Input({
        id,
        type: InputType.CHECKBOX,
        labelText,
        className: CHECKBOX_CONTAINER_STYLE,
        callback,
      });

      this.checkboxes.set(id, checkbox);
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
                visibleTime: 3000,
              });
            } else {
              Alert.render({
                textContent: AlertText.ERROR_DEFAULT,
                status: AlertStatus.ERROR,
                visibleTime: 3000,
              });
            }
          }
        }
      });
    }
  }

  private createRedirectLink(): void {
    const link = new ElementBuilder({
      tag: 'div',
      textContent: BTN_TEXT.LOGIN_REDIRECT,
      className: REDIRECT_LINK,
      callback: (): void => {
        Router.followRoute(Route.LOGIN);
      },
    }).getElement();

    if (this.form) {
      this.form.append(link);
    }
  }

  private createBody(): RegistrationBody {
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
      defaultShippingAddress: this.isDefaultAddressShipping ? 0 : undefined,
      defaultBillingAddress: undefined,
    };

    if (!this.isSameAddresses) {
      body.addresses.push({
        country: 'RU',
        city: this.formValue.get('billingCity') ?? '',
        streetName: this.formValue.get('billingStreet') ?? '',
        postalCode: this.formValue.get('billingPostalCode') ?? '',
      });
    }

    if (this.isDefaultAddressBilling) {
      body.defaultBillingAddress = this.isSameAddresses ? 0 : 1;
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

    const billingAddress = this.isSameAddresses ? body.addresses[0] : body.addresses[1];
    const isNotValidBillingPostalCode = validatePostalCode(billingAddress.postalCode);
    this.showValidationError('billingPostalCode', isNotValidBillingPostalCode);

    const isNotValidBillingCity = validateNoDigitsNoSymbols(billingAddress.city);
    this.showValidationError('billingCity', isNotValidBillingCity);

    const isNotValidBillingStreet = validateInput(billingAddress.streetName);
    this.showValidationError('billingStreet', isNotValidBillingStreet);

    const isNotValidBillingAddress =
      !!isNotValidBillingPostalCode || !!isNotValidBillingCity || !!isNotValidBillingStreet;

    return (
      !isNotValidFirstName &&
      !isNotValidLastName &&
      !isNotValidDate &&
      !isNotValidEmail &&
      !isNotValidPassword &&
      !isNotValidShippingPostalCode &&
      !isNotValidShippingCity &&
      !isNotValidShippingStreet &&
      !isNotValidBillingAddress
    );
  }
}
