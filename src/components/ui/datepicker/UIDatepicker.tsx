'use client';

import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import IMask, { MaskedDateOptions } from 'imask';
import { CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';
import UICalendar from '@/components/ui/calendar/UICalendar';
import UIInput from '@/components/ui/input/UIInput';
import { DateValue } from 'imask/esm/masked/date';

interface UIDatePickerProps {
  value?: string;
  onChange?: (val: string) => void;
  onInput?: (val: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error?: string | string[];
  className?: string;
  mask?: string;
}

const UIDatePicker: React.FC<UIDatePickerProps> = ({
  value,
  onChange,
  onInput,
  placeholder = 'дд.мм.гггг чч:мм:сс',
  label,
  disabled,
  error,
  className,
  mask = 'DD.MM.YYYY HH:mm:ss',
}) => {
  /** Костыль для фикса каретки после выбора даты из календаря */
  const [inputKey, setInputKey] = useState(0);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const parseDate = (str: string) => {
    const [datePart, timePart] = str.split(' ');
    const [d, m, y] = datePart?.split('.')?.map(Number);
    const [h = 0, min = 0, s = 0] = timePart?.split(':')?.map(Number) || [];
    if (!d || !m || !y) return null;
    return new Date(y, m - 1, d, h, min, s);
  };

  const formatDate = (date: DateValue) => {
    if (!date) return '';

    const parts: string[] = [];

    if (mask.includes('DD')) parts.push(String(date.getDate()).padStart(2, '0'));
    if (mask.includes('MM')) parts.push(String(date.getMonth() + 1).padStart(2, '0'));
    if (mask.includes('YYYY')) parts.push(String(date.getFullYear()));

    let formatted = parts.join('.');

    const timeParts: string[] = [];
    if (mask.includes('HH')) timeParts.push(String(date.getHours()).padStart(2, '0'));
    if (mask.includes('mm')) timeParts.push(String(date.getMinutes()).padStart(2, '0'));
    if (mask.includes('ss')) timeParts.push(String(date.getSeconds()).padStart(2, '0'));

    if (timeParts.length) formatted += ' ' + timeParts.join(':');

    return formatted;
  };

  const parsedDate = React.useMemo(() => {
    if (!value) return new Date();
    const date = parseDate(value);
    return date ?? new Date();
  }, [value]);

  const handleDateClick = (date: Date) => {
    const formatted = formatDate(date);
    onChange?.(formatted);
    onInput?.(formatted);
    setInputKey((k) => k + 1);
    setIsCalendarOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setIsCalendarOpen(false);
      }
    };
    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalendarOpen]);

  const generateIMask = (): MaskedDateOptions => {
    return {
      mask: Date,
      pattern: mask
        .replace(/DD/, 'd')
        .replace(/MM/, 'm')
        .replace(/YYYY/, 'Y')
        .replace(/HH/, 'H')
        .replace(/mm/, 'M')
        .replace(/ss/, 'S'),
      blocks: {
        d: { mask: IMask.MaskedRange, from: 1, to: 31, maxLength: 2 },
        m: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2 },
        Y: { mask: IMask.MaskedRange, from: 1900, to: 2100 },
        H: { mask: IMask.MaskedRange, from: 0, to: 23, maxLength: 2 },
        M: { mask: IMask.MaskedRange, from: 0, to: 59, maxLength: 2 },
        S: { mask: IMask.MaskedRange, from: 0, to: 59, maxLength: 2 },
      },
      format: (date: DateValue) => formatDate(date),
      parse: (str: string) => parseDate(str) ?? new Date(),
      lazy: false,
      autofix: true,
    };
  };

  return (
    <div
      className={cn('relative w-full', className)}
      ref={wrapperRef}
    >
      <UIInput
        type={'text'}
        label={label}
        key={inputKey}
        value={value}
        onInput={(val) => onInput?.(val)}
        onChange={(val) => onChange?.(val)}
        mask={generateIMask()}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        suffix={
          <button
            type={'button'}
            onClick={() => setIsCalendarOpen((prev) => !prev)}
            className={'absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'}
          >
            <CalendarDays className={'text-white w-5 h-5'} />
          </button>
        }
      />

      {isCalendarOpen && (
        <div className={'absolute top-20 right-6 z-20 bg-white border rounded-xl p-4 shadow-xl text-black w-fit'}>
          <UICalendar
            selectedDate={parsedDate}
            onSelect={handleDateClick}
          />
        </div>
      )}
    </div>
  );
};

export default UIDatePicker;
