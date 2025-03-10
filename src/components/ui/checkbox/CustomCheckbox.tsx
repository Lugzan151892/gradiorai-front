import { Checkbox } from '@headlessui/react';
import React from 'react';

interface ICustomInputProps {
  onChange?: (val: boolean) => void;
  value?: boolean;
}

const CustomCheckbox: React.FC<ICustomInputProps> = ({
  value = false,
  onChange,
}) => {
  return (
    <Checkbox
      checked={value}
      onChange={onChange}
      className={
        'group size-6 rounded-md bg-white p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white cursor-pointer'
      }
    >
      <svg
        className={
          'stroke-main-blue opacity-0 group-data-[checked]:opacity-100'
        }
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
  );
};

export default CustomCheckbox;
