import APICart from '@/api/cart';
import cartRemoveIcon from '@/assets/icons/cart-remove-accent.svg';
import { PRODUCT_TEXT } from '@/constants';
import { cartState } from '@/store/cart-state';
import {
  BUTTON_ICON,
  BUTTON_ICON_CONTAINER,
  BUTTON_TEXT,
  CUSTOM_BUTTON_STYLE,
} from '@/styles/buttons/buttons';
import { ButtonType, CartStateKey } from '@/types/enums';
import type { addToCartButtonParameters } from '@/types/interfaces';
import ButtonBuilder from '@/utils/button-builder';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

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
      className: [...BUTTON_TEXT, 'text-accent'],
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

    const currentIcon = new ImageBuilder({
      source: cartRemoveIcon,
      className: BUTTON_ICON,
      alt: '',
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
