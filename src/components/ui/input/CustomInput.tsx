'use client';

import { Field, Input, Label } from '@headlessui/react';
import React from 'react';
import Image from 'next/image';
import password from '@/assets/icons/password.svg';

interface ICustomInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  validation?: boolean;
  onInput?: (val: string) => void;
  onChange?: (val: string) => void;
}

const CustomInput: React.FC<ICustomInputProps> = ({
  label,
  placeholder,
  value = '',
  error,
  validation,
  onInput,
  onChange,
}) => {
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
  const classes = error && validation ? 'border-error' : 'border-gray';
  const errorTextClasses = error && validation ? '' : 'opacity-100';
  return (
    <div className={'w-full'}>
      <Field>
        {label ? (
          <Label className={'text-sm/6 mb-3 font-medium text-black'}>
            {label}
          </Label>
        ) : null}
        <div
          className={
            'flex bg-white w-full rounded-lg py-1.5 px-3 text-black border-2 ' +
            classes
          }
        >
          <Image
            className={'mr-2'}
            src={password}
            width={20}
            height={20}
            alt={'password icon'}
          />
          <Input
            value={value}
            placeholder={placeholder}
            onInput={handleInput}
            onChange={handleChange}
            className={
              'pl-3 border-l-2 text-sm/6 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 ' +
              classes
            }
          />
        </div>
        {validation ? (
          <div className={'text-error text-xs h-5 pt-1' + errorTextClasses}>
            {error}
          </div>
        ) : (
          ''
        )}
      </Field>
    </div>
  );
};

export default CustomInput;
