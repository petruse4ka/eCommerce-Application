import CatalogAPI from '@/api/catalog';
import BaseComponent from '@/components/base';
import ProductAttributes from '@/components/product/attributes';
import ProductDelivery from '@/components/product/delivery';
import Detailed from '@/components/product/detailed';
import ProductPrices from '@/components/product/prices';
import ProductSlider from '@/components/product/slider';
import ProductTitle from '@/components/product/title';
import { LOADING_CONFIG } from '@/constants';
//import productData from '@/data/production';
import { userState } from '@/store/user-state';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import { Route } from '@/types/enums';
import type { Attribute } from '@/types/interfaces';
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

  private static parseAttribute(attributes: Attribute[]): Attributes {
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

    const matchesLabel = jsonString.match(/"label":"(.*?)"/g);
    if (matchesLabel) {
      return matchesLabel
        .map((match) => match.replace(/"label":"/, '').replace(/"/, ''))
        .join(', ');
    }
    const matchesRu = jsonString.match(/"ru":"(.*?)"/g);
    if (matchesRu) {
      return matchesRu[0].replace(/"ru":"/, '').replace(/"/, '');
    }
    return '';
  }

  private static async loadProduct(key: string): Promise<void | Attributes> {
    let attempts = 0;

    while (attempts < LOADING_CONFIG.MAX_ATTEMPTS) {
      const token = userState.getTokenState();

      if (token) {
        const loadedProduct = await CatalogAPI.getProduct(key);
        if (loadedProduct) {
          const transformedAtribute = ProductPage.parseAttribute(loadedProduct);
          return transformedAtribute;
        }

        break;
      }

      await new Promise((resolve) => setTimeout(resolve, LOADING_CONFIG.DELAY));
      attempts += 1;
    }
  }

  private static async init(mainComponent: HTMLElement): Promise<void> {
    const hash = globalThis.location.hash;

    if (hash.includes(`${Route.PRODUCT}/`)) {
      const productData = await ProductPage.loadProduct(hash.replace(`${Route.PRODUCT}/`, ''));
      if (productData) {
        ProductPage.render(productData, mainComponent);
      }
    }
  }

  private static render(productData: Attributes, mainComponent: HTMLElement): void {
    const mainContainer = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.CONTAINER,
    }).getElement();

    const rightAside = new ElementBuilder({
      tag: 'aside',
      className: PRODUCT_STYLES.ASIDE,
    }).getElement();

    const product = new ProductTitle({
      title: String(productData['name']),
      weight: String(productData['weight']),
      description: String(productData['description']),
    });
    rightAside.append(product.getElement());

    const productAttributs = new ProductAttributes(productData);
    rightAside.append(productAttributs.getElement());

    const prices = new ProductPrices();
    rightAside.append(prices.getElement());

    const delivery = new ProductDelivery();
    rightAside.append(delivery.getElement());

    const detailed = new Detailed(String(productData['detailing']));
    const slider = new ProductSlider();
    mainContainer.append(slider.getElement(), rightAside);

    mainComponent.append(mainContainer);
    mainComponent.append(detailed.getElement());
  }
}
