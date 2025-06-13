import { Language } from '@/types/enums';
import { LanguageSelector } from '@/utils/language-selector';

describe('LanguageSelector', () => {
  let languageSelector: LanguageSelector;

  beforeEach(() => {
    localStorage.clear();
    languageSelector = new LanguageSelector(Language.ENGLISH);
  });

  test('should initialize with default language when no languages are saved in local storage', () => {
    expect(languageSelector.getLanguage()).toBe(Language.ENGLISH);
  });

  test('should set and get language correctly', () => {
    languageSelector.setLanguage(Language.RUSSIAN);
    expect(languageSelector.getLanguage()).toBe(Language.RUSSIAN);
  });
});
