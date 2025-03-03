import { Field, Input, Label } from '@headlessui/react';
import React from 'react';

interface ICustomInputProps {
  label?: string;
}

const CustomInput: React.FC<ICustomInputProps> = () => {
  return (
    <div className={'w-full max-w-md px-4'}>
      <Field>
        <Label className={'text-sm/6 font-medium text-white'}>Name</Label>
        <div
          className={
            'flex bg-white mt-3 w-full rounded-lg border-gray py-1.5 px-3 text-black '
          }
        >
          <div className={'mr-1'}>tut icon</div>
          <Input
            className={
              'border-none text-sm/6 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            }
          />
        </div>
      </Field>
    </div>
  );
};

export default CustomInput;
