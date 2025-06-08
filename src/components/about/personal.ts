//import { ABOUT } from '@/data';
import { ABOUT_STYLE } from '@/styles/about';
import type { Personal, PersonalImageBox, PersonalText } from '@/types/interfaces';
import ImageBuilder from '@/utils/image-builder';

import BaseComponent from '../base';

export default class PersonalCard extends BaseComponent {
  private images: PersonalImageBox;
  private texts: PersonalText;
  constructor(personal: Personal) {
    super({
      tag: 'div',
      className: ABOUT_STYLE.IMAGE_CONTAINER,
    });
    this.images = personal.PersonalImageBox;
    this.texts = personal.PersonalText;
    this.render();
  }

  protected render(): void {
    const imagePhoto = new ImageBuilder({
      source: this.images.photo.url,
      alt: this.texts.name,
      className: this.images.photo.style,
    }).getElement();

    this.component.append(imagePhoto);

    if (this.images.hat) {
      const imageHat = new ImageBuilder({
        source: this.images.hat.url,
        alt: this.texts.name,
        className: this.images.hat.style,
      }).getElement();
      this.component.append(imageHat);
    }
  }
}
