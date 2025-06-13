'use client';

import * as React from 'react';
import { Root as LabelPrimitiveRoot, LabelProps } from '@radix-ui/react-label';

import { cn } from '@/lib/utils';

interface ILabelProps extends LabelProps {
  className?: string;
  error?: boolean;
  disabled?: boolean;
}

const UILabel: React.FC<ILabelProps> = ({ className, error, disabled, ...props }) => {
  return (
    <LabelPrimitiveRoot
      data-slot={'label'}
      className={cn(
        'flex items-center gap-2 text-white text-xl leading-none select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        error && 'text-error',
        disabled && 'text-main-gray',
        className
      )}
      {...props}
    />
  );
};

export default UILabel;
