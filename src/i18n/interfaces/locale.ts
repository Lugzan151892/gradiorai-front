export type TLocale = 'ru' | 'en';
export type TNameSpace = 'common';

/**
 * Example:
 * 
 * {
    "en": {
        "common": {
            "main_text": "Подготовка к собеседованию с AI",
            "save": "Другой текст для сейва"
        }
    }
  }
 * 
 */

export type TCommonKey = 'main_text' | 'save';
export type TMainKey = '';

export interface INamespaceKeyMap {
  main: TMainKey;
  common: TCommonKey;
}

export type TTranslationsShape = {
  [L in TLocale]: {
    [N in TNameSpace]: Record<INamespaceKeyMap[N], string>;
  };
};
