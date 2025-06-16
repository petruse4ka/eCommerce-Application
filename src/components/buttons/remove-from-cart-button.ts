import APICart from '@/api/cart';
import { PRODUCT_TEXT } from '@/constants';
import { SVG_ICONS } from '@/data';
import { cartState } from '@/store/cart-state';
import {
  BUTTON_ICON_CONTAINER,
  CUSTOM_BUTTON_STYLE,
  REMOVE_BUTTON_ICON,
  REMOVE_BUTTON_TEXT,
} from '@/styles/buttons/buttons';
import { ButtonType, CartStateKey } from '@/types/enums';
import type { addToCartButtonParameters } from '@/types/interfaces';
import ButtonBuilder from '@/utils/button-builder';
import ElementBuilder from '@/utils/element-builder';
import SVGBuilder from '@/utils/svg-builder';

export default class RemoveFromCartButton {
  private button: ButtonBuilder;
  private textElement: HTMLElement;
  private productId: string;

  constructor(parameters: addToCartButtonParameters) {
    this.productId = parameters.productId;
    this.button = new ButtonBuilder({
      type: ButtonType.BUTTON,
      className: ['button', ...CUSTOM_BUTTON_STYLE[parameters.style]],
      callback: async (): Promise<void> => {
        try {
          const cartInfo = cartState.getCartInfo();
          if (cartInfo) {
            const productInCart = cartInfo.lineItems.find(
              (item) => item.productId === this.productId
            );
            if (productInCart && productInCart.id) {
              await APICart.removeCartProduct(productInCart.id);
            }
          }
        } catch {
          this.showRemoveButton();
        }
        this.updateState();
      },
    });

    this.textElement = new ElementBuilder({
      tag: 'span',
      className: [...REMOVE_BUTTON_TEXT],
      textContent: PRODUCT_TEXT.REMOVE,
    }).getElement();
    const icon = RemoveFromCartButton.createIcon();

    this.button.getElement().append(icon, this.textElement);

    cartState.subscribe(CartStateKey.UPDATE_CART_LINE, this.updateState.bind(this));
    this.updateState();
  }

  private static createIcon(): HTMLElement {
    const iconContainer = new ElementBuilder({
      tag: 'div',
      className: BUTTON_ICON_CONTAINER,
    }).getElement();

    const currentIcon = new SVGBuilder({
      source: SVG_ICONS.REMOVE_FROM_CART,
      className: [],
      classNameIcon: REMOVE_BUTTON_ICON,
      viewBox: '0 0 24 24',
      iconSize: 24,
    }).getElement();

    iconContainer.append(currentIcon);
    return iconContainer;
  }

  public getElement(): HTMLElement {
    return this.button.getElement();
  }

  private updateState(): void {
    const lineItems = cartState.getCartInfo()?.lineItems;
    if (Array.isArray(lineItems)) {
      const isInCart = lineItems.some((item) => item.productId === this.productId);
      if (isInCart) {
        this.showRemoveButton();
      } else {
        this.hiddenRemoveButton();
      }
    } else {
      this.hiddenRemoveButton();
    }
  }

  private hiddenRemoveButton(): void {
    this.button.getElement().classList.add('hidden');
  }

  private showRemoveButton(): void {
    this.button.getElement().classList.remove('hidden');
  }
}
