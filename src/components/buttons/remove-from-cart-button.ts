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
import { LOADER_STYLES } from '@/styles/overlay/loader-overlay';
import { ButtonType, CartStateKey } from '@/types/enums';
import type { addToCartButtonParameters } from '@/types/interfaces';
import ButtonBuilder from '@/utils/button-builder';
import ElementBuilder from '@/utils/element-builder';
import SVGBuilder from '@/utils/svg-builder';

export default class RemoveFromCartButton {
  private button: ButtonBuilder;
  private iconContainer: HTMLElement;
  private textElement: HTMLElement;
  private currentIcon: HTMLElement;
  private productId: string;
  private isLoading: boolean;

  constructor(parameters: addToCartButtonParameters) {
    this.productId = parameters.productId;
    this.isLoading = false;
    this.button = new ButtonBuilder({
      type: ButtonType.BUTTON,
      className: ['button', ...CUSTOM_BUTTON_STYLE[parameters.style]],
      callback: async (): Promise<void> => {
        try {
          this.setLoadingState();
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
          this.setDefaultState();
        }
        this.isLoading = false;
        this.updateState();
      },
    });

    this.iconContainer = new ElementBuilder({
      tag: 'div',
      className: BUTTON_ICON_CONTAINER,
    }).getElement();

    this.textElement = new ElementBuilder({
      tag: 'span',
      className: [...REMOVE_BUTTON_TEXT],
      textContent: PRODUCT_TEXT.REMOVE,
    }).getElement();

    this.currentIcon = RemoveFromCartButton.createIcon();
    this.iconContainer.append(this.currentIcon);

    this.button.getElement().append(this.iconContainer, this.textElement);

    cartState.subscribe(CartStateKey.UPDATE_CART_LINE, this.updateState.bind(this));
    this.updateState();
  }

  private static createIcon(): HTMLElement {
    return new SVGBuilder({
      source: SVG_ICONS.REMOVE_FROM_CART,
      className: [],
      classNameIcon: REMOVE_BUTTON_ICON,
      viewBox: '0 0 24 24',
      iconSize: 24,
    }).getElement();
  }

  private static createLoader(): HTMLElement {
    return new ElementBuilder({
      tag: 'div',
      className: LOADER_STYLES.LOADING_SPINNER_CART,
    }).getElement();
  }

  public getElement(): HTMLElement {
    return this.button.getElement();
  }

  private updateState(): void {
    if (this.isLoading) return;

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

  private setLoadingState(): void {
    this.isLoading = true;
    this.button.disableButton();
    this.textElement.textContent = PRODUCT_TEXT.REMOVING;

    while (this.iconContainer.firstChild) {
      this.iconContainer.firstChild.remove();
    }

    this.currentIcon = RemoveFromCartButton.createLoader();
    this.iconContainer.append(this.currentIcon);
  }

  private setDefaultState(): void {
    this.isLoading = false;
    this.button.enableButton();
    this.textElement.textContent = PRODUCT_TEXT.REMOVE;

    while (this.iconContainer.firstChild) {
      this.iconContainer.firstChild.remove();
    }

    this.currentIcon = RemoveFromCartButton.createIcon();
    this.iconContainer.append(this.currentIcon);
  }

  private hiddenRemoveButton(): void {
    this.button.getElement().classList.add('hidden');
  }

  private showRemoveButton(): void {
    this.button.getElement().classList.remove('hidden');
    this.setDefaultState();
  }
}
