import { translations, languages, defaultLanguage } from './ui.ts';

export { languages, defaultLanguage };

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

// Create a utility for creating language-aware paths
export function useTranslatedPath(lang: keyof typeof translations) {
  return function translatePath(path: string, targetLang: string = lang) {
    // Always include the language prefix for consistency
    // This ensures all blog and page routes have proper language prefixes
    return `/${targetLang}${path.startsWith('/') ? path : `/${path}`}`;
  };
}