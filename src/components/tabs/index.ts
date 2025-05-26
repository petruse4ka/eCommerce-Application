import { TAB } from '@/styles/tab';

import BaseComponent from '../base';

export default class Tabs extends BaseComponent {
  private tabs: BaseComponent[];

  constructor(tabsInfo: { textContent: string; isActive: boolean; callback: () => void }[]) {
    super({
      tag: 'div',
      className: TAB.CONTAINER,
    });

    this.tabs = [];

    for (const tabInfo of tabsInfo) {
      this.createTabItem(tabInfo.textContent, tabInfo.isActive, tabInfo.callback);
    }
  }

  private createTabItem(textContent: string, isActive: boolean, callback: () => void): void {
    const tabItem = new BaseComponent({
      tag: 'div',
      className: isActive ? TAB.BUTTON_STYLE.ACTIVE : TAB.BUTTON_STYLE.DEFAULT,
      textContent,
      callback: (): void => {
        this.toggleActive(tabItem);
        callback();
      },
    });

    if (isActive) {
      this.toggleActive(tabItem);
    }

    this.tabs.push(tabItem);

    this.getElement().append(tabItem.getElement());
  }

  private toggleActive(node: BaseComponent): void {
    for (const tab of this.tabs) {
      tab.removeClass(TAB.BUTTON_STYLE.ACTIVE);
      tab.addClass(TAB.BUTTON_STYLE.DEFAULT);
    }

    node.removeClass(TAB.BUTTON_STYLE.DEFAULT);
    node.addClass(TAB.BUTTON_STYLE.ACTIVE);
  }
}
