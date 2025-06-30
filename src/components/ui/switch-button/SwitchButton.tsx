'use client';

import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';
import UILabel from '@/components/ui/label/UILabel';

interface ISwitchProps {
  label?: string;
  className?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const SwitchButton: React.FC<Readonly<ISwitchProps>> = ({ className, label, disabled, onChange, ...props }) => {
  return (
    <div className={cn('flex items-center', className)}>
      {label && (
        <UILabel
          className={'mr-6'}
          disabled={disabled}
        >
          {label}
        </UILabel>
      )}
      <SwitchPrimitive.Root
        data-slot={'switch'}
        className={cn(
          'peer cursor-pointer data-[state=checked]:bg-main-purple data-[state=unchecked]:bg-main-gray focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-7 w-13 px-[2px] shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50'
        )}
        onCheckedChange={onChange}
        {...props}
      >
        <SwitchPrimitive.Thumb
          data-slot={'switch-thumb'}
          className={cn(
            'data-[state=unchecked]:bg-text-disabled data-[state=checked]:bg-main-white pointer-events-none block size-6 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0'
          )}
        />
      </SwitchPrimitive.Root>
    </div>
  );
};

export default SwitchButton;
