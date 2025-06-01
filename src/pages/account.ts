import '@/styles/main.css';

import AddressList from '@/components/address-list';
import BaseComponent from '@/components/base';
import PersonalInfo from '@/components/personal-info';
import Tabs from '@/components/tabs';
import { userState } from '@/store/user-state';
import { ACCOUNT_PAGE } from '@/styles/pages/account';
import { AddressType, AddressTypeText, TabAccount } from '@/types/enums';
import ElementBuilder from '@/utils/element-builder';
import TransformApiData from '@/utils/transform-api-data';

export default class AccountPage extends BaseComponent {
  private infoContainer: HTMLElement;
  private addressesNode: HTMLElement[];
  private userInfoNode: HTMLElement;
  private container: HTMLElement;

  constructor() {
    super({
      tag: 'main',
      className: ACCOUNT_PAGE.MAIN,
    });

    this.container = new ElementBuilder({
      tag: 'div',
      className: ACCOUNT_PAGE.CONTAINER,
    }).getElement();

    this.infoContainer = new ElementBuilder({
      tag: 'div',
      className: ACCOUNT_PAGE.INFO_CONTAINER,
    }).getElement();

    this.addressesNode = [];

    this.userInfoNode = new PersonalInfo(TransformApiData.transformUserInfo()).getElement();
    userState.subscribe(this.updateContent.bind(this));
    this.render();
  }

  private render(): void {
    this.createTabs();
    this.createAddresses();
    this.createUserInfo();

    this.container.append(this.infoContainer);
    this.component.append(this.container);
  }

  private updateContent(): void {
    while (this.infoContainer.firstChild) {
      this.infoContainer.firstChild.remove();
    }

    while (this.container.firstChild) {
      this.container.firstChild.remove();
    }

    this.render();
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

    //console.log(shippingAddressList, billingAddressList)
    this.addressesNode = [shippingAddressList, billingAddressList];

    for (const node of this.addressesNode) {
      this.infoContainer.append(node);
    }
  }

  private createUserInfo(): void {
    this.userInfoNode = new PersonalInfo(TransformApiData.transformUserInfo()).getElement();

    this.infoContainer.append(this.userInfoNode);
  }

  private createTabs(): void {
    const tab = new Tabs([
      {
        textContent: TabAccount.INFO,
        isActive: true,
        callback: (): void => {
          this.visibleCurrentContent(this.userInfoNode);
        },
      },
      {
        textContent: TabAccount.ADDRESSES,
        isActive: false,
        callback: (): void => {
          this.visibleCurrentContent(this.addressesNode);
        },
      },
      {
        textContent: TabAccount.CHANGE_PASS,
        isActive: false,
        callback: (): void => {},
      },
    ]);

    this.container.append(tab.getElement());
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
