import successIcon from '@/assets/icons/check-circle.svg';
import errorIcon from '@/assets/icons/close-circle.svg';
import infoIcon from '@/assets/icons/info-circle.svg';
import warningIcon from '@/assets/icons/warning-circle.svg';
import { CUSTOM_ALERT_STYLE } from '@/styles/alert/alert';
import type { AlertStatus } from '@/types/enums';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

const iconsSource = {
  SUCCESS: successIcon,
  ERROR: errorIcon,
  WARNING: warningIcon,
  INFO: infoIcon,
};

export default class Alert {
  public static render(parameters: {
    textContent: string;
    status: AlertStatus;
    visibleTime: number;
  }): void {
    const { textContent, status, visibleTime } = parameters;

    const alert = new ElementBuilder({
      tag: 'div',
      className: CUSTOM_ALERT_STYLE[`ALERT_${status}`],
      textContent,
    });

    this.addIcon(alert, status);

    document.body.append(alert.getElement());
    alert.applyCssClasses('animate-visible-right');

    const closeAlertTimer = setTimeout(() => {
      this.closeAlert(alert);
      clearTimeout(closeAlertTimer);
    }, visibleTime);
  }

  private static addIcon(alert: ElementBuilder, status: AlertStatus): void {
    const icon = new ImageBuilder({
      source: iconsSource[status],
      alt: '',
      className: CUSTOM_ALERT_STYLE['ALERT_ICON'],
    }).getElement();

    alert.getElement().append(icon);
  }

  private static closeAlert(alert: ElementBuilder): void {
    alert.removeCssClasses('animate-visible-right');
    alert.applyCssClasses('animate-hidden-right');
    alert.getElement().addEventListener('animationend', (event) => {
      if (event.animationName === 'animate-hidden-right') {
        alert.getElement().remove();
      }
    });
  }
}
