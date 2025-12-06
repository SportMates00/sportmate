// app/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import WelcomePages from './component/welcome pages/WelcomePagesLan';

// Translations
const resources = {
  en: {
    translation: {
      ...WelcomePages.en
    }
  },
  am: {
    translation: {
      ...WelcomePages.am
    }
  },
  ru: {
    translation: {
      ...WelcomePages.ru
    }
  }
};

i18n
  .use(initReactI18next) // Initialize react-i18next
  .init({
    resources,
    lng: 'am', // Default language
    interpolation: {
      escapeValue: false, // Not needed for React
    },
  });

export default i18n;
