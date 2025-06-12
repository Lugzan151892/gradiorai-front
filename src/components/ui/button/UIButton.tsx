import { cn } from '@/lib/utils';
import React from 'react';

interface ICustomButtonProps {
  text?: string;
  className?: string;
  children?: Readonly<React.ReactNode>;
  onClick?: () => void;
  disabled?: boolean;
}

const UIButton: React.FC<ICustomButtonProps> = ({ text, className, children, onClick, disabled }) => {
  const disabledClass = disabled ? 'pointer-events-none text-text-disabled' : 'cursor-pointer text-text-black';

  return (
    <button
      className={cn(
        'bg-main-white rounded-4xl font-medium px-6 text-sm/[22px] py-2 hover:[box-shadow:inset_0_4px_4px_rgba(0,0,0,0.25)]',
        className,
        disabledClass
      )}
      onClick={onClick}
    >
      {children || text}
    </button>
  );
};

export default UIButton;
