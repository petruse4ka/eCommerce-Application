import byFlag from '@/assets/icons/flags/belarus.png';
import nlFlag from '@/assets/icons/flags/netherlands.png';
import ruFlag from '@/assets/icons/flags/russia.png';
import ukFlag from '@/assets/icons/flags/united-kingdom.png';
import BaseComponent from '@/components/base';
import ButtonWithIcon from '@/components/buttons/button-with-icon';
import { LANGUAGES } from '@/constants';
import { SVG_ICONS } from '@/data';
import { SUBHEADER_STYLES } from '@/styles/header/subheader';
import { Language } from '@/types/enums';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';
import { LanguageSelector } from '@/utils/language-selector';

export default class LanguageMenu extends BaseComponent {
  private isOpen = false;
  private currentLanguage: Language;
  private languageDropdown: HTMLElement;
  private languageButton: ButtonWithIcon;
  private languageSelector: LanguageSelector;

  constructor() {
    super({
      tag: 'div',
      className: SUBHEADER_STYLES.LANGUAGE_OPTION,
    });

    this.languageSelector = LanguageSelector.getInstance();
    this.currentLanguage = this.languageSelector.getLanguage();

    this.languageDropdown = new ElementBuilder({
      tag: 'div',
      className: [
        ...SUBHEADER_STYLES.LANGUAGE_DROPDOWN,
        ...SUBHEADER_STYLES.LANGUAGE_DROPDOWN_INACTIVE,
      ],
    }).getElement();

    this.languageButton = new ButtonWithIcon({
      style: 'SUBHEADER_ICON_OUTLINE',
      icon: {
        source: SVG_ICONS.LANGUAGE_ICON,
        classNameIcon: SUBHEADER_STYLES.TRANSLATE_ICON,
      },
      textClassName: SUBHEADER_STYLES.TRANSLATE_TEXT,
      textContent: '',
      callback: (): void => this.showDropdown(),
    });

    this.render();
    this.addEventListeners();
  }

  protected render(): void {
    const englishLanguageOption = this.createLanguageItem(Language.ENGLISH, ukFlag, LANGUAGES.en);
    const russianLanguageOption = this.createLanguageItem(Language.RUSSIAN, ruFlag, LANGUAGES.ru);
    const belarusLanguageOption = this.createLanguageItem(Language.BELARUS, byFlag, LANGUAGES.by);
    const dutchLanguageOption = this.createLanguageItem(Language.DUTCH, nlFlag, LANGUAGES.nl);

    this.languageDropdown.append(
      englishLanguageOption,
      russianLanguageOption,
      belarusLanguageOption,
      dutchLanguageOption
    );
    this.component.append(this.languageButton.getElement(), this.languageDropdown);
  }

  private createLanguageItem(language: Language, flag: string, text: string): HTMLElement {
    const languageItem = new ElementBuilder({
      tag: 'div',
      className: [
        ...SUBHEADER_STYLES.LANGUAGE_ITEM,
        ...(language === this.currentLanguage ? SUBHEADER_STYLES.LANGUAGE_ITEM_ACTIVE : []),
      ],
      callback: (): void => this.changeLanguage(language),
    }).getElement();

    const countryFlag = new ImageBuilder({
      className: SUBHEADER_STYLES.LANGUAGE_FLAG,
      source: flag,
      alt: `{text} flag icon`,
    }).getElement();

    const languageText = new ElementBuilder({
      tag: 'span',
      className: SUBHEADER_STYLES.LANGUAGE_TEXT,
      textContent: text,
    }).getElement();

    languageItem.append(countryFlag, languageText);
    return languageItem;
  }

  private addEventListeners(): void {
    globalThis.addEventListener('click', (event: Event) => {
      if (
        this.isOpen &&
        event.target !== null &&
        event.target instanceof Node &&
        !this.component.contains(event.target)
      ) {
        this.closeDropdown();
      }
    });
  }

  private showDropdown(): void {
    this.isOpen = !this.isOpen;
    if (this.languageDropdown) {
      if (this.isOpen) {
        this.languageDropdown.classList.remove(...SUBHEADER_STYLES.LANGUAGE_DROPDOWN_INACTIVE);
        this.languageDropdown.classList.add(...SUBHEADER_STYLES.LANGUAGE_DROPDOWN_ACTIVE);
      } else {
        this.languageDropdown.classList.add(...SUBHEADER_STYLES.LANGUAGE_DROPDOWN_INACTIVE);
        this.languageDropdown.classList.remove(...SUBHEADER_STYLES.LANGUAGE_DROPDOWN_ACTIVE);
      }
    }
  }

  private closeDropdown(): void {
    if (this.isOpen && this.languageDropdown) {
      this.isOpen = false;
      this.languageDropdown.classList.add(...(SUBHEADER_STYLES.LANGUAGE_DROPDOWN_INACTIVE || []));
      this.languageDropdown.classList.remove(...SUBHEADER_STYLES.LANGUAGE_DROPDOWN_ACTIVE);
    }
  }

  private changeLanguage(language: Language): void {
    if (language === this.currentLanguage) {
      this.closeDropdown();
      return;
    }

    this.languageSelector.setLanguage(language);
    this.currentLanguage = language;
    this.closeDropdown();
    globalThis.location.reload();
  }
}
