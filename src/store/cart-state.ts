import type { cartInfo } from '@/types/interfaces';
import type { ActionWithArgumentHandler } from '@/types/types';

class CartState {
  private itemsCount: number = 0;
  private cartInfo: cartInfo | null = null;
  private subscribers: ActionWithArgumentHandler<number>[] = [];

  public getItemsCount(): number {
    return this.itemsCount;
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

  public getCartInfo(): cartInfo | null {
    return this.cartInfo;
  }

  public setCartInfo(cartInfo: cartInfo): void {
    this.cartInfo = cartInfo;
    this.notify();
  }

  public subscribe(callback: ActionWithArgumentHandler<number>): void {
    this.subscribers.push(callback);
  }

  public unsubscribe(callback: ActionWithArgumentHandler<number>): void {
    this.subscribers = this.subscribers.filter((subscriber) => subscriber !== callback);
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
