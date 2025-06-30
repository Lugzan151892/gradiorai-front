import { cn } from '@/lib/utils';
import React from 'react';

const CustomInpuButton: React.FC<
  Readonly<{
    text: string;
    selected?: boolean;
    className?: string;
    onClick?: () => void;
  }>
> = ({ selected, text, onClick, className }) => {
  const selectedClasses = selected
    ? 'bg-main-purple border-main-purple'
    : 'hover:bg-main-purple hover:border-main-purple';
  return (
    <div
      className={cn('border-1 border-main-gray rounded-3xl py-1 px-4 cursor-pointer', selectedClasses, className)}
      onClick={onClick}
    >
      <div className={'text-base font-medium leading-[22px] tracking-[1px]'}>{text}</div>
    </div>
  );
};

export default CustomInpuButton;
