import '@/styles/main.css';

import AddressList from '@/components/address-list';
import BaseComponent from '@/components/base';
import FormEditPassword from '@/components/forms/edit-password';
import Modal from '@/components/modal';
import PersonalInfo from '@/components/personal-info';
import Tabs from '@/components/tabs';
import { PAGE_TITLES } from '@/constants';
import { userState } from '@/store/user-state';
import { ACCOUNT_PAGE } from '@/styles/pages/account';
import { TAB } from '@/styles/tab';
import { AddressType, AddressTypeText, ModalTitle, TabAccount } from '@/types/enums';
import ElementBuilder from '@/utils/element-builder';
import SVGBuilder from '@/utils/svg-builder';
import TransformApiData from '@/utils/transform-api-data';

export default class AccountPage extends BaseComponent {
  private static readonly ACCOUNT_EDIT_ICON =
    'M2 17V20H10V18.11H3.9V17C3.9 16.36 7.03 14.9 10 14.9C10.96 14.91 11.91 15.04 12.83 15.28L14.35 13.76C12.95 13.29 11.5 13.03 10 13C7.33 13 2 14.33 2 17M10 4C7.79 4 6 5.79 6 8S7.79 12 10 12 14 10.21 14 8 12.21 4 10 4M10 10C8.9 10 8 9.11 8 8S8.9 6 10 6 12 6.9 12 8 11.11 10 10 10M21.7 13.35L20.7 14.35L18.65 12.35L19.65 11.35C19.86 11.14 20.21 11.14 20.42 11.35L21.7 12.63C21.91 12.84 21.91 13.19 21.7 13.4M12 18.94L18.06 12.88L20.11 14.88L14.11 20.95H12V18.94';
  private static readonly HOME_EDIT_ICON =
    'M 21.0413,11.14C 21.1827,11.14 21.3173,11.1973 21.4213,11.3027L 22.6973,12.5787C 22.912,12.792 22.912,13.14 22.6973,13.3493L 21.6973,14.3493L 19.6507,12.3027L 20.6507,11.3027C 20.76,11.1973 20.9013,11.14 21.0413,11.14 Z M 19.0627,12.88L 21.1093,14.932L 15.0627,21L 13,21L 13,18.9373L 19.0627,12.88 Z M 12,5.688L 7,10.188L 7,18L 11,18L 11,20L 5,20L 5,12L 2,12L 12,3L 19.4587,9.71285L 17,12.1716L 17,10.188L 12,5.688 Z';
  private static readonly SHIELD_EDIT_ICON =
    'M21.7 13.6L20.4 12.3C20.3 12.2 20.2 12.1 20 12.1C19.9 12.1 19.7 12.2 19.6 12.3L18.6 13.3L20.6 15.3L21.6 14.3C21.9 14.1 21.9 13.8 21.7 13.6M12 19.9V22H14.1L20.2 15.9L18.2 13.8L12 19.9M10 22.3C5.9 20.3 3 15.8 3 11V5L12 1L21 5V8.1L19 10.1V6.3L12 3.2L5 6.3V11.2C5 14.7 7.2 18.3 10 20.1V22.3Z';

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
      source: AccountPage.ACCOUNT_EDIT_ICON,
      className: [],
      classNameIcon: TAB.ICON,
      viewBox: '0 0 24 24',
      iconSize: 24,
    }).getElement();

    const addressesIcon = new SVGBuilder({
      source: AccountPage.HOME_EDIT_ICON,
      className: [],
      classNameIcon: TAB.ICON,
      viewBox: '0 0 24 24',
      iconSize: 24,
    }).getElement();

    const passwordIcon = new SVGBuilder({
      source: AccountPage.SHIELD_EDIT_ICON,
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
      AddressTypeText.SHIPPING,
      addressInfo[AddressType.SHIPPING]
    ).getElement();

    const billingAddressList = new AddressList(
      AddressTypeText.BILLING,
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
        textContent: TabAccount.INFO,
        isActive: this.currentActive === 'userInfo',
        callback: (): void => {
          this.visibleCurrentContent(this.userInfoNode);
          this.currentActive = 'userInfo';
        },
        icon: personalInfoIcon,
      },
      {
        textContent: TabAccount.ADDRESSES,
        isActive: this.currentActive === 'addresses',
        callback: (): void => {
          this.visibleCurrentContent(this.addressesNode);
          this.currentActive = 'addresses';
        },
        icon: addressesIcon,
      },
      {
        textContent: TabAccount.CHANGE_PASS,
        callback: (): void => {
          const form = new FormEditPassword();
          const modal = new Modal({ title: ModalTitle.CHANGE_PASSWORD, content: form });
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
