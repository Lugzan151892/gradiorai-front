'use client';

import { Field, Label } from '@headlessui/react';
import React, { useEffect, useState, KeyboardEvent } from 'react';
import CustomIcon from '@/components/ui/icon/CustomIcon';

type TInputType = 'text' | 'password' | 'email';

interface ICustomInputProps {
  label?: string;
  placeholder?: string;
  value?: string | number;
  error?: string[] | string;
  icon?: 'password' | 'email';
  type?: TInputType;
  success?: boolean;
  disabled?: boolean;
  className?: string;
  onInput?: (val: string) => void;
  onChange?: (val: string) => void; // будет вызываться по Enter
}

const CustomInput: React.FC<ICustomInputProps> = ({
  label,
  placeholder,
  value = '',
  type = 'text',
  icon,
  success,
  error,
  className,
  onInput,
  onChange,
  disabled = false,
}) => {
  const [showTooltip, setShowTooltip] = useState(!!error);
  const [currentInputType, setCurrentInputType] = useState<TInputType>(type);
  const [internalValue, setInternalValue] = useState<string>(String(value ?? ''));

  // Синхронизируем внутреннее состояние, если приходит обновлённое value снаружи
  useEffect(() => {
    setInternalValue(String(value ?? ''));
  }, [value]);

  useEffect(() => {
    if (error) setShowTooltip(true);
  }, [error]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternalValue(val);
    onInput?.(val);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onChange?.(internalValue);
    }
  };

  const togglePasswordVisibility = () => {
    setCurrentInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  const errorsList = Array.isArray(error) ? error : error ? [error] : [];

  const borderColor = error ? 'border-error' : success ? 'border-success' : 'border-transparent';

  const inputTextColor = error ? 'text-error placeholder:text-error' : 'text-black';

  const isPasswordToggleVisible = type === 'password';

  return (
    <div className={`w-full ${className || ''}`}>
      <Field
        className={'relative'}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {label && <Label className={'text-xl text-nowrap'}>{label}</Label>}

        <div
          className={`flex bg-white w-full rounded-input pl-5 pr-3 py-3 border-[3px] ${borderColor} ${
            disabled ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          {icon && (
            <CustomIcon
              className={'mr-2'}
              color={error ? 'var(--main-error)' : 'var(--text-gray)'}
              name={icon}
            />
          )}

          <input
            value={internalValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            type={currentInputType}
            name={type}
            autoComplete={type}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full pl-3 ${icon ? 'border-l-2 rounded-none ' + (error ? '!border-error' : '!border-gray') : ''} ${inputTextColor} text-base focus:outline-none ${borderColor}`}
          />

          {isPasswordToggleVisible && (
            <CustomIcon
              className={'ml-1 cursor-pointer'}
              color={'var(--text-gray)'}
              name={currentInputType === 'password' ? 'eye-closed' : 'eye-opened'}
              onClick={togglePasswordVisibility}
            />
          )}
        </div>

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
      </Field>
    </div>
  );
};

export default CustomInput;
