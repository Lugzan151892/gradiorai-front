import React from 'react';
import { useI18n } from '@/i18n/I18nProvider';

export function Trans({
  ns,
  k,
  children,
  as = 'span',
}: {
  ns: string;
  k: string;
  children?: React.ReactNode;
  as?: any;
}) {
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
}
