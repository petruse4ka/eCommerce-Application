import APICart from '@/api/cart';
import cartAddIcon from '@/assets/icons/cart-add.svg';
import cartAddedIcon from '@/assets/icons/cart-added.svg';
import { CATALOG_TEXTS } from '@/constants';
import { cartState } from '@/store/cart-state';
import {
  BUTTON_ICON,
  BUTTON_ICON_CONTAINER,
  BUTTON_TEXT,
  CUSTOM_BUTTON_STYLE,
} from '@/styles/buttons/buttons';
import { LOADER_STYLES } from '@/styles/overlay/loader-overlay';
import { ButtonType } from '@/types/enums';
import type { addToCartButtonParameters, AddToCartStateParameters } from '@/types/interfaces';
import ButtonBuilder from '@/utils/button-builder';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

export default class AddToCartButton {
  private button: ButtonBuilder;
  private iconContainer: HTMLElement;
  private textElement: HTMLElement;
  private currentIcon: HTMLElement;
  private productId: string;

  constructor(parameters: addToCartButtonParameters) {
    this.productId = parameters.productId;
    this.button = new ButtonBuilder({
      type: ButtonType.BUTTON,
      className: ['button', ...CUSTOM_BUTTON_STYLE[parameters.style]],
      callback: async (): Promise<void> => {
        this.setLoadingState();
        try {
          if (cartState.getCartInfo()) {
            await APICart.addProductInCart(this.productId);
          } else {
            await APICart.createCart();
            await APICart.addProductInCart(this.productId);
          }
        } catch {
          this.setDefaultState();
        }
      },
    });

    this.iconContainer = new ElementBuilder({
      tag: 'div',
      className: BUTTON_ICON_CONTAINER,
    }).getElement();

    this.textElement = new ElementBuilder({
      tag: 'span',
      className: BUTTON_TEXT,
      textContent: CATALOG_TEXTS.ADD_TO_CART,
    }).getElement();

    this.currentIcon = AddToCartButton.createIcon(cartAddIcon, 'Add to cart icon');
    this.iconContainer.append(this.currentIcon);

    this.button.getElement().append(this.iconContainer, this.textElement);

    cartState.subscribe('updateCartLine', this.updateState.bind(this));
    this.updateState();
  }

  private static createIcon(source: string = cartAddIcon, alt: string): HTMLElement {
    return new ImageBuilder({
      source: source,
      alt: alt,
      className: BUTTON_ICON,
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

  public disableButton(): void {
    this.button.disableButton();
  }

  public enableButton(): void {
    this.button.enableButton();
  }

  private updateState(): void {
    const lineItems = cartState.getLineItems();
    const isInCart = lineItems.some((item) => item.productId === this.productId);
    if (isInCart) {
      this.setSuccessState();
    } else {
      this.setDefaultState();
    }
  }

  private setState(parameters: AddToCartStateParameters): void {
    this.textElement.textContent = parameters.text;
    if (parameters.loading || parameters.inCart) {
      this.button.disableButton();
    } else {
      this.button.enableButton();
    }

    while (this.iconContainer.firstChild) {
      this.iconContainer.firstChild.remove();
    }

    this.currentIcon = parameters.loading
      ? AddToCartButton.createLoader()
      : AddToCartButton.createIcon(parameters.icon, parameters.alt);
    this.iconContainer.append(this.currentIcon);
  }

  private setLoadingState(): void {
    this.setState({
      loading: true,
      inCart: false,
      text: CATALOG_TEXTS.ADDING_TO_CART,
      icon: cartAddIcon,
      alt: 'Add to cart icon',
    });
  }

  private setSuccessState(): void {
    this.setState({
      loading: false,
      inCart: true,
      text: CATALOG_TEXTS.ADDED_TO_CART,
      icon: cartAddedIcon,
      alt: 'Cart added icon',
    });
  }

  private setDefaultState(): void {
    this.setState({
      loading: false,
      inCart: false,
      text: CATALOG_TEXTS.ADD_TO_CART,
      icon: cartAddIcon,
      alt: 'Add to cart icon',
    });
  }
}
