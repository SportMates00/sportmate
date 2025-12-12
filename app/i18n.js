// app/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import WelcomePagesLan from './component/welcome pages/WelcomePagesLan';
import GamesLan from '../app/(tabs)/Games/GamesLan';
import SettingsLan from '../app/component/profile/menutab/Settings/SettingsLan';

// Translations
const resources = {
  en: {
    translation: {
      ...WelcomePagesLan.en, ...GamesLan.en, ...SettingsLan.en
    }
  },
  am: {
    translation: {
      ...WelcomePagesLan.am, ...GamesLan.am, ...SettingsLan.am
    }
  },
  ru: {
    translation: {
      ...WelcomePagesLan.ru, ...GamesLan.ru, ...SettingsLan.ru
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
