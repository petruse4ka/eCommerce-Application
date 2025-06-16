import APICart from '@/api/cart';
import { CART_TEXT, PRODUCT_TEXT } from '@/constants';
import { SVG_ICONS } from '@/data';
import { ADDRESS } from '@/styles/address';
import { CART_ITEM } from '@/styles/cart/cart-item';
import { CART_TOTAL } from '@/styles/cart/cart-total';
import { Route } from '@/types/enums';
import type { CartItemView } from '@/types/interfaces';
import type { UpdateViewTotalCart } from '@/types/types';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

import BaseComponent from '../base';
import ButtonWithIcon from '../buttons/button-with-icon';
import LoaderOverlay from '../overlay/loader-overlay';
import ProductQuantity from '../product/quantity';

export default class CartItem extends BaseComponent {
  private productInfo: CartItemView;
  private callback: UpdateViewTotalCart;

  constructor(product: CartItemView, callback: UpdateViewTotalCart) {
    super({
      tag: 'article',
      className: CART_ITEM.CONTAINER,
    });

    this.callback = callback;

    this.productInfo = product;

    this.render();
  }

  private createPriceOld(): ElementBuilder {
    return new ElementBuilder({
      tag: 'span',
      className: CART_ITEM.PRICE.OLD,
      textContent: `${this.productInfo.prices.toFixed(2)} ${PRODUCT_TEXT.CURRENCY}`,
    });
  }

  private createPriceAndQuantity(): void {
    const priceContainer = new ElementBuilder({
      tag: 'p',
      className: CART_ITEM.PRICE.DEFAULT,
    }).getElement();

    const priceValue = new ElementBuilder({
      tag: 'span',
      className: CART_ITEM.PRICE.ACCENT,
    }).getElement();

    priceContainer.append(priceValue);

    let priceOld = null;
    if (this.productInfo.discountedPrice) {
      priceOld = this.createPriceOld();
      priceContainer.append(priceOld.getElement());
    }

    const quantityInputBlock = new ProductQuantity({
      price: this.productInfo.discountedPrice ?? this.productInfo.prices,
      element: priceValue,
      text: '',
      count: this.productInfo.quantity,
      callback: async (count: number): Promise<boolean> => {
        this.callback({ isLoading: true, success: false });
        const fetchResult = await APICart.changeProductQuantity({
          id: this.productInfo.id,
          quantity: count,
        });
        if (this.productInfo.discountedPrice && priceOld) {
          priceOld.applyTextContent(
            `${(this.productInfo.prices * count).toFixed(2)} ${PRODUCT_TEXT.CURRENCY}`
          );
        }
        this.callback({ isLoading: false, success: false });

        return fetchResult;
      },
    });

    this.component.append(quantityInputBlock.getElement(), priceContainer);
  }

  private render(): void {
    const productImg = new ImageBuilder({
      source: this.productInfo.img.url,
      alt: this.productInfo.img.alt ?? 'Product image',
      className: CART_ITEM.IMAGE,
      callback: (): void => {
        globalThis.location.hash = `${Route.PRODUCT}/${this.productInfo.key}`;
      },
    }).getElement();

    const productName = new ElementBuilder({
      tag: 'p',
      className: CART_ITEM.INFO.NAME,
      textContent: this.productInfo.name,
      callback: (): void => {
        globalThis.location.hash = `${Route.PRODUCT}/${this.productInfo.key}`;
      },
    }).getElement();

    this.component.append(productImg, productName);

    this.createPriceAndQuantity();

    const deleteButton = new ButtonWithIcon({
      style: 'DELETE_CART_ITEM',
      icon: {
        source: SVG_ICONS.DELETE_ICON,
        classNameIcon: ADDRESS.CARD.ICON,
      },
      callback: async (): Promise<void> => {
        this.callback({ isLoading: true, success: false });
        const loader = new LoaderOverlay({
          text: CART_TEXT.LOADING_DELETE_PRODUCT,
          className: CART_TOTAL.LOADER,
        }).getElement();
        this.component.append(loader);
        deleteButton.disableButton();
        await APICart.removeCartProduct(this.productInfo.id);
        deleteButton.enableButton();
        this.callback({ isLoading: false, success: false });
      },
    });

    this.component.append(deleteButton.getElement());
  }
}
