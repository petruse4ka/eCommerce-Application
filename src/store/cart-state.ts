import type { cartInfo } from '@/types/interfaces';
import type { ActionHandler } from '@/types/types';

class CartState {
  private cartInfo: cartInfo = { id: '', version: 0 };
  private subscribers: ActionHandler[] = [];

  public getCartInfo(): cartInfo {
    return this.cartInfo;
  }

  public setCartInfo(cartInfo: cartInfo): void {
    this.cartInfo = cartInfo;
    this.notify();
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

export const cartState = new CartState();
