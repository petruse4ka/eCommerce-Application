import type { Customer } from '@/types/interfaces';
import type { ActionHandler } from '@/types/types';

export class UserState {
  private isAuthorized: boolean;
  private subscribers: ActionHandler[];
  private userInfo: Customer | null;

  constructor() {
    this.isAuthorized = false;
    this.subscribers = [];
    this.userInfo = null;
    // this.userInfo = {
    //   id: 'cdddff38-c479-46b1-9ae3-bbd10ae45a79',
    //   version: 1,
    //   versionModifiedAt: '2025-05-21T08:41:37.572Z',
    //   lastMessageSequenceNumber: 1,
    //   createdAt: '2025-05-21T08:41:37.572Z',
    //   lastModifiedAt: '2025-05-21T08:41:37.572Z',
    //   lastModifiedBy: {
    //     clientId: 'EhHGaPtXgMnlQ8MmN5gDu1FV',
    //     isPlatformClient: false,
    //   },
    //   createdBy: {
    //     clientId: 'EhHGaPtXgMnlQ8MmN5gDu1FV',
    //     isPlatformClient: false,
    //   },
    //   email: 'cab@cab.cab',
    //   firstName: 'Абубубибуб-имя',
    //   lastName: 'Бубубубубу-фамили',
    //   dateOfBirth: '2005-05-05',
    //   password: '****+EM=',
    //   addresses: [
    //     {
    //       id: 'j0FX0R91',
    //       streetName: 'Достака-улица',
    //       postalCode: '111111',
    //       city: 'Доставка-город',
    //       country: 'RU',
    //     },
    //     {
    //       id: '0jPJS7Jx',
    //       streetName: 'расчет-улица',
    //       postalCode: '222222',
    //       city: 'расчет-город',
    //       country: 'RU',
    //     },
    //   ],
    //   defaultShippingAddressId: 'j0FX0R91',
    //   defaultBillingAddressId: '0jPJS7Jx',
    //   shippingAddressIds: ['j0FX0R91'],
    //   billingAddressIds: ['0jPJS7Jx'],
    //   isEmailVerified: false,
    //   customerGroupAssignments: [],
    //   stores: [],
    //   authenticationMode: 'Password',
    // };
  }

  public getAuthorizationState(): boolean {
    return this.isAuthorized;
  }

  public setAuthorizationState(value: boolean): void {
    this.isAuthorized = value;
    this.notify();
  }

  public getUserInfoState(): Customer | null {
    return this.userInfo;
  }

  public setUserInfoState(value: Customer): void {
    this.userInfo = value;
  }

  public subscribe(callback: ActionHandler): void {
    this.subscribers.push(callback);
  }

  public unsubscribe(callback: ActionHandler): void {
    this.subscribers = this.subscribers.filter((subscriber) => subscriber !== callback);
  }

  private notify(): void {
    for (const callback of this.subscribers) {
      callback();
    }
  }
}

export const userState = new UserState();
