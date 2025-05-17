import rsLogo from '@/assets/logo/rs-school-logo.svg';
import { BaseComponent } from '@/components/base/component';
import { FOOTER_TEXTS } from '@/constants/constants';
import { SCHOOL_URL } from '@/data';
import { FOOTER_STYLES } from '@/styles/footer';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';
import { LinkBuilder } from '@/utils/link-builder';

export default class Copyright extends BaseComponent {
  constructor() {
    super({
      tag: 'div',
      className: FOOTER_STYLES.COPYRIGHT,
    });
    this.render();
  }

  private static createCopyrightLink(): HTMLElement {
    const copyrightLink = new LinkBuilder({
      href: SCHOOL_URL,
      target: '_blank',
      className: FOOTER_STYLES.COPYRIGHT_LINK,
    }).getElement();

    const logo = new ImageBuilder({
      source: rsLogo,
      alt: 'RS School Logo',
      className: FOOTER_STYLES.COPYRIGHT_ICON,
    }).getElement();

    const copyrightText = new ElementBuilder({
      tag: 'p',
      className: '',
      textContent: FOOTER_TEXTS.COPYRIGHT,
    }).getElement();

    copyrightLink.append(logo, copyrightText);
    return copyrightLink;
  }

  protected render(): void {
    const copyrightContainer = new ElementBuilder({
      tag: 'div',
      className: FOOTER_STYLES.COPYRIGHT_CONTAINER,
    }).getElement();

    const copyrightLink = Copyright.createCopyrightLink();

    copyrightContainer.append(copyrightLink);
    this.component.append(copyrightContainer);
  }
}
