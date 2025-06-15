import { CartStateKey } from '@/types/enums';
import type { CartInfo, CartLineItem } from '@/types/interfaces';
import type { ActionWithArgumentHandler } from '@/types/types';

class CartState {
  private itemsCount: number = 0;
  private cartInfo: CartInfo | null = null;
  private subscribers: Map<string, ActionWithArgumentHandler<number>[]> = new Map();
  private lineItems: CartLineItem[] = [];
  private isCartCreated: boolean = false;

  public getIsCartCreated(): boolean {
    return this.isCartCreated;
  }

  public setIsCartCreated(value: boolean): void {
    this.isCartCreated = value;
  }

  public getItemsCount(): number {
    return this.itemsCount;
  }

  public getLineItems(): CartLineItem[] {
    return this.lineItems;
  }

  public setItemsCount(count: number): void {
    this.itemsCount = count ?? 0;
    this.notify(CartStateKey.ITEMS_COUNT);
  }

  public getCartInfo(): CartInfo | null {
    return this.cartInfo;
  }

  public setCartInfo(cartInfo: CartInfo): void {
    this.cartInfo = cartInfo;
    this.notify(CartStateKey.CART_INFO);
  }

  public subscribe(key: string, callback: ActionWithArgumentHandler<number>): void {
    const callbacks = this.subscribers.get(key);

    if (callbacks) {
      callbacks.push(callback);
      this.subscribers.set(key, callbacks);
    } else {
      this.subscribers.set(key, [callback]);
    }
  }

  public unsubscribe(key: string, callback: ActionWithArgumentHandler<number>): void {
    const callbacks = this.subscribers.get(key);
    if (callbacks) {
      const subscribers = callbacks.filter((subscriber) => subscriber !== callback);
      this.subscribers.set(key, subscribers);
    }
  }

  public updateCartLine(lineItems: CartLineItem[]): void {
    this.lineItems = lineItems;
    this.notify(CartStateKey.UPDATE_CART_LINE);
  }

  public clearCartState(): void {
    this.cartInfo = null;
    this.lineItems = [];
    this.itemsCount = 0;
    this.isCartCreated = false;
    this.notify(CartStateKey.CART_INFO);
    this.notify(CartStateKey.UPDATE_CART_LINE);
    this.notify(CartStateKey.ITEMS_COUNT);
  }

  private notify(key: string): void {
    const callbacks = this.subscribers.get(key);

    if (callbacks) {
      for (const callback of callbacks) {
        if (callback.length === 0) {
          callback();
        } else {
          callback(this.itemsCount);
        }
      }
    }
  }
}

export const cartState = new CartState();
