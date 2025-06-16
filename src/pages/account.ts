import '@/styles/main.css';

import AddressList from '@/components/address-list';
import BaseComponent from '@/components/base';
import FormEditPassword from '@/components/forms/edit-password';
import Modal from '@/components/modal';
import PersonalInfo from '@/components/personal-info';
import Tabs from '@/components/tabs';
import { PAGE_TITLES } from '@/constants';
import { ADDRESS_TYPE_TEXT, MODAL_TITLE, TAB_ACCOUNT } from '@/constants';
import { SVG_ICONS } from '@/data';
import { userState } from '@/store/user-state';
import { ACCOUNT_PAGE } from '@/styles/pages/account';
import { TAB } from '@/styles/tab';
import { AddressType } from '@/types/enums';
import ElementBuilder from '@/utils/element-builder';
import SVGBuilder from '@/utils/svg-builder';
import TransformApiData from '@/utils/transform-api-data';

export default class AccountPage extends BaseComponent {
  private infoContainer: HTMLElement;
  private addressesNode: HTMLElement[];
  private userInfoNode: HTMLElement;
  private container: HTMLElement;
  private tabsContainer: HTMLElement;
  private currentActive: string;

  constructor() {
    super({
      tag: 'main',
      className: ACCOUNT_PAGE.MAIN,
    });

    this.container = new ElementBuilder({
      tag: 'div',
      className: ACCOUNT_PAGE.CONTAINER,
    }).getElement();

    this.tabsContainer = new ElementBuilder({
      tag: 'div',
      className: ACCOUNT_PAGE.TABS_CONTAINER,
    }).getElement();

    this.infoContainer = new ElementBuilder({
      tag: 'div',
      className: ACCOUNT_PAGE.INFO_CONTAINER,
    }).getElement();

    this.currentActive = 'userInfo';

    this.addressesNode = [];

    this.userInfoNode = new PersonalInfo(TransformApiData.transformUserInfo()).getElement();
    userState.subscribe(this.updateContent.bind(this));

    this.render();
  }

  private static createTabIcons(): {
    personalInfoIcon: HTMLElement;
    addressesIcon: HTMLElement;
    passwordIcon: HTMLElement;
  } {
    const personalInfoIcon = new SVGBuilder({
      source: SVG_ICONS.ACCOUNT_EDIT_ICON,
      className: [],
      classNameIcon: TAB.ICON,
      viewBox: '0 0 24 24',
      iconSize: 24,
    }).getElement();

    const addressesIcon = new SVGBuilder({
      source: SVG_ICONS.HOME_EDIT_ICON,
      className: [],
      classNameIcon: TAB.ICON,
      viewBox: '0 0 24 24',
      iconSize: 24,
    }).getElement();

    const passwordIcon = new SVGBuilder({
      source: SVG_ICONS.SHIELD_EDIT_ICON,
      className: [],
      classNameIcon: TAB.ICON,
      viewBox: '0 0 24 24',
      iconSize: 24,
    }).getElement();

    return { personalInfoIcon, addressesIcon, passwordIcon };
  }

  private render(): void {
    const title = new ElementBuilder({
      tag: 'h1',
      className: ACCOUNT_PAGE.TITLE,
      textContent: PAGE_TITLES.ACCOUNT,
    }).getElement();

    this.createTabs();
    this.createAddresses();
    this.createUserInfo();

    this.container.append(this.tabsContainer, this.infoContainer);
    this.component.append(title, this.container);
  }

  private updateContent(): void {
    while (this.infoContainer.firstChild) {
      this.infoContainer.firstChild.remove();
    }

    while (this.tabsContainer.firstChild) {
      this.tabsContainer.firstChild.remove();
    }

    this.createTabs();
    this.createAddresses();
    this.createUserInfo();
  }

  private createUserInfo(): void {
    const userInfo = TransformApiData.transformUserInfo();
    this.userInfoNode = new PersonalInfo(userInfo).getElement();

    if (this.currentActive !== 'userInfo') {
      this.userInfoNode.classList.add('hidden');
    }

    this.infoContainer.append(this.userInfoNode);
  }

  private createAddresses(): void {
    const addressInfo = TransformApiData.transformUserAddresses();

    const shippingAddressList = new AddressList(
      ADDRESS_TYPE_TEXT.SHIPPING,
      addressInfo[AddressType.SHIPPING]
    ).getElement();

    const billingAddressList = new AddressList(
      ADDRESS_TYPE_TEXT.BILLING,
      addressInfo[AddressType.BILLING]
    ).getElement();

    if (this.currentActive !== 'addresses') {
      shippingAddressList.classList.add('hidden');
      billingAddressList.classList.add('hidden');
    }

    this.addressesNode = [shippingAddressList, billingAddressList];

    for (const node of this.addressesNode) {
      this.infoContainer.append(node);
    }
  }

  private createTabs(): void {
    const { personalInfoIcon, addressesIcon, passwordIcon } = AccountPage.createTabIcons();

    const tab = new Tabs([
      {
        textContent: TAB_ACCOUNT.INFO,
        isActive: this.currentActive === 'userInfo',
        callback: (): void => {
          this.visibleCurrentContent(this.userInfoNode);
          this.currentActive = 'userInfo';
        },
        icon: personalInfoIcon,
      },
      {
        textContent: TAB_ACCOUNT.ADDRESSES,
        isActive: this.currentActive === 'addresses',
        callback: (): void => {
          this.visibleCurrentContent(this.addressesNode);
          this.currentActive = 'addresses';
        },
        icon: addressesIcon,
      },
      {
        textContent: TAB_ACCOUNT.CHANGE_PASS,
        callback: (): void => {
          const form = new FormEditPassword();
          const modal = new Modal({ title: MODAL_TITLE.CHANGE_PASSWORD, content: form });
          this.component.append(modal.getElement());
          modal.showModal();
        },
        icon: passwordIcon,
      },
    ]);

    this.tabsContainer.append(tab.getElement());
  }

  private visibleCurrentContent(nodeVisible: HTMLElement | HTMLElement[]): void {
    const allNode = [this.userInfoNode, ...this.addressesNode];
    for (const node of allNode) {
      node.classList.add('hidden');
    }

    if (Array.isArray(nodeVisible)) {
      for (const node of nodeVisible) node.classList.remove('hidden');
    } else {
      nodeVisible.classList.remove('hidden');
    }
  }
}
