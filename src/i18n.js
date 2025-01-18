import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to our website",
      "description": "This is a sample description."
    }
  },
  idn: {
    translation: {
      "welcome": "Selamat datang di situs kami",
      "description": "Ini adalah deskripsi contoh."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
