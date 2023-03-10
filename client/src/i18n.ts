import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      title: 'Currency converter',
      loading: 'Loading...',
      error: 'Application error - server is not responding.',
      info: {
        disclaimer: 'Foreign exchange market rates are updated only once a day.',
        updatedAt: 'Last update: {{date}}',
      },
      exchangeRates: {
        title: 'Exchange rates',
      },
      form: {
        amount: 'Amount CZK',
        code: 'Select currency',
        submit: 'Convert',
      },
      result: {
        czk: '{{value}} Czech koruna',
        other: '1 {{code}} = {{value}} CZK',
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
