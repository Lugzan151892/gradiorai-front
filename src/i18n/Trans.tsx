import React from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import { TNameSpace, INamespaceKeyMap } from '@/i18n/interfaces/locale';

export const Trans = <N extends TNameSpace, K extends INamespaceKeyMap[N]>({
  ns,
  k,
  children,
  className,
  format,
  as = 'span',
}: {
  ns: N;
  k: K;
  children?: React.ReactNode;
  className?: string;
  format?: 'uppercase' | 'lovercase';
  as?: 'span' | 'button' | 'div';
}) => {
  const { t } = useI18n();
  const formatText = (t: string) => {
    if (!format) return t;
    switch (format) {
      case 'uppercase':
        return t.toUpperCase();
      case 'lovercase':
        return t.toLowerCase();
    }
  };
  const text = formatText(t(ns, k)) || (children ?? '');
  const Tag = as;
  return (
    <Tag
      className={className}
      data-i18n={`${ns}:${k}`}
      data-i18n-value={text}
    >
      {text}
    </Tag>
  );
};
