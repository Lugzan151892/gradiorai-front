'use client';

import { Field, Input, Label } from '@headlessui/react';
import React, { useState } from 'react';
import CustomIcon from '@/components/ui/icon/CustomIcon';

interface ICustomInputProps {
  label?: string;
  placeholder?: string;
  value?: string | number;
  error?: string[] | string;
  icon?: 'password' | 'email';
  type?: 'text' | 'password';
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
  error,
  className,
  onInput,
  onChange,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentInputType, setCurrentInputType] = useState<'text' | 'password'>(type);
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

  const errorsList = Array.isArray(error) ? error : [error];
  const classes = error && errorsList?.length ? 'border-error' : 'border-gray';
  return (
    <div className={'w-full ' + (className || '')}>
      <Field
        className={'relative'}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {label ? <Label className={'text-xl mb-1 text-black text-nowrap'}>{label}</Label> : null}
        <div
          className={'flex bg-white w-full rounded-input pl-5 pr-3 py-3 text-black border-2 ' + classes}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {icon ? (
            <CustomIcon
              className={'mr-2'}
              color={'var(--text-gray)'}
              name={icon}
            />
          ) : null}
          <Input
            value={value}
            placeholder={placeholder}
            onInput={handleInput}
            onChange={handleChange}
            type={currentInputType}
            className={
              `w-full pl-3 ${icon ? 'border-l-2' : ''} text-base focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 ` +
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
          <div className={'absolute left-4 top-14 mt-1 bg-white text-red-600 shadow-lg rounded text-sm w-64 p-2 z-10'}>
            <div className={'absolute -top-2 left-3 w-3 h-3 bg-white transform rotate-45'} />
            {errorsList.map((error, index) => (
              <div
                key={index}
                className={'flex items-center gap-2'}
              >
                <CustomIcon
                  name={'warning'}
                  size={15}
                />
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
