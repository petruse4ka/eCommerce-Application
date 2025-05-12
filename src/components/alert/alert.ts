import successIcon from '@/assets/icons/check-circle.svg';
import errorIcon from '@/assets/icons/close-circle.svg';
import { CUSTOM_ALERT_STYLE } from '@/styles/alert/alert';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

export default class Alert {
  public static render(parameters: {
    textContent: string;
    status: boolean;
    visibleTime: number;
  }): void {
    const { textContent, status, visibleTime } = parameters;

    const alert = new ElementBuilder({
      tag: 'div',
      className: status ? CUSTOM_ALERT_STYLE['ALERT__SUCCESS'] : CUSTOM_ALERT_STYLE['ALERT__ERROR'],
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

  private static addIcon(alert: ElementBuilder, status: boolean): void {
    const icon = new ImageBuilder({
      source: status ? successIcon : errorIcon,
      alt: 'icon',
      className: ['w-[25px]', 'h-[25px]'],
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
