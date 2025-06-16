import { ALERT_TEXT } from '@/constants';

export default class ApiErrors {
  public static getErrorInfo(key: string): string {
    switch (key) {
      case 'invalid_customer_account_credentials': {
        return ALERT_TEXT.ACCOUNT_CREDENTIALS_ERROR;
      }

      case 'DuplicateField': {
        return ALERT_TEXT.DUPLICATE_FIELD;
      }

      case 'InvalidCurrentPassword': {
        return ALERT_TEXT.INVALID_CURRENT_PASSWORD;
      }

      case 'DiscountCodeNonApplicable': {
        return ALERT_TEXT.DISCOUNT_CODE_NON;
      }

      default: {
        return ALERT_TEXT.ERROR_DEFAULT;
      }
    }
  }
}
