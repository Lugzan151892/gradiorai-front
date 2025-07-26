'use client';

import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import IMask, { MaskedDateOptions } from 'imask';
import { CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';
import UICalendar from '../calendar/UICalendar';
import UIInput from '../input/UIInput';
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
}

const UIDatePicker: React.FC<UIDatePickerProps> = ({
  value,
  onChange,
  onInput,
  placeholder = 'дд.мм.гггг',
  label,
  disabled,
  error,
  className,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const parsedDate = React.useMemo(() => {
    const parts = value?.split('.');
    if (parts?.length === 3) {
      const [d, m, y] = parts.map(Number);
      const date = new Date(y, m - 1, d);
      return isNaN(date.getTime()) ? new Date() : date;
    }
    return new Date();
  }, [value]);

  const handleDateClick = (date: Date) => {
    const formatted = date
      .toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
      .replace(/\//g, '.');
    onChange?.(formatted);
    onInput?.(formatted);
    setIsCalendarOpen(false);
  };

  // закрытие по клику вне компонента
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

  const dateMask: MaskedDateOptions = {
    mask: Date,
    pattern: 'd.`m.`Y',
    blocks: {
      d: { mask: IMask.MaskedRange, from: 1, to: 31, maxLength: 2 },
      m: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2 },
      Y: { mask: IMask.MaskedRange, from: 1900, to: 2100 },
    },
    format: (date: DateValue) => {
      if (!date) return '';
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    },
    parse: (str: string) => {
      const [day, month, year] = str.split('.').map(Number);
      return new Date(year, month - 1, day);
    },
    lazy: false, // отображает подчеркивания
    autofix: true,
  };

  return (
    <div
      className={cn('relative w-full', className)}
      ref={wrapperRef}
    >
      <UIInput
        type={'text'}
        label={label}
        value={value}
        onInput={(val) => onInput?.(val)}
        onChange={(val) => onChange?.(val)}
        mask={dateMask}
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
