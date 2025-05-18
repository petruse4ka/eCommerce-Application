import type { ErrorInfo } from '@/types/interfaces';

export default class ApiErrors {
  public static getErrorInfo(key: string): ErrorInfo {
    switch (key) {
      case 'invalid_customer_account_credentials': {
        return {
          inputs: ['email', 'password'],
          message: 'Учетная запись клиента с указанными учетными данными не найдена.',
        };

        break;
      }

      default: {
        return {
          inputs: [],
          message: 'Произошли какие-то проблемы. Попробуйте еще раз',
        };
        break;
      }
    }
  }
}
