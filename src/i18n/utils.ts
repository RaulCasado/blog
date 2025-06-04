import { translations, defaultLanguage } from './ui.ts';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as keyof typeof translations;
  return defaultLanguage;
}

export function useTranslations(lang: keyof typeof translations) {
  return function t(key: keyof typeof translations[typeof defaultLanguage]) {
    return translations[lang][key] || translations[defaultLanguage][key];
  }
}