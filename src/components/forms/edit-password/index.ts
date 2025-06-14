import APIUpdateData from '@/api/update-data';
import Alert from '@/components/alert';
import BaseComponent from '@/components/base';
import Button from '@/components/buttons';
import Input from '@/components/inputs';
import { BTN_TEXT } from '@/constants';
import { ALERT_TEXT, ERROR_MESSAGES } from '@/constants';
import { INPUTS_EDIT_USER_PASSWORD } from '@/data';
import { AUTHORIZATION_INPUTS_CONTAINER, FORM_PASSWORD } from '@/styles/forms/forms';
import { HIDDEN } from '@/styles/inputs/inputs';
import { AlertStatus, InputType } from '@/types/enums';
import { isErrorInfoPasswordChange, isPasswordInfo } from '@/types/guards';
import type { PasswordBody } from '@/types/interfaces';
import ApiErrors from '@/utils/api-errors';
import ElementBuilder from '@/utils/element-builder';
import { getValidator } from '@/utils/validations';

export default class FormEditPassword extends BaseComponent {
  private inputs: Map<string, Input>;
  private callback: () => void;

  constructor() {
    super({
      tag: 'form',
      className: FORM_PASSWORD,
    });
    this.inputs = new Map();
    this.callback = (): void => {};
    this.render();
  }

  public setCallback(callback: () => void): void {
    this.callback = callback;
  }

  private inputErrorHandler(value: string, type: string): boolean | void {
    const validateFunction = getValidator(type);

    if (!validateFunction) return;
    const errorMessage = validateFunction(value);
    this.showValidationError(type, errorMessage);

    return errorMessage ? true : false;
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

  private createInputs(): void {
    const container = new ElementBuilder({
      tag: 'div',
      className: AUTHORIZATION_INPUTS_CONTAINER,
    }).getElement();

    const inputEmailForAutocomplete = new Input({
      id: 'email',
      type: InputType.EMAIL,
      labelText: '',
      className: HIDDEN,
    }).getElement();
    container.append(inputEmailForAutocomplete);

    for (const input of INPUTS_EDIT_USER_PASSWORD) {
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
        },
      });

      this.inputs.set(id, inputNode);
      container.append(inputNode.getElement());
      this.component.append(container);
    }
  }

  private render(): void {
    const button = new Button({
      style: 'PRIMARY_PINK',
      textContent: BTN_TEXT.SAVE_CHANGES,
      callback: (): void => {
        this.submitForm();
      },
    }).getElement();

    this.createInputs();
    this.component.append(button);
  }

  private createBody(): PasswordBody {
    const body = {
      newPassword: '',
      currentPassword: '',
      repeatNewPassword: '',
    };

    const inputsInfo = this.inputs.entries();
    for (const inputInfo of inputsInfo) {
      const [key, input] = inputInfo;
      const value = input.getValue();

      if (isPasswordInfo(key, body)) {
        body[key] = value;
      }
    }

    return body;
  }

  private submitForm(): void {
    const body = this.createBody();

    if (this.isDataValidBeforeSending(body)) {
      if (body.newPassword === body.repeatNewPassword) {
        void APIUpdateData.changeUserPassword(body)
          .then(() => {
            this.callback();
          })
          .catch((error: Error) => {
            const parsed: unknown = JSON.parse(error.message);
            if (Array.isArray(parsed)) {
              for (const item of parsed) {
                if (isErrorInfoPasswordChange(item)) {
                  const errorInfo = ApiErrors.getErrorInfo(item.code);

                  if (errorInfo === ALERT_TEXT.INVALID_CURRENT_PASSWORD) {
                    this.showValidationError('currentPassword', errorInfo);
                  } else {
                    const inputs = this.inputs.keys();
                    for (const input of inputs) {
                      this.showValidationError(input, ' ');
                    }
                  }

                  Alert.render({
                    textContent: errorInfo,
                    status: AlertStatus.ERROR,
                    visibleTime: 3000,
                  });
                }
              }
            }
          });
      } else {
        this.showValidationError('repeatNewPassword', ERROR_MESSAGES.ERROR_REPEAT_PASSWORD);
      }
    }
  }

  private isDataValidBeforeSending(body: PasswordBody): boolean {
    let result = true;

    for (const key in body) {
      if (isPasswordInfo(key, body)) {
        const value = body[key];

        if (this.inputErrorHandler(value, key)) {
          result = false;
        }
      }
    }

    return result;
  }
}
