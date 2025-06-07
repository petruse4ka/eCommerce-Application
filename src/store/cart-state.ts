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

  public setLineItems(lineItems: CartLineItem[]): void {
    this.lineItems = lineItems;
    this.notify();
  }

  public setItemsCount(count: number): void {
    this.itemsCount = count;
    this.notify();
  }

  public incrementItemsCount(itemCount: number): void {
    this.itemsCount += itemCount;
    this.notify();
  }

  public decrementItemsCount(itemCount: number): void {
    if (this.itemsCount > 0 && itemCount <= this.itemsCount) {
      this.itemsCount -= itemCount;
    } else {
      this.itemsCount = 0;
    }
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
    this.itemsCount = lineItems.reduce((sum, item) => sum + item.quantity, 0);
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
