import type { Products } from '@/types/interfaces';

class ProductsState {
  private products: Products[] = [];
  private subscribers: Array<() => void> = [];

  public getProducts(): Products[] {
    return this.products;
  }

  public updateProducts(products: Products[]): void {
    this.products = products;
    this.notify();
  }

  public subscribe(callback: () => void): void {
    this.subscribers.push(callback);
  }

  private notify(): void {
    for (const subscriber of this.subscribers) {
      subscriber();
    }
  }
}

export const productsState = new ProductsState();
