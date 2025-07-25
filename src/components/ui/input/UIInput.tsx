'use client';

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import IMask, { MaskedOptions } from 'imask';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import UILabel from '@/components/ui/label/UILabel';

type TInputType = 'text' | 'password' | 'email' | 'number';

interface Props extends Pick<React.ComponentProps<'input'>, 'id' | 'disabled' | 'placeholder' | 'value' | 'className'> {
  label?: string;
  type?: TInputType;
  error?: string[] | string;
  linkChild?: React.ReactNode;
  success?: boolean;
  onInput?: (val: string) => void;
  onChange?: (val: string) => void;

  mask?: MaskedOptions<any>;
  decimalScale?: number;
  suffix?: string;
}

const UIInput: React.FC<Props> = ({
  className,
  type = 'text',
  id,
  label,
  disabled,
  placeholder,
  value,
  error,
  linkChild,
  success,
  onInput,
  onChange,
  mask,
  decimalScale,
  suffix,
}) => {
  const [currentInputType, setCurrentInputType] = useState<TInputType>(type);
  const [internalValue, setInternalValue] = useState<string>(String(value ?? ''));
  const inputRef = useRef<HTMLInputElement>(null);
  const maskRef = useRef<InstanceType<typeof IMask.InputMask> | null>(null);

  const errorsList = Array.isArray(error) ? error : error ? [error] : [];

  useEffect(() => {
    setInternalValue(String(value ?? ''));
  }, [value]);

  useEffect(() => {
    if (!inputRef.current) return;

    if (maskRef.current) {
      maskRef.current.destroy();
    }

    if (type === 'number' && decimalScale !== undefined) {
      maskRef.current = IMask(inputRef.current, {
        mask: 'Number',
        scale: decimalScale,
        signed: false,
        thousandsSeparator: ' ',
        normalizeZeros: true,
        padFractionalZeros: true,
      });
    } else if (mask) {
      maskRef.current = IMask(inputRef.current, mask);
    }

    if (maskRef.current) {
      maskRef.current.on('accept', () => {
        const val = maskRef.current!.value;
        setInternalValue(val);
        onInput?.(val);
      });
    }

    return () => {
      if (maskRef.current) {
        maskRef.current.destroy();
        maskRef.current = null;
      }
    };
  }, [mask, decimalScale, type, onInput]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onChange?.(internalValue);
    }
  };

  const togglePasswordVisibility = () => {
    setCurrentInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  const getIconColor = () => {
    if (disabled) return 'var(--main-gray)';
    if (errorsList.length) return 'var(--main-error)';
    return 'white';
  };

  const isPasswordToggleVisible = type === 'password';
  const hasSuffix = Boolean(suffix);

  return (
    <div className={cn(className, 'flex flex-col w-full')}>
      {label && (
        <UILabel
          className={'mb-2'}
          htmlFor={id}
          error={!!errorsList.length}
          disabled={disabled}
        >
          {label}
        </UILabel>
      )}
      <div className={'relative w-full'}>
        <input
          ref={inputRef}
          data-slot={'input'}
          id={id}
          value={internalValue}
          onChange={(e) => {
            if (!mask && type !== 'number') {
              setInternalValue(e.target.value);
              onInput?.(e.target.value);
            }
          }}
          onKeyDown={handleKeyDown}
          type={currentInputType}
          name={type}
          autoComplete={type}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            'text-white border-1 p-4 min-h-12 text-sm rounded-4xl border-main-gray w-full',
            'focus:outline-none focus:ring-0',
            success && 'border-main-green',
            errorsList.length && 'border-error text-error',
            disabled && 'text-main-gray border-main-gray',
            isPasswordToggleVisible && 'pr-10',
            hasSuffix && 'pr-16'
          )}
        />
        {isPasswordToggleVisible && (
          <div
            onClick={togglePasswordVisibility}
            className={'absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'}
          >
            {currentInputType === 'password' ? (
              <EyeOff
                size={24}
                color={getIconColor()}
              />
            ) : (
              <Eye
                size={24}
                color={getIconColor()}
              />
            )}
          </div>
        )}

        {hasSuffix && (
          <span className={'absolute right-4 top-1/2 -translate-y-1/2 text-white pointer-events-none select-none'}>
            {suffix}
          </span>
        )}
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

export default UIInput;
