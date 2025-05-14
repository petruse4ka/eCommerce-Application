import '@/styles/main.css';

import macaronImg from '@/assets/images/error-big-macaron.png';
import crumbImg from '@/assets/images/error-crumb.png';
import { BaseComponent } from '@/components/base/component';
import { Button } from '@/components/buttons/button';
import { Route } from '@/types/enums';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

export class ErrorPage extends BaseComponent {
  constructor() {
    super({
      tag: 'div',
      className: [
        'flex',
        'flex-col',
        'items-center',
        'min-h-[550px]',
        'bg-[var(--color-gray)]',
        'text-black',
        'text-base',
        'leading-normal',
      ],
    });

    this.render();
  }

  private render(): void {
    this.getTitle();

    const containerStyle = [
      'bg-[url("./../assets/images/error-404.png")]',
      'bg-center',
      'bg-no-repeat',
      'min-h-[400px]',
      'w-full',
      'bg-contain',
      'md:bg-auto',
    ];

    const imageContainer = new ElementBuilder({
      tag: 'div',
      className: ['relative', 'flex', 'justify-center', 'items-end', ...containerStyle],
    }).getElement();

    const macaron = new ImageBuilder({
      className: '',
      source: macaronImg,
      alt: 'big sad macaron',
    }).getElement();

    imageContainer.append(macaron);

    const crumbStyle = ['translate-x-full', '-translate-y-1/2', 'transform', 'origin-center'];
    const crumb = new ImageBuilder({
      className: ['absolute', 'animate-spin', ...crumbStyle],
      source: crumbImg,
      alt: 'crumb',
    }).getElement();
    imageContainer.append(crumb);

    const returnButton = new Button({
      style: 'SECONDARY_BLUE',
      textContent: 'На главную',
      callback: (): void => {
        console.log(Route.HOME);
        globalThis.location.hash = Route.HOME;
      },
    }).getElement();

    this.component.append(imageContainer);
    this.component.append(returnButton);
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
}
