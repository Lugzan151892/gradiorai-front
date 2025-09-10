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
  preserveLineBreaks = true,
}: {
  ns: N;
  k: K;
  children?: React.ReactNode;
  className?: string;
  format?: 'uppercase' | 'lovercase';
  as?: 'span' | 'button' | 'div' | 'a';
  preserveLineBreaks?: boolean;
}) => {
  const { t } = useI18n();
  
  const formatText = (text: string) => {
    if (!format) return text;
    switch (format) {
      case 'uppercase':
        return text.toUpperCase();
      case 'lovercase':
        return text.toLowerCase();
      default:
        return text;
    }
  };

  const renderTextWithLineBreaks = (text: string) => {
    if (!preserveLineBreaks || typeof text !== 'string') {
      return text;
    }

    /** Разбиваем текст по символам \n и создаем элементы с <br /> */
    const parts = text.split('\n');
    
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const rawText = t(ns, k) || (children ?? '');
  const formattedText = formatText(rawText as string);
  const Tag = as;

  return (
    <Tag
      className={className}
      data-i18n={`${ns}:${k}`}
      data-i18n-value={formattedText}
    >
      {renderTextWithLineBreaks(formattedText as string)}
    </Tag>
  );
};
