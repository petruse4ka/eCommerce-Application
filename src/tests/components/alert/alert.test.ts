import Alert from '@/components/alert';
import { AlertStatus, AlertTime } from '@/types/enums';

describe('Alert', () => {
  test('should render alert with message and success status', () => {
    Alert.render({
      textContent: 'Test message',
      status: AlertStatus.SUCCESS,
      visibleTime: AlertTime.DEFAULT,
    });

    const alert = document.body.firstElementChild;
    expect(alert?.textContent?.trim()).toBe('Test message');
    expect(alert?.classList.contains('animate-visible-right')).toBe(true);
  });
});
