import { useTranslation } from "react-i18next";

/**
 * Provides translation helpers for the current i18n instance.
 *
 * @returns {{
 *   toggleLanguage: (lng: string) => void,
 *   translate: (key?: string) => string
 * }} An object containing language-switching and translation utilities.
 */
const useTranslate = () => {
  const { t: translate, i18n } = useTranslation();

  const toggleLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return { language: i18n?.language, toggleLanguage, translate };
};

export { useTranslate };
