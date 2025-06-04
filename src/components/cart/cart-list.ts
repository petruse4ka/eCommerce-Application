import productImage from '@/assets/images/macarons.jpg';
import { CART_LIST } from '@/styles/cart/cart-list';

import BaseComponent from '../base';
import CartItem from './cart-item';

export default class CartList extends BaseComponent {
  constructor() {
    super({
      tag: 'section',
      className: CART_LIST.CONTAINER,
    });

    this.render();
  }

  private render(): void {
    const products = [
      {
        name: 'Продукт 1',
        img: productImage,
        price: 20,
      },
      {
        name: 'Продукт 2',
        img: productImage,
        price: 30,
      },
      {
        name: 'Продукт 3',
        img: productImage,
        price: 40,
      },
    ];

    for (const product of products) {
      const productNode = new CartItem(product).getElement();

      this.component.append(productNode);
    }
  }
}
