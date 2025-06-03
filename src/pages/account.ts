import '@/styles/main.css';

import accountEditIcon from '@/assets/icons/account-edit.svg';
import homeEditIcon from '@/assets/icons/home-edit.svg';
import shieldEditIcon from '@/assets/icons/shield-edit.svg';
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
import ImageBuilder from '@/utils/image-builder';
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
    const personalInfoIcon = new ImageBuilder({
      source: accountEditIcon,
      alt: 'Personal Info',
      className: TAB.ICON,
    }).getElement();

    const addressesIcon = new ImageBuilder({
      source: homeEditIcon,
      alt: 'Addresses',
      className: TAB.ICON,
    }).getElement();

    const passwordIcon = new ImageBuilder({
      source: shieldEditIcon,
      alt: 'Change Password',
      className: TAB.ICON,
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
