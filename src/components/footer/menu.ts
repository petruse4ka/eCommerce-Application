import { BaseComponent } from '@/components/base/component';
import { FOOTER_MENU_TEXT } from '@/constants/constants';
import { FOOTER_STYLES } from '@/styles/footer';
import { ElementBuilder } from '@/utils/element-builder';

export default class Menu extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: FOOTER_STYLES.MENU });
    this.render();
  }

  protected render(): void {
    const header = new ElementBuilder({
      tag: 'h3',
      className: FOOTER_STYLES.TITLE,
      textContent: FOOTER_MENU_TEXT.TITLE,
    }).getElement();

    this.component.append(header);

    const menuList = new ElementBuilder({
      tag: 'ul',
      className: FOOTER_STYLES.MENU_LIST,
    }).getElement();

    for (const text of Object.values(FOOTER_MENU_TEXT)) {
      const menuItem = new ElementBuilder({
        tag: 'li',
        className: FOOTER_STYLES.MENU_ITEM,
      }).getElement();

      const link = new ElementBuilder({
        tag: 'div',
        className: FOOTER_STYLES.MENU_LINK,
        textContent: text,
      }).getElement();

      menuItem.append(link);
      menuList.append(menuItem);
    }

    this.component.append(menuList);
  }
}
