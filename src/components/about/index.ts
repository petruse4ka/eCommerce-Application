import { ABOUT_STYLE } from '@/styles/pages/about';
import type { Personal } from '@/types/interfaces';
import ImageBuilder from '@/utils/image-builder';

import BaseComponent from '../base';
import Team from '../footer/team';

export default class Person extends BaseComponent {
  constructor(parameters: Personal, reverse: boolean) {
    super({
      tag: 'div',
      className: ABOUT_STYLE.PERSONAL_CONTAINER,
    });

    const addContainer = new BaseComponent({
      tag: 'div',
      className: reverse ? ABOUT_STYLE.ADD_CONTAINER : ABOUT_STYLE.ODD_CONTAINER,
    }).getElement();

    addContainer.append(Person.PersonalPhoto(parameters));
    addContainer.append(Person.PersonalDescription(parameters));
    this.component.append(addContainer);
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
      className: '',
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

    const description = texts.description ? this.createDescription(texts.description) : '';

    const gitHubLink = Team.createGithubLink(texts.github);
    gitHubLink.classList.add(...ABOUT_STYLE.GIT);

    textContainer.append(name, role, description, gitHubLink);
    return textContainer;
  }

  private static createDescription(text: string[]): HTMLElement {
    const description = new BaseComponent({
      tag: 'div',
      className: ABOUT_STYLE.DESCRIPTION,
    }).getElement();

    description.addEventListener('mouseleave', function () {
      this.scrollTo(0, 0);
    });

    for (const paragraph of text) {
      const currentStyle = /Спасибо/.test(paragraph)
        ? ABOUT_STYLE.DESCRIPTION_THANKS
        : ABOUT_STYLE.DESCRIPTION_PARAGRAPH;

      const fullText = new BaseComponent({
        tag: 'p',
        className: currentStyle,
        textContent: paragraph,
      }).getElement();
      description.append(fullText);
    }
    return description;
  }
}
