import githubIcon from '@/assets/icons/github.svg';
import BaseComponent from '@/components/base';
import { FOOTER_TEXTS } from '@/constants';
import { TEAM } from '@/data';
import { FOOTER_STYLES } from '@/styles/footer';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';
import LinkBuilder from '@/utils/link-builder';

export default class Team extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: FOOTER_STYLES.TEAM });
    this.render();
  }

  private static createLinksContainer(): HTMLElement {
    const linksContainer = new ElementBuilder({
      tag: 'div',
      className: FOOTER_STYLES.TEAM_LIST,
    }).getElement();

    for (const member of TEAM) {
      const link = new LinkBuilder({
        href: member.GITHUB,
        target: '_blank',
        className: FOOTER_STYLES.TEAM_LINK,
      }).getElement();

      const icon = new ImageBuilder({
        source: githubIcon,
        alt: 'GitHub Icon',
        className: FOOTER_STYLES.TEAM_ICON,
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
    const title = new ElementBuilder({
      tag: 'h3',
      className: FOOTER_STYLES.TITLE,
      textContent: FOOTER_TEXTS.TEAM_TITLE,
    }).getElement();

    const team = Team.createLinksContainer();

    this.component.append(title, team);
  }
}
