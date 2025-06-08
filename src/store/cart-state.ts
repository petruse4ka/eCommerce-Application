import type { CartInfo, CartLineItem } from '@/types/interfaces';
import type { ActionWithArgumentHandler } from '@/types/types';

class CartState {
  private itemsCount: number = 0;
  private cartInfo: CartInfo | null = null;
  private subscribers: ActionWithArgumentHandler<number>[] = [];
  private lineItems: CartLineItem[] = [];

  public getItemsCount(): number {
    return this.itemsCount;
  }

  public getLineItems(): CartLineItem[] {
    return this.lineItems;
  }

  public setItemsCount(count: number): void {
    this.itemsCount = count;
    this.notify();
  }

  public getCartInfo(): CartInfo | null {
    return this.cartInfo;
  }

  public setCartInfo(cartInfo: CartInfo): void {
    this.cartInfo = cartInfo;
    this.notify();
  }

  public subscribe(callback: ActionWithArgumentHandler<number>): void {
    this.subscribers.push(callback);
  }

  public unsubscribe(callback: ActionWithArgumentHandler<number>): void {
    this.subscribers = this.subscribers.filter((subscriber) => subscriber !== callback);
  }

  public updateCart(cartInfo: CartInfo, lineItems: CartLineItem[]): void {
    this.cartInfo = cartInfo;
    this.lineItems = lineItems;
    this.notify();
  }

  private notify(): void {
    for (const callback of this.subscribers) {
      if (callback.length === 0) {
        callback();
      } else {
        callback(this.itemsCount);
      }
    }
  }
}

export const cartState = new CartState();
