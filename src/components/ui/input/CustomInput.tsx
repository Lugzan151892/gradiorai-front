'use client';

import { Field, Input, Label } from '@headlessui/react';
import React from 'react';
import CustomIcon from '@/components/ui/icon/CustomIcon';

interface ICustomInputProps {
  label?: string;
  placeholder?: string;
  value?: string | number;
  error?: string;
  validation?: boolean;
  className?: string;
  onInput?: (val: string) => void;
  onChange?: (val: string) => void;
}

const CustomInput: React.FC<ICustomInputProps> = ({
  label,
  placeholder,
  value = '',
  error,
  validation,
  className,
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
    <div className={'w-full ' + (className || '')}>
      <Field>
        {label ? <Label className={'text-xl mb-1 text-black text-nowrap'}>{label}</Label> : null}
        <div className={'flex bg-white w-full rounded-lg py-1.5 px-3 text-black border-2 ' + classes}>
          <CustomIcon name={'password'} />
          <Input
            value={value}
            placeholder={placeholder}
            onInput={handleInput}
            onChange={handleChange}
            className={
              'w-full pl-3 border-l-2 text-sm/6 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 ' +
              classes
            }
          />
        </div>
        {validation ? <div className={'text-error text-xs h-5 pt-1' + errorTextClasses}>{error}</div> : ''}
      </Field>
    </div>
  );
};

export default CustomInput;
