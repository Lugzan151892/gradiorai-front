'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './SelectComponent';
import React from 'react';

interface IUISelectProps<T = string | number> {
  options: Array<{ id: T; text: string; item?: React.ReactNode }>;
  optionType?: 'string' | 'number' | 'boolean' | 'enum';
  id?: string;
  value?: T;
  className?: string;
  placeholder?: string;
  onChange?: (val: T) => void;
}

const UISelect = <T extends string | number | boolean>({
  options,
  optionType = 'string',
  className,
  value,
  placeholder,
  onChange,
}: Readonly<IUISelectProps<T>>) => {
  const handleChange = (val: string) => {
    let parsedValue: T;

    switch (optionType) {
      case 'number':
        parsedValue = Number(val) as T;
        break;
      case 'boolean':
        parsedValue = (val === 'true') as T;
        break;
      case 'enum':
        const option = options.find((opt) => {
          const optIdStr = String(opt.id);
          const valStr = String(val);
          return optIdStr === valStr;
        });
        parsedValue = option?.id as T;
        break;
      default:
        parsedValue = val as T;
    }

    onChange?.(parsedValue);
  };

  return (
    <Select
      value={value ? String(value) : undefined}
      onValueChange={handleChange}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={String(option.id)}
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
