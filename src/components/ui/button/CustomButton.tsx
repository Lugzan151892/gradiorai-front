import { Button } from '@headlessui/react';
import React from 'react';

interface ICustomButtonProps {
  text?: string;
  className?: string;
  children?: Readonly<React.ReactNode>;
  type?: 'success' | 'error' | 'warning';
  level?: 1 | 2 | 3;
  color?: 'white' | 'gray' | 'low-green' | 'red';
  onClick?: () => void;
  disabled?: boolean;
  maxRounded?: boolean;
  selected?: boolean;
  small?: boolean;
  fullWidth?: boolean;
}

const CustomButton: React.FC<ICustomButtonProps> = ({
  text,
  className,
  children,
  type,
  onClick,
  disabled,
  maxRounded = false,
  selected,
  small,
  fullWidth,
  color,
}) => {
  const disabledClass = disabled ? 'pointer-events-none !bg-button-disabled' : '';
  const selectedClass = selected ? 'border-success' : 'border-transparent';
  const sizeClasses = small ? 'px-2 py-1 text-base' : `px-4 py-2 ${fullWidth ? 'w-full' : ''} text-2xl`;
  const getTypeClasses = () => {
    if (type) {
      switch (type) {
        case 'success':
          return 'bg-success text-white data-[hover]:bg-hard-green';
        case 'error':
          return 'bg-error text-white';
        case 'warning':
          return 'bg-warning text-white';
      }
    }

    if (color) {
      switch (color) {
        case 'white':
          return 'bg-white text-black data-[hover]:bg-gray data-[hover]:border-white';
        case 'gray':
          return 'bg-gray text-text-gray';
        case 'low-green':
          return 'bg-low-green text-white data-[hover]:bg-hover-low-green data-[hover]:border-hover-low-green';
      }
    }

    return 'bg-main-blue text-white';
  };

  return (
    <Button
      className={`${sizeClasses} ${(maxRounded && 'rounded-xl') || 'rounded-lg'} ${disabledClass} ${getTypeClasses()} ${className || ''} ${selectedClass} border-2`}
      onClick={onClick}
    >
      {children || text}
    </Button>
  );
};

export default CustomButton;
