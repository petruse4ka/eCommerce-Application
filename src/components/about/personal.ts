//import { ABOUT } from '@/data';
import { ABOUT_STYLE } from '@/styles/about';
import type { Personal, PersonalImageBox, PersonalText } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

import BaseComponent from '../base';

export default class PersonalCard extends BaseComponent {
  private images: PersonalImageBox;
  private texts: PersonalText;
  constructor(personal: Personal) {
    super({
      tag: 'div',
      className: '',
    });
    this.images = personal.PersonalImageBox;
    this.texts = personal.PersonalText;
    this.render();
  }

  protected render(): void {
    const copyrightContainer = new ElementBuilder({
      tag: 'div',
      className: ABOUT_STYLE.CONTAINER,
    }).getElement();

    const imagePhoto = new ImageBuilder({
      source: this.images.photo,
      alt: this.texts.name,
      className: ABOUT_STYLE.OLGA_PHOTO,
    }).getElement();

    /*const imageFrame = new ImageBuilder({
      source: this.images.frame,
      alt: this.texts.name,
      className: ABOUT_STYLE.OLGA_FRAME,
    }).getElement();*/

    copyrightContainer.append(imagePhoto);

    if (this.images.hat) {
      const imageHat = new ImageBuilder({
        source: this.images.hat,
        alt: this.texts.name,
        className: ABOUT_STYLE.OLGA_HAT,
      }).getElement();
      copyrightContainer.append(imageHat);
    }

    this.component.append(copyrightContainer);
  }
}
