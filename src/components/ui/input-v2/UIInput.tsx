'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import UILabel from '@/components/ui/label/UILabel';

type TInputType = 'text' | 'password' | 'email' | 'number';

interface Props extends Pick<React.ComponentProps<'input'>, 'id' | 'disabled' | 'placeholder' | 'value' | 'className'> {
  label?: string;
  type?: TInputType;
  error?: string[] | string;
  linkChild?: React.ReactNode;
  onInput?: (val: string) => void;
  onChange?: (val: string) => void;
}

const UIInput: React.FC<Readonly<Props>> = ({
  className,
  type = 'text',
  id,
  label,
  disabled,
  placeholder,
  value,
  error,
  linkChild,
  onInput,
  onChange,
}) => {
  const [currentInputType, setCurrentInputType] = useState<TInputType>(type);
  const [internalValue, setInternalValue] = useState<string>(String(value ?? ''));

  const errorsList = Array.isArray(error) ? error : error ? [error] : [];

  useEffect(() => {
    setInternalValue(String(value ?? ''));
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternalValue(val);
    onInput?.(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  const togglePasswordVisibility = () => {
    setCurrentInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  const isPasswordToggleVisible = type === 'password';

  const getIconColor = () => {
    if (disabled) {
      return 'var(--main-gray)';
    }

    if (errorsList.length) {
      return 'var(--main-error)';
    }

    return 'white';
  };

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
      <div className={'relative'}>
        <input
          data-slot={'input'}
          id={id}
          value={internalValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          type={currentInputType}
          name={type}
          autoComplete={type}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            'text-white border-1 pl-3 min-h-12 text-sm rounded-4xl border-main-gray selection:border-main-gray selection:border-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 w-full',
            'focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
            'focus-visible:border-main-gray focus-visible:border-1',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            isPasswordToggleVisible && 'pr-10',
            errorClasses,
            disabledClasses
          )}
        />
        {isPasswordToggleVisible && (
          <div
            onClick={togglePasswordVisibility}
            className={
              'absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer'
            }
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

export { UIInput };
