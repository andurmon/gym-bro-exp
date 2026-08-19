import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import local assets if not hosting them externally
import translationEN from "../public/locales/en-EN/translation.json";
import translationES from "../public/locales/es-ES/translation.json";

const resources = {
  en: { translation: translationEN },
  es: { translation: translationES },
};

i18n
  .use(LanguageDetector) // Automatically detects user language
  .use(initReactI18next) // Binds i18next to React
  .init({
    resources,
    fallbackLng: "en", // Default fallback language
    interpolation: {
      escapeValue: false, // React already safeguards against XSS
    },
  });

export default i18n;
