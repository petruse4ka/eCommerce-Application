import CatalogAPI from '@/api/catalog';
import BaseComponent from '@/components/base';
import ProductAttributes from '@/components/product/attributes';
import ProductDelivery from '@/components/product/delivery';
import Detailed from '@/components/product/detailed';
import ProductPrices from '@/components/product/prices';
import ProductSlider from '@/components/product/slider';
import ProductTitle from '@/components/product/title';
import { LOADING_CONFIG } from '@/constants';
import productData from '@/data/production';
import { userState } from '@/store/user-state';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import { Route } from '@/types/enums';
import type { ProductVariantView } from '@/types/interfaces';
import type { Attributes } from '@/types/types';
import ElementBuilder from '@/utils/element-builder';

export default class ProductPage extends BaseComponent {
  constructor() {
    super({
      tag: 'main',
      className: PRODUCT_STYLES.MAIN_CONTAINER,
    });

    const hash = globalThis.location.hash;

    if (hash.includes(`${Route.PRODUCT}/`)) {
      void ProductPage.loadProduct(hash.replace(`${Route.PRODUCT}/`, ''));
    }

    this.render();
  }

  private static parseAttribute(): Attributes {
    const attributes = productData.masterVariant.attributes;
    const transformedObject: Attributes = Object.fromEntries(
      attributes.map((attribute) => [
        attribute.name,
        typeof attribute.value === 'object'
          ? ProductPage.parseList(JSON.stringify(attribute.value))
          : attribute.value,
      ])
    );
    return transformedObject;
  }

  private static parseList(jsonString: string): string {
    if (!jsonString.trim()) return '';

    const matches = jsonString.match(/"label":"(.*?)"/g);
    if (!matches) return '';

    return matches.map((match) => match.replace(/"label":"/, '').replace(/"/, '')).join(', ');
  }

  private static async loadProduct(key: string): Promise<void | ProductVariantView> {
    let attempts = 0;

    while (attempts < LOADING_CONFIG.MAX_ATTEMPTS) {
      const token = userState.getTokenState();

      if (token) {
        const loadedProduct = await CatalogAPI.getProduct(key);
        if (loadedProduct) {
          console.log(loadedProduct);
          return loadedProduct;
        }

        break;
      }

      await new Promise((resolve) => setTimeout(resolve, LOADING_CONFIG.DELAY));
      attempts += 1;
    }
  }

  private render(): void {
    const mainContainer = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.CONTAINER,
    }).getElement();

    const rightAside = new ElementBuilder({
      tag: 'aside',
      className: PRODUCT_STYLES.ASIDE,
    }).getElement();

    const transformedObject = ProductPage.parseAttribute();

    const product = new ProductTitle({
      title: String(transformedObject['name']),
      weight: String(transformedObject['weight']),
      description: String(transformedObject['description']),
    });
    rightAside.append(product.getElement());

    const prices = new ProductPrices();
    rightAside.append(prices.getElement());

    const productAttributs = new ProductAttributes({
      flavors: String(transformedObject['flavors']),
      diet: String(transformedObject['diet']),
    });
    rightAside.append(productAttributs.getElement());

    const delivery = new ProductDelivery();
    rightAside.append(delivery.getElement());

    const slider = new ProductSlider();

    const detailed = new Detailed(String(transformedObject['description']));
    mainContainer.append(slider.getElement(), rightAside);
    this.component.append(mainContainer, detailed.getElement());
  }
}
