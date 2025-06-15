'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import UILabel from '@/components/ui/label/UILabel';

interface Props extends Pick<React.ComponentProps<'input'>, 'id' | 'disabled' | 'placeholder' | 'value' | 'className'> {
  label?: string;
  error?: string[] | string;
  linkChild?: React.ReactNode;
  success?: boolean;
  rows?: number;
  autoResize?: boolean;
  onInput?: (val: string) => void;
  onChange?: (val: string) => void;
}

const UITextarea: React.FC<Readonly<Props>> = ({
  className,
  id,
  label,
  disabled,
  placeholder,
  value,
  rows = 1,
  error,
  linkChild,
  autoResize = false,
  success,
  onInput,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState<string>(String(value ?? ''));

  const errorsList = Array.isArray(error) ? error : error ? [error] : [];

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextarea = useCallback(() => {
    if (!autoResize) {
      return;
    }
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto'; // сброс
      el.style.height = `${el.scrollHeight}px`; // установка новой высоты
    }
  }, [autoResize]);

  useEffect(() => {
    resizeTextarea();
  }, [value, resizeTextarea]);

  useEffect(() => {
    setInternalValue(String(value ?? ''));
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInternalValue(val);
    onInput?.(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      onChange?.(internalValue);
    }
  };

  const errorClasses = errorsList.length
    ? 'border-error selection:border-error text-error focus-visible:border-error'
    : '';
  const disabledClasses = disabled
    ? 'border-main-gray selection:border-main-gray text-main-gray focus-visible:border-main-gray'
    : '';

  const successStyles = 'border-main-green';

  return (
    <div className={cn(className, 'flex flex-col w-full')}>
      {label && (
        <UILabel
          className={'mb-2 text-left'}
          htmlFor={id}
          error={!!errorsList.length}
          disabled={disabled}
        >
          {label}
        </UILabel>
      )}
      <div className={'relative'}>
        <textarea
          data-slot={'input'}
          id={id}
          ref={textareaRef}
          value={internalValue}
          onChange={handleInputChange}
          rows={autoResize ? 1 : rows}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            'text-white border-1 p-4 min-h-12 text-sm rounded-4xl border-main-gray selection:border-main-gray selection:border-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 w-full',
            'focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
            'focus-visible:border-main-gray focus-visible:border-1',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            success && successStyles,
            errorClasses,
            disabledClasses
          )}
        />
      </div>
      <div className={'min-h-4'}>
        {errorsList.length && !disabled ? (
          <div className={'mt-2 text-xs text-error'}>{errorsList.join(' ')}</div>
        ) : (
          linkChild && <div>{linkChild}</div>
        )}
      </div>
    </div>
  );
};

export default UITextarea;
