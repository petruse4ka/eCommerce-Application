import { describe, expect, test } from 'vitest';

import Alert from '@/components/alert/alert';
import { AlertStatus } from '@/types/enums';

describe('Test base alert class', () => {
  test('should render alert with icon and correct status', () => {
    Alert.render({
      textContent: 'Test message',
      status: AlertStatus.SUCCESS,
      visibleTime: 3000,
    });

    const alert = document.body.firstElementChild;
    expect(alert?.textContent?.trim()).toBe('Test message');
    expect(alert?.classList.contains('animate-visible-right')).toBe(true);
  });
});
