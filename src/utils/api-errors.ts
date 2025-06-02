import { AlertText } from '@/types/enums';

export default class ApiErrors {
  public static getErrorInfo(key: string): string {
    switch (key) {
      case 'invalid_customer_account_credentials': {
        return AlertText.ACCOUNT_CREDENTIALS_ERROR;
      }

      case 'DuplicateField': {
        return AlertText.DUPLICATE_FIELD;
      }

      case 'InvalidCurrentPassword': {
        return AlertText.INVALID_CURRENT_PASSWORD;
      }

      default: {
        return AlertText.ERROR_DEFAULT;
      }
    }
  }
}
