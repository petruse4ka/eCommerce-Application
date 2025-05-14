import githubIcon from '@/assets/icons/github.svg';
import { BaseComponent } from '@/components/base/component';
import { FOOTER_TEXTS } from '@/constants/constants';
import { SCHOOL_URL, TEAM } from '@/data';
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

    const copyrightText = new ElementBuilder({
      tag: 'p',
      className: FOOTER_STYLES.COPYRIGHT_TEXT,
      textContent: FOOTER_TEXTS.COPYRIGHT,
    }).getElement();

    copyrightLink.append(copyrightText);
    return copyrightLink;
  }

  private static createLinksContainer(): HTMLElement {
    const linksContainer = new ElementBuilder({
      tag: 'div',
      className: FOOTER_STYLES.COPYRIGHT_LINKS,
    }).getElement();

    for (const member of TEAM) {
      const link = new LinkBuilder({
        href: member.GITHUB,
        target: '_blank',
        className: FOOTER_STYLES.COPYRIGHT_LINK,
      }).getElement();

      const icon = new ImageBuilder({
        source: githubIcon,
        alt: 'GitHub Icon',
        className: FOOTER_STYLES.COPYRIGHT_ICON,
      }).getElement();

      const name = new ElementBuilder({
        tag: 'span',
        className: '',
        textContent: member.NICKNAME.includes('margaryta')
          ? `${member.NICKNAME} (Mentor)`
          : member.NICKNAME,
      }).getElement();

      link.append(icon, name);
      linksContainer.append(link);
    }

    return linksContainer;
  }

  protected render(): void {
    const copyrightContainer = new ElementBuilder({
      tag: 'div',
      className: FOOTER_STYLES.COPYRIGHT_CONTAINER,
    }).getElement();

    const copyrightLink = Copyright.createCopyrightLink();
    const linksContainer = Copyright.createLinksContainer();

    copyrightContainer.append(linksContainer, copyrightLink);
    this.component.append(copyrightContainer);
  }
}
