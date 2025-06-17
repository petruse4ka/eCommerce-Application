import { ABOUT } from '@/data';
import { MODAL } from '@/styles/modal';
import { ABOUT_STYLE } from '@/styles/pages/about';
import type { Personal } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

import BaseComponent from '../base';
import Team from '../footer/team';
import Modal from '../modal';

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
      className: ABOUT_STYLE.PHOTO,
    }).getElement();

    const name = new BaseComponent({
      tag: 'h3',
      className: ABOUT_STYLE.NAME,
      textContent: texts.name,
    }).getElement();

    photoContainer.append(imagePhoto, name);

    return photoContainer;
  }

  private static PersonalDescription(personal: Personal): HTMLElement {
    const textContainer = new BaseComponent({
      tag: 'div',
      className: ABOUT_STYLE.TEXT_CONTAINER,
    }).getElement();

    const texts = personal.PersonalText;

    const role = new BaseComponent({
      tag: 'div',
      className: ABOUT_STYLE.ROLE,
      textContent: texts.role,
    }).getElement();

    const description = texts.description ? this.createDescription(texts.annotation, personal) : '';

    const gitHubLink = Team.createGithubLink(texts.github);
    gitHubLink.classList.add(...ABOUT_STYLE.GIT);

    textContainer.append(role, description, gitHubLink);
    return textContainer;
  }

  private static createDescription(text: string, personal: Personal): HTMLElement {
    const description = new BaseComponent({
      tag: 'div',
      className: ABOUT_STYLE.DESCRIPTION,
    }).getElement();
    const paragraph = text;

    const currentStyle = /Спасибо/.test(paragraph)
      ? ABOUT_STYLE.DESCRIPTION_THANKS
      : ABOUT_STYLE.DESCRIPTION_PARAGRAPH;

    const fullText = new BaseComponent({
      tag: 'p',
      className: currentStyle,
      textContent: paragraph,
    }).getElement();

    const moreLink = new ElementBuilder({
      tag: 'div',
      className: ABOUT_STYLE.MORE_LINK,
      callback: (): void => {
        const modalContent = Person.createModalContent(personal);
        const modal = new Modal({
          title: personal.PersonalText.role,
          content: modalContent,
        });
        document.body.append(modal.getElement());
        modal.showModal();
      },
    }).getElement();

    moreLink.append(ABOUT.more);
    fullText.append(moreLink);
    description.append(fullText);
    return description;
  }

  private static createModalContent(personal: Personal): ElementBuilder {
    const container = new ElementBuilder({
      tag: 'div',
      className: MODAL.CONTENT.ABOUT.CONTAINER,
    });

    const image = new ImageBuilder({
      source: personal.PersonalImageBox.photo.url,
      alt: personal.PersonalText.name,
      className: MODAL.CONTENT.ABOUT.IMAGE,
    }).getElement();

    const name = new ElementBuilder({
      tag: 'h3',
      className: MODAL.CONTENT.ABOUT.NAME,
      textContent: personal.PersonalText.name,
    }).getElement();

    const gitHubLink = Team.createGithubLink(personal.PersonalText.github);
    gitHubLink.classList.add(...MODAL.CONTENT.ABOUT.GITHUB);

    container.getElement().append(image, name, gitHubLink);

    if (personal.PersonalText.description) {
      const description = new ElementBuilder({
        tag: 'div',
        className: MODAL.CONTENT.ABOUT.DESCRIPTION,
      }).getElement();

      for (const paragraph of personal.PersonalText.description) {
        const text = new ElementBuilder({
          tag: 'p',
          className: ABOUT_STYLE.DESCRIPTION_PARAGRAPH,
          textContent: paragraph,
        }).getElement();
        description.append(text);
      }

      container.getElement().append(description);
    }

    return container;
  }
}
