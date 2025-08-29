import React, { createContext, useContext, useEffect, useState } from 'react';
import Api from '@/core/api/api';

type NamespaceMap = Record<string, Record<string, string>>;
type LocaleMap = Record<string, NamespaceMap>;

type I18nContextType = {
  locale: string;
  setLocale: (l: string) => void;
  t: (ns: string, key: string, vars?: Record<string, string>) => string;
  translations: LocaleMap;
  updateTranslationInMemory: (locale: string, ns: string, key: string, value: string) => void;
};

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  setLocale: (_: string) => {},
  t: (_: string, __: string, ___?: Record<string, string>) => '',
  translations: {} as LocaleMap,
  updateTranslationInMemory: (_: string, __: string, ___: string, ____: string) => {},
});

export const useI18n = () => useContext(I18nContext);

export const I18nProvider = ({ children, defaultLocale = 'en' }: { children: any; defaultLocale?: string }) => {
  const [locale, setLocale] = useState(defaultLocale);
  const [translations, setTranslations] = useState<LocaleMap>({});

  useEffect(() => {
    (async () => {
      const res = await Api.get<{ locale: string }, { [key: string]: { [key: string]: { [key: string]: string } } }>(
        `/translations/export`,
        { locale }
      );
      if (!res.success) return;
      const data = res.payload;
      setTranslations(data);
    })();
  }, [locale]);

  function t(ns: string, key: string, vars?: Record<string, string>) {
    const val = translations[locale]?.[ns]?.[key];
    if (!val) return key;
    return val.replace(/\{\{(\w+)\}\}/g, (_, m) => (vars && vars[m]) ?? '');
  }

  const updateTranslationInMemory = (localeArg: string, ns: string, key: string, value: string) => {
    setTranslations((prev) => ({
      ...prev,
      [localeArg]: {
        ...(prev[localeArg] ?? {}),
        [ns]: {
          ...(prev[localeArg]?.[ns] ?? {}),
          [key]: value,
        },
      },
    }));
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, translations, updateTranslationInMemory }}>
      {children}
    </I18nContext.Provider>
  );
};
