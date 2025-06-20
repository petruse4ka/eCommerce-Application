import type { Products } from '@/types/interfaces';

class ProductsState {
  private products: Products[] = [];
  private fractionDigits: number = 2;
  private subscribers: Array<() => void> = [];
  private errorSubscribers: Array<() => void> = [];

  public getProducts(): Products[] {
    return this.products;
  }

  public getFractionDigits(): number {
    return this.fractionDigits;
  }

  public updateProducts(products: Products[]): void {
    this.products = products;
    if (products.length > 0 && products[0].fractionDigits) {
      this.fractionDigits = products[0].fractionDigits;
    }
    this.notify();
  }

  public subscribe(callback: () => void): void {
    this.subscribers.push(callback);
  }

  public subscribeError(callback: () => void): void {
    this.errorSubscribers.push(callback);
  }

  public notifyError(): void {
    for (const subscriber of this.errorSubscribers) {
      subscriber();
    }
  }

  private notify(): void {
    for (const subscriber of this.subscribers) {
      subscriber();
    }
  }
}

export const productsState = new ProductsState();
