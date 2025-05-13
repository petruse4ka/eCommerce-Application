import '@/styles/main.css';

import crumbImg from '@/assets/images/error-crumb.png';
import macaronImg from '@/assets/images/error-macaron.png';
import { BaseComponent } from '@/components/base/component';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

const CRUMB_STYLE = ['absolute', 'top-1/2', 'left-1/2'];

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
    const title = new ElementBuilder({
      tag: 'h1',
      className: ['text-2xl', 'text-center', 'font-montserrat', 'font-bold', 'p-4'],
      textContent: 'Извините, страница не найдена',
    }).getElement();
    this.component.append(title);
    const macaron = new ImageBuilder({
      className: ['absolute', 'top-1/3', 'left-1/2', '-translate-x-1/2'],
      source: macaronImg,
      alt: 'animated macaron',
    }).getElement();
    this.component.append(macaron);
    const crumbRight = new ImageBuilder({
      className: [
        ...CRUMB_STYLE,
        'translate-x-1/2',
        'mt-16',
        'transform',
        'origin-center',
        'animate-spin',
      ],
      source: crumbImg,
      alt: 'animated macaron',
    }).getElement();
    this.component.append(crumbRight);
    const crumbLeft = new ImageBuilder({
      className: [...CRUMB_STYLE, '-translate-x-full', '-ml-16'],
      source: crumbImg,
      alt: 'crumb',
    }).getElement();
    this.component.append(crumbLeft);
  }
}
