import { useI18n } from '../../providers/I18nProvider';

export function useSovereignLanguage() {
  const { locale, setLocale } = useI18n();
  return { lang: locale, setLang: setLocale };
}
