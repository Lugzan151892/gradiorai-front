'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './SelectComponent';
import React from 'react';

interface IUISelectProps {
  options: Array<{ id: string | number; text: string; item?: React.ReactNode }>;
  optionType?: 'string' | 'number';
  id?: string;
  value?: string | number;
  placeholder?: string;
  onChange?: (val: string | number) => void;
}

const UISelect: React.FC<Readonly<IUISelectProps>> = ({
  options,
  optionType = 'string',
  value,
  placeholder,
  onChange,
}) => {
  const handleChange = (val: string) => {
    const parsed = isNaN(Number(val)) ? val : Number(val);
    onChange?.(optionType === 'number' ? parsed : val);
  };

  return (
    <Select
      value={value ? String(value) : undefined}
      onValueChange={handleChange}
    >
      <SelectTrigger className={'w-[180px]'}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.id}
            value={String(option.id)}
          >
            {option.item || option.text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UISelect;
