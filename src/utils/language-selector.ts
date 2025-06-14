import { en } from '../locales/en';
import { nl } from '../locales/nl';
import { ru } from '../locales/ru';
import { Language } from '../types/enums';
import { isValidLanguage } from '../types/guards';

export class LanguageSelector {
  private static instance: LanguageSelector;
  public translations: typeof ru;
  private currentLanguage: Language;

  private constructor() {
    this.currentLanguage = LanguageSelector.getInitialLanguage();
    this.translations = LanguageSelector.getTranslations(this.currentLanguage);
  }

  public static getInstance(): LanguageSelector {
    if (!LanguageSelector.instance) {
      LanguageSelector.instance = new LanguageSelector();
    }
    return LanguageSelector.instance;
  }

  private static getInitialLanguage(): Language {
    const savedLanguage = localStorage.getItem('great-js-minds-ecommerce-locale');
    if (savedLanguage && isValidLanguage(savedLanguage)) {
      return savedLanguage;
    }

    const browserLanguage = navigator.language.split('-')[0];
    if (isValidLanguage(browserLanguage)) {
      return browserLanguage;
    }

    return Language.RUSSIAN;
  }

  private static getTranslations(language: Language): typeof ru {
    switch (language) {
      case Language.ENGLISH: {
        return en;
      }
      case Language.DUTCH: {
        return nl;
      }
      default: {
        return ru;
      }
    }
  }

  public getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  public setLanguage(language: Language): void {
    if (this.currentLanguage !== language) {
      this.currentLanguage = language;
      this.translations = LanguageSelector.getTranslations(language);
      localStorage.setItem('great-js-minds-ecommerce-locale', language);
    }
  }
}
