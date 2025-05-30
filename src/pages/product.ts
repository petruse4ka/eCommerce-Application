import CatalogAPI from '@/api/catalog';
import BaseComponent from '@/components/base';
import ProductAttributes from '@/components/product/attributes';
import ProductDelivery from '@/components/product/delivery';
import DetailedProduct from '@/components/product/detailed';
import ProductPrices from '@/components/product/prices';
import ProductSlider from '@/components/product/slider';
import ProductTitle from '@/components/product/title';
import { LOADING_CONFIG } from '@/constants';
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
        const loadedProduct = await CatalogAPI.getProduct(key);

        if (loadedProduct) {
          /*    
          const prices = ProductPage.parsePrices(loadedProduct.prices);
          const images = ProductPage.parseImages(loadedProduct.images);*/
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
    const errorContainer = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.CONTAINER,
      textContent: 'Такой вкуснятины у нас пока нет',
    }).getElement();

    mainComponent.append(errorContainer);
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

      const productAttributs = new ProductAttributes(attributes);
      rightAside.append(productAttributs.getElement());

      const prices = new ProductPrices(productData.prices);
      rightAside.append(prices.getElement());

      const delivery = new ProductDelivery();
      rightAside.append(delivery.getElement());

      const detailed = new DetailedProduct(String(attributes['detailing']));
      const slider = new ProductSlider();
      mainContainer.append(slider.getElement(), rightAside);
      mainContainer.append(rightAside);
      mainComponent.append(mainContainer);
      mainComponent.append(detailed.getElement());
    }
  }
}
