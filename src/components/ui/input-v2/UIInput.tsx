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
  onInput,
  onChange,
}) => {
  const [showTooltip, setShowTooltip] = useState(!!error);
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

  const togglePasswordVisibility = () => {
    setCurrentInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  const isPasswordToggleVisible = type === 'password';

  return (
    <div
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className={cn(className, 'relative')}
    >
      {label && (
        <UILabel
          className={'mb-1'}
          htmlFor={id}
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
            'text-white border-1 pl-3 min-h-12 text-sm rounded-4xl border-main-gray selection:border-main-gray selection:border-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            'focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
            'focus-visible:border-main-gray focus-visible:border-1',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            isPasswordToggleVisible && 'pr-10'
          )}
        />

        {isPasswordToggleVisible && (
          <div
            onClick={togglePasswordVisibility}
            className={
              'absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer'
            }
          >
            {currentInputType === 'password' ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        )}
        {showTooltip && errorsList.length > 0 && (
          <div
            className={
              'absolute right-0 bottom-[60px] bg-white text-red-600 shadow-lg rounded text-sm w-max max-w-48 p-2 z-10'
            }
          >
            <div className={'absolute -bottom-1 right-5 w-3 h-3 bg-white transform rotate-45'} />
            {errorsList.map((err, index) => (
              <div
                key={index}
                className={'flex items-center gap-2'}
              >
                <span className={'text-xs'}>{err}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { UIInput };
