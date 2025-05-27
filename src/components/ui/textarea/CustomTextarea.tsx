'use client';

import { Field, Label, Textarea } from '@headlessui/react';
import React, { useRef, useEffect } from 'react';

interface ICustomTextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  validation?: boolean;
  className?: string;
  disabled?: boolean;
  rows?: number;
  onInput?: (val: string) => void;
  onChange?: (val: string) => void;
}

const CustomTextarea: React.FC<ICustomTextareaProps> = ({
  label,
  placeholder,
  value = '',
  error,
  validation,
  className = '',
  rows = 1,
  disabled = false,
  onInput,
  onChange,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const autoResize = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto'; // сброс
      el.style.height = `${el.scrollHeight}px`; // установка новой высоты
    }
  };

  useEffect(() => {
    autoResize();
  }, [value]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    autoResize();
    onInput?.(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onChange?.(e.currentTarget.value);
    }
  };

  const borderColor = error && validation ? 'border-error' : 'border-gray-300';
  const errorTextVisible = error && validation;

  return (
    <div className={`w-full ${className}`}>
      <Field>
        {label && <Label className={'text-xl mb-1 text-white block'}>{label}</Label>}

        <div className={`flex w-full rounded-lg py-1.5 px-3 border-2 bg-white text-black ${borderColor}`}>
          <Textarea
            ref={textareaRef}
            className={`w-full resize-none overflow-hidden text-sm focus:outline-none disabled:opacity-50`}
            value={value}
            rows={rows}
            disabled={disabled}
            placeholder={placeholder}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div
          className={`text-error text-xs h-5 pt-1 transition-opacity duration-200 ${
            errorTextVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {error}
        </div>
      </Field>
    </div>
  );
};

export default CustomTextarea;
