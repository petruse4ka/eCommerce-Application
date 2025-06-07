import cartAddIcon from '@/assets/icons/cart-add.svg';
import cartAddedIcon from '@/assets/icons/cart-added.svg';
import { CATALOG_TEXTS } from '@/constants';
import {
  BUTTON_ICON,
  BUTTON_ICON_CONTAINER,
  BUTTON_TEXT,
  CUSTOM_BUTTON_STYLE,
} from '@/styles/buttons/buttons';
import { LOADER_STYLES } from '@/styles/overlay/loader-overlay';
import { ButtonType } from '@/types/enums';
import type { customButtonParameters } from '@/types/interfaces';
import ButtonBuilder from '@/utils/button-builder';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

export default class AddToCartButton {
  private button: ButtonBuilder;
  private iconContainer: HTMLElement;
  private textElement: HTMLElement;
  private currentIcon: HTMLElement;

  constructor(parameters: customButtonParameters) {
    this.button = new ButtonBuilder({
      type: ButtonType.BUTTON,
      className: ['button', ...CUSTOM_BUTTON_STYLE[parameters.style]],
      callback: async (): Promise<void> => {
        this.setLoadingState();
        try {
          await parameters.callback();
          this.setSuccessState();
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
      textContent: parameters.textContent,
    }).getElement();

    this.currentIcon = AddToCartButton.createIcon(parameters.icon.source, parameters.icon.alt);
    this.iconContainer.append(this.currentIcon);

    this.button.getElement().append(this.iconContainer, this.textElement);
  }

  private static createIcon(source: string, alt: string): HTMLElement {
    return new ImageBuilder({
      source: source,
      alt: alt,
      className: BUTTON_ICON,
    }).getElement();
  }

  private static createLoader(): HTMLElement {
    const spinner = new ElementBuilder({
      tag: 'div',
      className: LOADER_STYLES.LOADING_SPINNER_CART,
    }).getElement();
    return spinner;
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

  private setLoadingState(): void {
    this.button.disableButton();
    this.textElement.textContent = CATALOG_TEXTS.ADDING_TO_CART;

    while (this.iconContainer.firstChild) {
      this.iconContainer.firstChild.remove();
    }

    this.iconContainer.append(AddToCartButton.createLoader());
  }

  private setSuccessState(): void {
    this.button.disableButton();
    this.textElement.textContent = CATALOG_TEXTS.ADDED_TO_CART;

    while (this.iconContainer.firstChild) {
      this.iconContainer.firstChild.remove();
    }

    this.currentIcon = AddToCartButton.createIcon(cartAddedIcon, 'Cart added icon');
    this.iconContainer.append(this.currentIcon);
  }

  private setDefaultState(): void {
    this.button.enableButton();

    this.textElement.textContent = CATALOG_TEXTS.ADD_TO_CART;
    while (this.iconContainer.firstChild) {
      this.iconContainer.firstChild.remove();
    }

    this.currentIcon = AddToCartButton.createIcon(cartAddIcon, 'Add to cart icon');
    this.iconContainer.append(this.currentIcon);
  }
}
