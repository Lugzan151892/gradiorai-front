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
  preserveLineBreaks = false,
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
    if (!preserveLineBreaks) {
      return text;
    }

    // Разделяем текст на части по двойным переносам строк (абзацы)
    const paragraphs = text.split(/\n\s*\n/);
    
    return paragraphs.map((paragraph, paragraphIndex) => {
      // Внутри каждого абзаца обрабатываем одинарные переносы строк
      const lines = paragraph.split('\n').map((line, lineIndex, linesArray) => (
        <React.Fragment key={lineIndex}>
          {line}
          {lineIndex < linesArray.length - 1 && <br />}
        </React.Fragment>
      ));

      // Если абзацев больше одного, оборачиваем каждый в <p>
      if (paragraphs.length > 1) {
        return (
          <p 
            key={paragraphIndex} 
            style={{ margin: paragraphIndex === 0 ? '0 0 1em 0' : '1em 0' }}
          >
            {lines}
          </p>
        );
      }
      
      // Если абзац один, просто возвращаем строки с <br>
      return lines;
    });
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
