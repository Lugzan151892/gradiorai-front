'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Api from '@/core/api/api';
import { Trans } from '@/i18n/Trans';
import { useI18n } from '@/i18n/I18nProvider';
import { useBreakpoint } from '@/hooks/useBreakpoints';

interface IMessengerPopupProps {
  title: string | React.ReactNode;
  delay?: number;
  className?: string;
}

interface IAdvice {
  advice?: string;
  advice_ru?: string;
  advice_en: string;
}

const MessengerPopup: React.FC<IMessengerPopupProps> = ({ title, delay = 2000, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [advice, setAdvice] = useState<IAdvice | null>();
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { locale } = useI18n();

  const loadDaylyAdvice = useCallback(async () => {
    const today = new Date().toISOString().split('T')[0];
    const dismissedKey = `messenger-popup-dismissed-${today}`;
    const wasDismissed = localStorage.getItem(dismissedKey);

    if (!wasDismissed) {
      const result = await Api.getSilent<undefined, { response: IAdvice; usage: any }>('/gpt/advice');

      if (result.success) {
        setAdvice(result.payload.response);
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, delay);

        return () => clearTimeout(timer);
      }
    }
  }, [delay]);

  useEffect(() => {
    loadDaylyAdvice();
  }, [loadDaylyAdvice]);

  const handleClose = () => {
    setIsClosing(true);

    /** Сохранение в локалстораге закрытого окна. Если окно закрыто, сегодня больше не отображаем. */
    const today = new Date().toISOString().split('T')[0];
    const dismissedKey = `messenger-popup-dismissed-${today}`;
    localStorage.setItem(dismissedKey, 'true');

    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const { isMobile } = useBreakpoint();

  const handleToggleContent = () => {
    if (!isMobile || isAnimating) return;
    setIsAnimating(true);
    setIsContentExpanded(!isContentExpanded);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const adviceText = (locale === 'ru' ? advice?.advice_ru : advice?.advice_en) || advice?.advice;

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed lg:bottom-6 lg:right-6 bottom-4 left-1/2 lg:left-auto z-5 w-[calc(100vw-32px)] lg:w-auto lg:max-w-sm',
        className
      )}
    >
      <div
        className={cn(
          'bg-white rounded-2xl shadow-lg border border-gray-200 p-4 transition-all duration-300 lg:translate-x-0 -translate-x-1/2',
          isClosing ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100 animate-slide-up'
        )}
      >
        <div className={'flex items-center gap-3 mb-3'}>
          <div
            className={
              'w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center'
            }
          >
            <span className={'text-white text-sm font-bold'}>AI</span>
          </div>
          <div
            className={'flex-1 cursor-pointer lg:cursor-default'}
            onClick={handleToggleContent}
          >
            <div className={'font-semibold text-gray-900 text-sm flex items-center gap-2'}>
              <span>{title}</span>
              <div className={'lg:hidden'}>
                <svg
                  width={'16'}
                  height={'16'}
                  viewBox={'0 0 24 24'}
                  fill={'none'}
                  stroke={'currentColor'}
                  strokeWidth={'2'}
                  className={`transition-transform duration-300 ${isContentExpanded ? 'rotate-180' : 'rotate-0'}`}
                >
                  <polyline points={'6,9 12,15 18,9'} />
                </svg>
              </div>
            </div>
            <div className={'text-xs text-gray-500'}>
              <Trans
                ns={'common'}
                k={'common_now'}
              />
            </div>
          </div>
          <button
            onClick={handleClose}
            className={
              'text-gray-400 hover:text-gray-600 cursor-pointer transition-colors p-1 rounded-full hover:bg-gray-100'
            }
          >
            <svg
              width={'16'}
              height={'16'}
              viewBox={'0 0 24 24'}
              fill={'none'}
              stroke={'currentColor'}
              strokeWidth={'2'}
            >
              <line
                x1={'18'}
                y1={'6'}
                x2={'6'}
                y2={'18'}
              />
              <line
                x1={'6'}
                y1={'6'}
                x2={'18'}
                y2={'18'}
              />
            </svg>
          </button>
        </div>
        <div
          className={cn(
            'overflow-hidden transition-all duration-700 ease-in-out',
            'lg:max-h-none lg:opacity-100',
            isContentExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className={'text-gray-700 text-sm leading-relaxed'}>{adviceText}</div>
          <div className={'flex items-center justify-end mt-2'}>
            <div className={'flex items-center gap-1'}>
              <svg
                width={'12'}
                height={'12'}
                viewBox={'0 0 24 24'}
                fill={'currentColor'}
                className={'text-blue-500'}
              >
                <path d={'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'} />
              </svg>
              <span className={'text-xs text-gray-400'}>1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessengerPopup;
