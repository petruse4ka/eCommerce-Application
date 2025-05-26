import '@/styles/main.css';

import AddressList from '@/components/address-list';
import BaseComponent from '@/components/base';
import PersonalInfo from '@/components/personal-info';
import Tabs from '@/components/tabs';
import { ACCOUNT_PAGE } from '@/styles/pages/account';
import { AddressType, TabAccount } from '@/types/enums';
import TransformApiData from '@/utils/transform-api-data';

export default class AccountPage extends BaseComponent {
  private infoContainer: HTMLElement;
  private addressesNode: HTMLElement[];
  private userInfoNode: HTMLElement;

  constructor() {
    super({
      tag: 'div',
      className: ACCOUNT_PAGE.CONTAINER,
    });

    this.infoContainer = new BaseComponent({
      tag: 'div',
      className: ACCOUNT_PAGE.INFO_CONTAINER,
    }).getElement();

    const addressInfo = TransformApiData.transformUserAddresses();

    const shippingAddressList = new AddressList(
      'Адреса доставки',
      addressInfo[AddressType.SHIPPING]
    );
    const billingAddressList = new AddressList(
      'Рассчетные адреса',
      addressInfo[AddressType.BILLING]
    );

    this.addressesNode = [shippingAddressList.getElement(), billingAddressList.getElement()];

    this.userInfoNode = new PersonalInfo(TransformApiData.transformUserInfo()).getElement();

    this.render();
  }

  private render(): void {
    this.createTabs();
    this.infoContainer.append(this.userInfoNode);
    for (const node of this.addressesNode) {
      this.infoContainer.append(node);
    }

    this.component.append(this.infoContainer);
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

    this.component.append(tab.getElement());
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
