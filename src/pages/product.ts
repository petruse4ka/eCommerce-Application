import BaseComponent from '@/components/base';
import ProductTitle from '@/components/product/title';
import productData from '@/data/production';
import { CONTAINER, MAIN_CONTAINER } from '@/styles/pages/underconstruction';
import ElementBuilder from '@/utils/element-builder';

export default class ProductPage extends BaseComponent {
  constructor() {
    super({
      tag: 'main',
      className: CONTAINER,
    });
    this.render();
  }

  private render(): void {
    const mainContainer = new ElementBuilder({
      tag: 'div',
      className: MAIN_CONTAINER,
    }).getElement();

    const attributes = productData.masterVariant.attributes;
    const transformedObject: { [key: string]: string | number | boolean | string[] } =
      Object.fromEntries(
        attributes.map((attribute) => [
          attribute.name,
          typeof attribute.value === 'object' ? JSON.stringify(attribute.value) : attribute.value,
        ])
      );
    console.log(transformedObject);
    const product = new ProductTitle({
      title: String(transformedObject['name']),
      weight: String(transformedObject['weight']),
      description: 'Какое-то описание',
    });

    mainContainer.append(product.getElement());
    this.component.append(mainContainer);
  }
}
