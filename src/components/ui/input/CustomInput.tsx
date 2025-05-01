'use client';

import { Field, Label } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
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
  className?: string;
  onInput?: (val: string) => void;
  onChange?: (val: string) => void;
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
}) => {
  const [showTooltip, setShowTooltip] = useState(!!error);
  const [currentInputType, setCurrentInputType] = useState<TInputType>(type);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onInput) {
      onInput(e.target.value);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  const handleSetType = () => {
    if (currentInputType === 'password') {
      setCurrentInputType('text');
    } else {
      setCurrentInputType('password');
    }
  };

  useEffect(() => {
    if (!!error) {
      setShowTooltip(true);
    }
  }, [error]);

  const errorsList = Array.isArray(error) ? error : [error];
  const classes = error && errorsList?.length ? 'border-error' : success ? 'border-success' : 'border-transparent';
  const inputError = error && 'text-error placeholder:text-error';
  return (
    <div className={'w-full ' + (className || '')}>
      <Field
        className={'relative'}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {label ? <Label className={'text-xl text-nowrap'}>{label}</Label> : null}
        <div
          className={'flex bg-white w-full rounded-input pl-5 pr-3 py-3 border-[3px] ' + classes}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {icon ? (
            <CustomIcon
              className={'mr-2'}
              color={error ? 'var(--main-error)' : 'var(--text-gray)'}
              name={icon}
            />
          ) : null}
          <input
            value={value}
            placeholder={placeholder}
            onInput={handleInput}
            onChange={handleChange}
            type={currentInputType}
            name={type}
            autoComplete={type}
            className={
              `w-full pl-3 ${icon ? `border-l-2 rounded-none ${error ? '!border-error' : '!border-gray'}` : ''} text-black text-base focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 ${inputError} ` +
              classes
            }
          />
          {type === 'password' ? (
            <CustomIcon
              className={'ml-1 cursor-pointer'}
              color={'var(--text-gray)'}
              name={currentInputType === 'password' ? 'eye-closed' : 'eye-opened'}
              onClick={handleSetType}
            />
          ) : null}
        </div>
        {error && errorsList?.length && showTooltip && (
          <div
            className={
              'absolute left-4 top-14 mt-1 bg-white text-red-600 shadow-lg rounded text-sm w-max max-w-48 p-2 z-10'
            }
          >
            <div className={'absolute -top-1 left-3 w-3 h-3 bg-white transform rotate-45'} />
            {errorsList.map((error, index) => (
              <div
                key={index}
                className={'flex items-center gap-2'}
              >
                <span className={'text-xs'}>{error}</span>
              </div>
            ))}
          </div>
        )}
      </Field>
    </div>
  );
};

export default CustomInput;
