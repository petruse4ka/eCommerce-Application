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
