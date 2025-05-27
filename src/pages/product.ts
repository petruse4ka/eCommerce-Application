import BaseComponent from '@/components/base';
import ProductAttributes from '@/components/product/attributes';
import ProductDelivery from '@/components/product/delivery';
import Detailed from '@/components/product/detailed';
import ProductPrices from '@/components/product/prices';
import ProductSlider from '@/components/product/slider';
import ProductTitle from '@/components/product/title';
import productData from '@/data/production';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import type { Attributes } from '@/types/types';
import ElementBuilder from '@/utils/element-builder';

export default class ProductPage extends BaseComponent {
  constructor() {
    super({
      tag: 'main',
      className: PRODUCT_STYLES.MAIN_CONTAINER,
    });
    this.render();
  }

  private static parseAttribute(): Attributes {
    const attributes = productData.masterVariant.attributes;
    const transformedObject: Attributes = Object.fromEntries(
      attributes.map((attribute) => [
        attribute.name,
        typeof attribute.value === 'object' ? JSON.stringify(attribute.value) : attribute.value,
      ])
    );
    return transformedObject;
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

    const productAttributs = new ProductAttributes();
    rightAside.append(productAttributs.getElement());

    const delivery = new ProductDelivery();
    rightAside.append(delivery.getElement());

    const slider = new ProductSlider();

    const detailed = new Detailed(String(transformedObject['description']));
    mainContainer.append(slider.getElement(), rightAside);
    this.component.append(mainContainer, detailed.getElement());
  }
}
