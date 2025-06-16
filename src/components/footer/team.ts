import BaseComponent from '@/components/base';
import { FOOTER_TEXTS } from '@/constants';
import { TEAM } from '@/data';
import { SVG_ICONS } from '@/data';
import { FOOTER_STYLES } from '@/styles/footer';
import type { Crewman } from '@/types/types';
import ElementBuilder from '@/utils/element-builder';
import LinkBuilder from '@/utils/link-builder';
import SVGBuilder from '@/utils/svg-builder';

export default class Team extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: FOOTER_STYLES.TEAM });
    this.render();
  }

  public static createGithubLink(member: Crewman): HTMLElement {
    const link = new LinkBuilder({
      href: member.GITHUB,
      target: '_blank',
      className: FOOTER_STYLES.TEAM_LINK,
    }).getElement();

    const icon = new SVGBuilder({
      source: SVG_ICONS.GITHUB_ICON,
      className: [],
      classNameIcon: FOOTER_STYLES.TEAM_ICON,
    }).getElement();

    const name = new ElementBuilder({
      tag: 'span',
      className: '',
      textContent: member.NICKNAME.includes('margaryta')
        ? `${member.NICKNAME} (Mentor)`
        : member.NICKNAME,
    }).getElement();

    link.append(icon, name);
    return link;
  }

  private static createLinksContainer(): HTMLElement {
    const linksContainer = new ElementBuilder({
      tag: 'div',
      className: FOOTER_STYLES.TEAM_LIST,
    }).getElement();

    for (const member of TEAM) {
      linksContainer.append(Team.createGithubLink(member));
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
