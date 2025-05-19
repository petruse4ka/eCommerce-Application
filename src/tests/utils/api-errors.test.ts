import { describe, expect, test } from 'vitest';

import { AlertText } from '@/types/enums';
import ApiErrors from '@/utils/api-errors';

describe('Api error', () => {
  test('should return default error for unknown key', () => {
    const result = ApiErrors.getErrorInfo('unknown_error');

    expect(result).toEqual({
      inputs: [],
      message: AlertText.ERROR_DEFAULT,
    });
  });
});
