import { AlertText } from '@/types/enums';
import type { ErrorInfo } from '@/types/interfaces';

export default class ApiErrors {
  public static getErrorInfo(key: string): ErrorInfo {
    switch (key) {
      case 'invalid_customer_account_credentials': {
        return {
          inputs: ['email', 'password'],
          message: AlertText.ACCOUNT_CREDENTIALS_ERROR,
        };

        break;
      }

      default: {
        return {
          inputs: [],
          message: AlertText.ERROR_DEFAULT,
        };
        break;
      }
    }
  }
}
