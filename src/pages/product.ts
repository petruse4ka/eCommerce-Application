import { ProductService } from '@/api/product';
import notFoundImage from '@/assets/images/not-found.svg';
import BaseComponent from '@/components/base';
import EmptyComponent from '@/components/base/empty';
import Button from '@/components/buttons';
import ProductWrappingBlock from '@/components/product/block';
import ProductDelivery from '@/components/product/delivery';
import DetailedProduct from '@/components/product/detailed';
import ProductSlider from '@/components/product/slider';
import ProductTitle from '@/components/product/title';
import { LOADING_CONFIG, PRODUCT_TEXT } from '@/constants';
import Router from '@/router';
import { userState } from '@/store/user-state';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import { Route } from '@/types/enums';
import type { Attribute, ProductVariantView } from '@/types/interfaces';
import type { Attributes } from '@/types/types';
import ElementBuilder from '@/utils/element-builder';

export default class ProductPage extends BaseComponent {
  constructor() {
    super({
      tag: 'main',
      className: PRODUCT_STYLES.MAIN_CONTAINER,
    });

    void ProductPage.init(this.component);
  }

  private static async init(mainComponent: HTMLElement): Promise<void> {
    const hash = globalThis.location.hash;

    if (hash.includes(`${Route.PRODUCT}/`)) {
      const productData = await ProductPage.loadProduct(hash.replace(`${Route.PRODUCT}/`, ''));
      console.log(productData);
      if (productData) {
        ProductPage.render(productData, mainComponent);
      } else {
        ProductPage.showError(mainComponent);
      }
    }
  }

  private static async loadProduct(key: string): Promise<void | ProductVariantView> {
    let attempts = 0;

    while (attempts < LOADING_CONFIG.MAX_ATTEMPTS) {
      const token = userState.getTokenState();

      if (token) {
        const loadedProduct = await ProductService.getProduct(key);

        if (loadedProduct) {
          return loadedProduct;
        }
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, LOADING_CONFIG.DELAY));
      attempts += 1;
    }
    return;
  }

  private static parseAttribute(attributes: Attribute[]): Attributes {
    const transformedObject = Object.fromEntries(
      attributes.map((attribute) => [
        attribute.name,
        attribute.value && typeof attribute.value === 'object'
          ? ProductPage.parseList(JSON.stringify(attribute.value))
          : String(attribute.value ?? ''),
      ])
    );

    return transformedObject;
  }

  private static parseList(jsonString: string): string {
    if (!jsonString.trim()) return '';

    const matchesLabel = jsonString.match(/"label":"(.*?)"/g);
    if (matchesLabel) {
      return matchesLabel
        .map((match) => match.replace(/"label":"/, '').replace(/"/, ''))
        .join(', ')
        .toLowerCase();
    }
    const matchesRu = jsonString.match(/"ru":"(.*?)"/g);
    if (matchesRu) {
      return matchesRu[0].replace(/"ru":"/, '').replace(/"/, '');
    }
    return '';
  }

  private static showError(mainComponent: HTMLElement): void {
    const emptyState = new EmptyComponent(
      PRODUCT_TEXT.ERROR_ADDRESS,
      notFoundImage,
      PRODUCT_STYLES.EMPTY_PRODUCT_CONTAINER,
      PRODUCT_STYLES.EMPTY_PRODUCT_IMAGE,
      PRODUCT_STYLES.EMPTY_PRODUCT_TEXT
    ).getElement();

    const returnButton = new Button({
      style: 'PRIMARY_PINK',
      textContent: PRODUCT_TEXT.CATALOG,
      callback: (): void => {
        Router.followRoute(Route.CATALOG);
      },
    }).getElement();

    emptyState.append(returnButton);
    mainComponent.append(emptyState);
  }

  private static render(productData: ProductVariantView, mainComponent: HTMLElement): void {
    const mainContainer = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.CONTAINER,
    }).getElement();

    const rightAside = new ElementBuilder({
      tag: 'aside',
      className: PRODUCT_STYLES.ASIDE,
    }).getElement();
    if (productData.attributes) {
      const attributes = ProductPage.parseAttribute(productData.attributes);
      const productTitle = new ProductTitle({
        title: String(attributes['name']),
        description: String(attributes['description']),
      });
      rightAside.append(productTitle.getElement());
      const block = new ProductWrappingBlock(attributes, productData.prices);
      rightAside.append(block.getElement());

      const delivery = new ProductDelivery();
      rightAside.append(delivery.getElement());

      const detailed = new DetailedProduct(String(attributes['detailing']));
      if (productData.images) {
        const slider = new ProductSlider(productData.images);
        mainContainer.append(slider.getElement());
      }
      mainContainer.append(rightAside);

      mainComponent.append(mainContainer);
      mainComponent.append(detailed.getElement());
    }
  }
}
