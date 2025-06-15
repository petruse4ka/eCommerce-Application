import '@/styles/main.css';

import macaronImg from '@/assets/images/error-big-macaron.png';
import crumbImg from '@/assets/images/error-crumb.png';
import BaseComponent from '@/components/base';
import Button from '@/components/buttons';
import { ERROR_PAGE_TEXTS } from '@/constants';
import Router from '@/router';
import { CONTAINER, CRUMB_STYLE, MAIN_CONTAINER, TITLE_STYLE } from '@/styles/pages/errorpage';
import { Route } from '@/types/enums';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

export default class ErrorPage extends BaseComponent {
  constructor() {
    super({
      tag: 'div',
      className: CONTAINER,
    });

    this.render();
  }

  private render(): void {
    this.getTitle();

    const imageContainer = new ElementBuilder({
      tag: 'div',
      className: MAIN_CONTAINER,
    }).getElement();

    const macaronImage = new ImageBuilder({
      className: '',
      source: macaronImg,
      alt: 'big sad macaron',
    }).getElement();

    imageContainer.append(macaronImage);

    const crumbImage = new ImageBuilder({
      className: CRUMB_STYLE,
      source: crumbImg,
      alt: 'crumb',
    }).getElement();

    imageContainer.append(crumbImage);

    const returnButton = new Button({
      style: 'SECONDARY_PINK',
      textContent: ERROR_PAGE_TEXTS.HOME,
      callback: (): void => {
        Router.followRoute(Route.HOME);
      },
    }).getElement();

    this.component.append(imageContainer);
    this.component.append(returnButton);
  }

  private getTitle(): void {
    const title = new ElementBuilder({
      tag: 'h1',
      className: TITLE_STYLE,
      textContent: ERROR_PAGE_TEXTS.SORRY,
    }).getElement();

    this.component.append(title);
  }
}
