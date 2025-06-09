import { ABOUT_STYLE } from '@/styles/pages/about';
import type { Personal, PersonalImageBox, PersonalText } from '@/types/interfaces';
import ImageBuilder from '@/utils/image-builder';

import BaseComponent from '../base';

class PersonalPhoto extends BaseComponent {
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

class PersonalDescription extends BaseComponent {
  private texts: PersonalText;
  constructor(parameters: Personal) {
    super({
      tag: 'div',
      className: ABOUT_STYLE.TEXT_CONTAINER,
    });
    this.texts = parameters.PersonalText;
    this.render();
  }

  protected render(): void {
    const name = new BaseComponent({
      tag: 'h3',
      className: ABOUT_STYLE.NAME,
      textContent: this.texts.name,
    }).getElement();

    const role = new BaseComponent({
      tag: 'div',
      className: ABOUT_STYLE.ROLE,
      textContent: this.texts.role,
    }).getElement();

    const description = new BaseComponent({
      tag: 'div',
      className: ABOUT_STYLE.DESCRIPTION,
    }).getElement();

    if (this.texts.description) {
      description.insertAdjacentHTML('afterbegin', this.texts.description);
    }

    this.component.append(name, role, description);
  }
}

export default class Person extends BaseComponent {
  constructor(parameters: Personal, reverse: boolean) {
    super({
      tag: 'div',
      className: reverse ? ABOUT_STYLE.PERSONAL_CONTAINER : ABOUT_STYLE.ODD_CONTAINER,
    });

    this.component.append(new PersonalPhoto(parameters).getElement());
    this.component.append(new PersonalDescription(parameters).getElement());
  }
}
