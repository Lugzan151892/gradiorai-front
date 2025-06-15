'use client';

import React from 'react';
import { Checkbox } from '@headlessui/react';

interface ICustomInputProps {
  onChange?: () => void;
  caption?: string;
  className?: string;
  children?: React.ReactNode;
  selected?: boolean;
}

const CustomCheckbox: React.FC<ICustomInputProps> = ({ selected, caption, className, children, onChange }) => {
  const selectedClasses = selected ? '' : 'hover:border-low-green';
  return (
    <div
      className={className}
      onClick={onChange}
    >
      <Checkbox
        checked={selected}
        className={
          'border border-white group shrink-0 cursor-pointer h-5 w-5 flex items-center justify-center ' +
          selectedClasses
        }
      >
        <svg
          className={'stroke-white opacity-0 group-data-checked:opacity-100 h-4 w-4'}
          viewBox={'0 0 14 14'}
          fill={'none'}
        >
          <path
            d={'M3 8L6 11L11 3.5'}
            strokeWidth={2}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
          />
        </svg>
      </Checkbox>
      {caption && !children && <div>{caption}</div>}
    </div>
  );
};

export default CustomCheckbox;
