import { Language } from '@/types/enums';
import { LanguageSelector } from '@/utils/language-selector';

describe('LanguageSelector', () => {
  let languageSelector: LanguageSelector;

  beforeEach(() => {
    localStorage.clear();
    languageSelector = LanguageSelector.getInstance();
  });

  test('should set and get language correctly', () => {
    languageSelector.setLanguage(Language.ENGLISH);
    expect(languageSelector.getLanguage()).toBe(Language.ENGLISH);
  });

  test('should return same instance when instance is called multiple times', () => {
    const firstInstance = LanguageSelector.getInstance();
    const secondInstance = LanguageSelector.getInstance();
    expect(firstInstance).toBe(secondInstance);
  });
});
