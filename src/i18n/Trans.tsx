import React from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import { TNameSpace, INamespaceKeyMap } from '@/i18n/interfaces/locale';

export const Trans = <N extends TNameSpace, K extends INamespaceKeyMap[N]>({
  ns,
  k,
  children,
  as = 'span',
}: {
  ns: N;
  k: K;
  children?: React.ReactNode;
  as?: 'span' | 'button' | 'div';
}) => {
  const { t } = useI18n();
  const text = t(ns, k) || (children ?? '');
  const Tag = as;
  return (
    <Tag
      data-i18n={`${ns}:${k}`}
      data-i18n-value={text}
    >
      {text}
    </Tag>
  );
};
