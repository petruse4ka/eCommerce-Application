import { ABOUT_STYLE } from '@/styles/pages/about';
import type { Personal } from '@/types/interfaces';
import ImageBuilder from '@/utils/image-builder';

import BaseComponent from '../base';
import Team from '../footer/team';

export default class Person extends BaseComponent {
  constructor(parameters: Personal, reverse: boolean) {
    super({
      tag: 'div',
      className: reverse ? ABOUT_STYLE.PERSONAL_CONTAINER : ABOUT_STYLE.ODD_CONTAINER,
    });

    this.component.append(Person.PersonalPhoto(parameters));
    this.component.append(Person.PersonalDescription(parameters));
  }

  private static PersonalPhoto(personal: Personal): HTMLElement {
    const images = personal.PersonalImageBox;
    const texts = personal.PersonalText;

    const photoContainer = new BaseComponent({
      tag: 'div',
      className: ABOUT_STYLE.IMAGE_CONTAINER,
    }).getElement();

    const imagePhoto = new ImageBuilder({
      source: images.photo.url,
      alt: texts.name,
      className: images.photo.style,
    }).getElement();

    photoContainer.append(imagePhoto);

    if (images.hat) {
      const imageHat = new ImageBuilder({
        source: images.hat.url,
        alt: texts.name,
        className: images.hat.style,
      }).getElement();
      photoContainer.append(imageHat);
    }
    return photoContainer;
  }

  private static PersonalDescription(personal: Personal): HTMLElement {
    const textContainer = new BaseComponent({
      tag: 'div',
      className: ABOUT_STYLE.TEXT_CONTAINER,
    }).getElement();

    const texts = personal.PersonalText;

    const name = new BaseComponent({
      tag: 'h3',
      className: ABOUT_STYLE.NAME,
      textContent: texts.name,
    }).getElement();

    const role = new BaseComponent({
      tag: 'div',
      className: ABOUT_STYLE.ROLE,
      textContent: texts.role,
    }).getElement();

    const description = new BaseComponent({
      tag: 'div',
      className: ABOUT_STYLE.DESCRIPTION,
    }).getElement();

    if (Array.isArray(texts.description)) {
      for (const paragraph of texts.description) {
        const currentStyle = /Спасибо/.test(paragraph)
          ? ABOUT_STYLE.DESCRIPTION_THANKS
          : ABOUT_STYLE.DESCRIPTION_PARAGRAPH;

        const p = new BaseComponent({
          tag: 'p',
          className: currentStyle,
          textContent: paragraph,
        }).getElement();
        description.append(p);
      }
    }

    const gitHubLink = Team.createGithubLink(texts.github);

    textContainer.append(name, role, description, gitHubLink);
    return textContainer;
  }
}
