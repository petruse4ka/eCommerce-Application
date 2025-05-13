import { BaseComponent } from '@/components/base/component';
import { MENU_TEXT } from '@/constants/constants';
import { HEADER_STYLES } from '@/styles/header/header';
import { ElementBuilder } from '@/utils/element-builder';

export default class MainMenu extends BaseComponent {
  constructor() {
    super({ tag: 'nav', className: HEADER_STYLES.MAIN_MENU });
    this.render();
  }

  protected render(): void {
    const menuItems = Object.values(MENU_TEXT).map((text) => {
      return new ElementBuilder({
        tag: 'span',
        className: HEADER_STYLES.MENU_ITEM,
        textContent: text,
      }).getElement();
    });

    this.component.append(...menuItems);
  }
}
