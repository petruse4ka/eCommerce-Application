import '@/styles/main.css';

import RSLogo from '@/assets/images/about/rsschool.png';
import Person from '@/components/about';
import BaseComponent from '@/components/base';
import Button from '@/components/buttons';
import { ABOUT, SCHOOL_URL } from '@/data';
import { ABOUT_STYLE } from '@/styles/pages/about';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';
import LinkBuilder from '@/utils/link-builder';

export default class AboutPage extends BaseComponent {
  constructor() {
    super({
      tag: 'main',
      className: ABOUT_STYLE.MAIN_CONTAINER,
    });
    const title = new ElementBuilder({
      tag: 'h1',
      className: ABOUT_STYLE.TITLE,
      textContent: ABOUT.title,
    }).getElement();

    this.component.append(title);

    this.render();
  }

  private static createTributeBlock(): HTMLElement {
    const tributeText = new ElementBuilder({
      tag: 'p',
      className: ABOUT_STYLE.TRIBUTE_TEXT,
      textContent: ABOUT.tributeText,
    }).getElement();

    const joinLink = new Button({
      style: 'PRIMARY_PINK',
      textContent: ABOUT.joinRS,
      callback: (): void => {
        window.open(SCHOOL_URL, '_blank');
      },
    }).getElement();

    const tributeTitle = new ElementBuilder({
      tag: 'h2',
      className: ABOUT_STYLE.TITLE,
      textContent: ABOUT.tributeTitle,
    }).getElement();

    const rsSchoolContainer = new ElementBuilder({
      tag: 'div',
      className: ABOUT_STYLE.TRIBUTE_CONTAINER,
    }).getElement();

    rsSchoolContainer.append(tributeTitle, tributeText, joinLink);
    return rsSchoolContainer;
  }

  private static createCopyrightLink(): HTMLElement {
    const link = new LinkBuilder({
      href: SCHOOL_URL,
      target: '_blank',
      className: ABOUT_STYLE.RSSCHOOL_LINK,
    }).getElement();

    const logo = new ImageBuilder({
      source: RSLogo,
      alt: 'RS School Logo',
      className: ABOUT_STYLE.RSLOGO,
    }).getElement();

    link.append(logo);
    return link;
  }

  private static createToggleButton(additionalParagraphs: HTMLElement): HTMLElement {
    const toggleButton = new Button({
      style: 'PRIMARY_PINK',
      textContent: ABOUT.ShowMore,
      callback: (): void => {
        const isHidden = additionalParagraphs.classList.contains(ABOUT_STYLE.HIDDEN[0]);

        additionalParagraphs.classList.remove(
          isHidden ? ABOUT_STYLE.HIDDEN[0] : ABOUT_STYLE.VISIBLE[0]
        );
        additionalParagraphs.classList.add(
          isHidden ? ABOUT_STYLE.VISIBLE[0] : ABOUT_STYLE.HIDDEN[0]
        );

        toggleButton.textContent = isHidden ? ABOUT.ShowLess : ABOUT.ShowMore;
      },
    }).getElement();

    return toggleButton;
  }

  private static createSuccessBlock(): HTMLElement {
    const textContainer = new ElementBuilder({
      tag: 'div',
      className: ABOUT_STYLE.FINALLY_CONTAINER,
    }).getElement();

    const successRecipeTitle = new ElementBuilder({
      tag: 'h2',
      className: ABOUT_STYLE.TITLE,
      textContent: ABOUT.successRecipeTitle,
    }).getElement();
    textContainer.append(successRecipeTitle);

    const firstParagraph = new ElementBuilder({
      tag: 'p',
      className: ABOUT_STYLE.PARAGRAPH,
      textContent: ABOUT.text[0],
    }).getElement();

    const additionalParagraphs = new ElementBuilder({
      tag: 'div',
      className: [...ABOUT_STYLE.ADDITIONAL_PARAGRAPHS, ...ABOUT_STYLE.HIDDEN],
    }).getElement();

    for (let index = 1; index < ABOUT.text.length; index++) {
      const p = new ElementBuilder({
        tag: 'p',
        className: ABOUT_STYLE.PARAGRAPH,
        textContent: ABOUT.text[index],
      }).getElement();
      additionalParagraphs.append(p);
    }

    const toggleButton = AboutPage.createToggleButton(additionalParagraphs);
    textContainer.append(firstParagraph, additionalParagraphs, toggleButton);
    return textContainer;
  }

  private render(): void {
    const container = new ElementBuilder({
      tag: 'div',
      className: ABOUT_STYLE.CONTAINER,
    }).getElement();

    container.append(new Person(ABOUT.KONSTANTIN, true).getElement());
    container.append(new Person(ABOUT.DANIIL, true).getElement());
    container.append(new Person(ABOUT.OLGA, true).getElement());
    container.append(new Person(ABOUT.MARGO, true).getElement());

    this.component.append(container);

    const successBlock = AboutPage.createSuccessBlock();
    const tributeBlock = AboutPage.createTributeBlock();
    this.component.append(successBlock, tributeBlock);

    const copyrightLink = AboutPage.createCopyrightLink();

    const cafe = new ImageBuilder({
      source: ABOUT.image,
      alt: ABOUT.title,
      className: ABOUT_STYLE.IMAGE,
    }).getElement();

    this.component.append(copyrightLink, cafe);
  }
}
