import { TRANSLATIONS } from '@/constants';
import type { Language } from '@/types/enums';
import { isValidLanguage } from '@/types/guards';

export class LanguageSelector {
  private currentLanguage: Language;

  constructor(defaultLanguage: Language) {
    const savedLanguage = localStorage.getItem('great-js-minds-ecommerce-locale');

    if (savedLanguage && isValidLanguage(savedLanguage)) {
      this.currentLanguage = savedLanguage;
    } else {
      const browserLang = navigator.language.split('-')[0];
      this.currentLanguage = isValidLanguage(browserLang) ? browserLang : defaultLanguage;
    }
  }

  public setLanguage(lang: Language): void {
    if (!isValidLanguage(lang)) {
      return;
    }
    this.currentLanguage = lang;
    localStorage.setItem('great-js-minds-ecommerce-locale', lang);
  }

  public getLanguage(): Language {
    return this.currentLanguage;
  }

  public getTranslations(): (typeof TRANSLATIONS)[Language] {
    return TRANSLATIONS[this.currentLanguage];
  }
}
