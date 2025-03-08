import { Button } from '@headlessui/react';
import React, { ReactNode } from 'react';

interface ICustomButtonProps {
  text?: string;
  className?: string;
  children?: ReactNode;
  type?: 'success' | 'error' | 'warning';
  level?: 1 | 2 | 3;
  onClick?: () => void;
  disabled?: boolean;
  maxRounded?: boolean;
  selected?: boolean;
  color?: 'blue' | 'red' | 'green';
  small?: boolean;
  fullWidth?: boolean;
}

const CustomButton: React.FC<ICustomButtonProps> = ({
  text,
  className,
  children,
  type = 'success',
  onClick,
  disabled,
  maxRounded = false,
  selected,
  color,
  small,
  fullWidth,
}) => {
  const disabledClass = disabled ? 'pointer-events-none opacity-40' : '';
  const selectedClass = selected ? 'border-white' : 'border-transparent';
  const sizeClasses = small
    ? 'px-2 py-1'
    : `px-4 py-2 ${fullWidth ? 'w-full' : ''}`;
  const getColor = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-secondary';
      case 'red':
        return 'bg-red';
      case 'green':
        return 'bg-green';
      default:
        return 'bg-blue-secondary';
    }
  };
  const classes =
    type === 'success' ? `${getColor()} text-white` : 'bg-error text-white';

  return (
    <Button
      className={`${sizeClasses} ${(maxRounded && 'rounded-xl') || 'rounded-lg'} ${classes} ${className || ''} ${disabledClass} ${selectedClass} border-2`}
      onClick={onClick}
    >
      {children || text}
    </Button>
  );
};

export default CustomButton;
