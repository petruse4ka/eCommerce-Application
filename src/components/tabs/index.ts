import { TAB } from '@/styles/tab';
import type { TabInfo } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';

import BaseComponent from '../base';

export default class Tabs extends BaseComponent {
  private tabs: ElementBuilder[];

  constructor(tabsInfo: TabInfo[]) {
    super({
      tag: 'div',
      className: TAB.CONTAINER,
    });

    this.tabs = [];

    for (const tabInfo of tabsInfo) {
      this.createTabItem(tabInfo.textContent, tabInfo.isActive, tabInfo.callback, tabInfo.icon);
    }
  }

  private createTabItem(
    textContent: string,
    isActive: boolean | undefined,
    callback: () => void,
    icon?: HTMLElement
  ): void {
    const tabItem = new ElementBuilder({
      tag: 'div',
      className: isActive ? TAB.BUTTON_STYLE.ACTIVE : TAB.BUTTON_STYLE.DEFAULT,
      callback: (): void => {
        if (isActive !== undefined) {
          this.toggleActive(tabItem);
        }
        callback();
      },
    });

    if (icon) {
      tabItem.getElement().append(icon);
    }

    const textSpan = new ElementBuilder({
      tag: 'span',
      className: TAB.NAME,
      textContent,
    }).getElement();

    tabItem.getElement().append(textSpan);

    if (isActive) {
      this.toggleActive(tabItem);
    }

    this.tabs.push(tabItem);

    this.getElement().append(tabItem.getElement());
  }

  private toggleActive(node: ElementBuilder): void {
    for (const tab of this.tabs) {
      tab.removeCssClasses(TAB.BUTTON_STYLE.ACTIVE);
      tab.applyCssClasses(TAB.BUTTON_STYLE.DEFAULT);
    }

    node.removeCssClasses(TAB.BUTTON_STYLE.DEFAULT);
    node.applyCssClasses(TAB.BUTTON_STYLE.ACTIVE);
  }
}
