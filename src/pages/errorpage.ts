import '@/styles/main.css';

import crumbImg from '@/assets/images/error-crumb.png';
import macaronImg from '@/assets/images/error-macaron.png';
import { BaseComponent } from '@/components/base/component';
import { Button } from '@/components/buttons/button';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

export class ErrorPage extends BaseComponent {
  constructor() {
    super({
      tag: 'div',
      className: [
        'relative',
        'h-[calc(100vh-250px)]',
        'bg-[var(--color-gray)]',
        'text-black',
        'text-base',
        'leading-normal',
        'bg-[url("./../assets/images/error-404.png")]',
        'bg-center',
        'bg-no-repeat',
      ],
    });
    this.render();
  }

  private render(): void {
    this.getTitle();

    const macaron = new ImageBuilder({
      className: ['absolute', 'top-1/3', 'left-1/2', '-translate-x-1/2'],
      source: macaronImg,
      alt: 'big sad macaron',
    }).getElement();
    this.component.append(macaron);

    this.getCrumbImage(['translate-x-1/2', 'mt-16', 'transform', 'origin-center', 'animate-spin']);
    this.getCrumbImage(['-translate-x-full', '-ml-16']);

    const buttonContainer = new ElementBuilder({
      tag: 'div',
      className: ['flex', 'justify-center', 'items-end', 'h-{80vh}'],
    }).getElement();

    const returnButton = new Button({
      style: 'SECONDARY_BLUE',
      textContent: 'На главную',
      callback: (): void => {},
    }).getElement();

    buttonContainer.append(returnButton);

    this.component.append(buttonContainer);
  }

  private getTitle(): void {
    const title = new ElementBuilder({
      tag: 'h1',
      className: ['text-2xl', 'text-center', 'font-montserrat', 'font-bold', 'p-4'],
      textContent: 'Извините, страница не найдена',
    }).getElement();
    if (!(title instanceof HTMLHeadingElement)) {
      throw new TypeError('The element is not HTMLHeadingElement');
    }
    this.component.append(title);
  }

  private getCrumbImage(addClass: string[]): void {
    const CRUMB_STYLE = ['absolute', 'top-1/2', 'left-1/2'];
    const crumb = new ImageBuilder({
      className: [...CRUMB_STYLE, ...addClass],
      source: crumbImg,
      alt: 'crumb',
    }).getElement();
    if (!(crumb instanceof HTMLImageElement)) {
      throw new TypeError('The element is not HTMLImageElement');
    }
    this.component.append(crumb);
  }
}
