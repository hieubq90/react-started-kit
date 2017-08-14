import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import deLocaleData from 'react-intl/locale-data/de';

import { DEFAULT_LOCALE } from './constants/constants';

import viTranslationMessages from './translations/vi.json';
import enTranslationMessages from './translations/en.json';

addLocaleData(enLocaleData);
addLocaleData(deLocaleData);

export const appLocales = ['vi', 'en'];

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, viTranslationMessages)
      : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  }, {});
};

export const translationMessages = {
  en: formatTranslationMessages('vi', viTranslationMessages),
  de: formatTranslationMessages('en', enTranslationMessages),
};
