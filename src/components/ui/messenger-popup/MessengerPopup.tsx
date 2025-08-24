'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Api from '@/core/api/api';

interface IMessengerPopupProps {
  title: string;
  delay?: number;
  className?: string;
}

const MessengerPopup: React.FC<IMessengerPopupProps> = ({ title, delay = 2000, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [advice, setAdvice] = useState('');

  const loadDaylyAdvice = useCallback(async () => {
    const today = new Date().toDateString();
    const dismissedKey = `messenger-popup-dismissed-${today}`;
    const wasDismissed = localStorage.getItem(dismissedKey);

    if (!wasDismissed) {
      const result = await Api.getSilent<undefined, { response: { advice: string }; usage: any }>('/gpt/advice');

      if (result.success) {
        setAdvice(result.payload.response.advice);
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
    const today = new Date().toDateString();
    const dismissedKey = `messenger-popup-dismissed-${today}`;
    localStorage.setItem(dismissedKey, 'true');

    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={cn('fixed bottom-6 right-6 z-50 max-w-sm', className)}>
      <div
        className={cn(
          'bg-white rounded-2xl shadow-lg border border-gray-200 p-4 transition-all duration-300',
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
          <div className={'flex-1'}>
            <div className={'font-semibold text-gray-900 text-sm'}>{title}</div>
            <div className={'text-xs text-gray-500'}>Сейчас</div>
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
        <div className={'text-gray-700 text-sm leading-relaxed'}>{advice}</div>
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
  );
};

export default MessengerPopup;
