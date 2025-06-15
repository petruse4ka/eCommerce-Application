import { ALERT_TEXT } from '@/constants';
import ApiErrors from '@/utils/api-errors';

describe('Api error', () => {
  test('should return default error for unknown key', () => {
    const result = ApiErrors.getErrorInfo('unknown_error');

    expect(result).toBe(ALERT_TEXT.ERROR_DEFAULT);
  });
});
