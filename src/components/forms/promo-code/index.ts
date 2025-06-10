import APICart from '@/api/cart';
import Alert from '@/components/alert';
import BaseComponent from '@/components/base';
import Button from '@/components/buttons';
import Input from '@/components/inputs';
import { BTN_TEXT, PROMO_PLACEHOLDER } from '@/constants';
import { FORM_PROMO_CODE } from '@/styles/forms/forms';
import { AlertStatus, AlertText, InputType } from '@/types/enums';
import { isErrorInfoPasswordChange } from '@/types/guards';
import type { ErrorInfo } from '@/types/interfaces';
import ApiErrors from '@/utils/api-errors';

export default class FormPromoCode extends BaseComponent {
  private callback: (isLoading: boolean) => void;

  constructor(callback: (isLoading: boolean) => void) {
    super({
      tag: 'form',
      className: FORM_PROMO_CODE,
    });

    this.callback = callback;

    this.render();
  }

  private render(): void {
    const input = new Input({
      id: 'promoCode',
      type: InputType.TEXT,
      placeholder: PROMO_PLACEHOLDER,
      callback: (): void => {
        input.clearError();
      },
    });

    const button = new Button({
      style: 'PROMO_CODE_SUBMIT',
      textContent: BTN_TEXT.APPLY,
      callback: (): void => {
        this.callback(true);
        APICart.addPromoCode(input.getValue())
          .catch((error: ErrorInfo) => {
            const parsedError: unknown = JSON.parse(error.message);
            if (isErrorInfoPasswordChange(parsedError)) {
              const errorInfo = ApiErrors.getErrorInfo(parsedError.code);

              if (errorInfo === AlertText.DISCOUNT_CODE_NON) {
                input.setError(errorInfo);
              } else {
                Alert.render({
                  textContent: errorInfo,
                  status: AlertStatus.ERROR,
                  visibleTime: 4000,
                });
              }
            }
          })
          .finally(() => {
            this.callback(false);
          });
      },
    }).getElement();

    this.component.append(input.getElement(), button);
  }
}
