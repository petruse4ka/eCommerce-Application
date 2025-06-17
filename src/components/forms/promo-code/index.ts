import APICart from '@/api/cart';
import Alert from '@/components/alert';
import BaseComponent from '@/components/base';
import Button from '@/components/buttons';
import Input from '@/components/inputs';
import { BTN_TEXT, PROMO_PLACEHOLDER } from '@/constants';
import { ALERT_TEXT } from '@/constants';
import { cartState } from '@/store/cart-state';
import { FORM_PROMO_CODE } from '@/styles/forms/forms';
import { AlertStatus, AlertTime, InputType } from '@/types/enums';
import { isErrorInfoPasswordChange } from '@/types/guards';
import type { ErrorInfo } from '@/types/interfaces';
import type { UpdateViewTotalCart } from '@/types/types';
import ApiErrors from '@/utils/api-errors';

export default class FormPromoCode extends BaseComponent {
  private callback: UpdateViewTotalCart;

  constructor(callback: UpdateViewTotalCart) {
    super({
      tag: 'form',
      className: FORM_PROMO_CODE,
    });

    this.callback = callback;

    this.render();
  }

  private static createPromoInput(): Input {
    const input = new Input({
      id: 'promoCode',
      type: InputType.TEXT,
      placeholder: PROMO_PLACEHOLDER,
      callback: (): void => {
        input.clearError();
      },
    });

    return input;
  }

  private render(): void {
    const input = FormPromoCode.createPromoInput();

    const button = new Button({
      style: 'PROMO_CODE_SUBMIT',
      textContent: BTN_TEXT.APPLY,
      callback: (): void => {
        const cartInfo = cartState.getCartInfo();
        if (cartInfo?.discountCode) {
          input.setError(ALERT_TEXT.DISCOUNT_CODE_REPEAT);
          return;
        }

        this.callback({ isLoading: true, success: false });
        APICart.addPromoCode(input.getValue())
          .then(() => {
            this.callback({ isLoading: false, success: true });
          })
          .catch((error: ErrorInfo) => {
            this.callback({ isLoading: false, success: false });
            const parsedError: unknown = JSON.parse(error.message);
            if (isErrorInfoPasswordChange(parsedError)) {
              const errorInfo = ApiErrors.getErrorInfo(parsedError.code);

              if (errorInfo === ALERT_TEXT.DISCOUNT_CODE_NON) {
                input.setError(errorInfo);
              } else {
                Alert.render({
                  textContent: errorInfo,
                  status: AlertStatus.ERROR,
                  visibleTime: AlertTime.DEFAULT,
                });
              }
            }
          });
      },
    }).getElement();

    this.component.append(input.getElement(), button);
  }
}
