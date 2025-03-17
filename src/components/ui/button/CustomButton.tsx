import { Button } from '@headlessui/react';
import React from 'react';
import CustomIcon from '@/components/ui/icon/CustomIcon';

interface ICustomButtonProps {
  text?: string;
  className?: string;
  children?: Readonly<React.ReactNode>;
  type?: 'success' | 'error' | 'warning' | 'forward' | 'back';
  level?: 1 | 2 | 3;
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
}) => {
  const disabledClass = disabled ? 'pointer-events-none opacity-40 !bg-gray-second' : '';
  const selectedClass = selected ? 'border-success' : 'border-transparent';
  const sizeClasses = small ? 'px-2 py-1' : `px-4 py-2 ${fullWidth ? 'w-full' : ''} text-2xl`;
  const getTypeClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-success text-white';
      case 'error':
        return 'bg-error text-white';
      case 'warning':
        return 'bg-warning text-white';
      case 'forward':
        return 'bg-main-blue text-white';
      case 'back':
        return 'bg-main-blue text-white';
      default:
        return 'bg-main-blue text-white';
    }
  };

  return (
    <Button
      className={`${sizeClasses} ${(maxRounded && 'rounded-xl') || 'rounded-lg'} ${disabledClass} ${getTypeClasses()} ${className || ''} ${selectedClass} border-2`}
      onClick={onClick}
    >
      {type === 'back' || type === 'forward' ? (
        <div className={'w-10 h-10 flex items-center justify-center bg-white rounded-full'}>
          <div className={'text-main-blue text-3xl font-bold h-max'}>
            {type === 'back' ? (
              <CustomIcon
                name={'arrow-left'}
                color={disabled ? 'var(--second-gray)' : 'var(--main-blue)'}
              />
            ) : (
              <CustomIcon
                name={'arrow-right'}
                color={disabled ? 'var(--second-gray)' : 'var(--main-blue)'}
              />
            )}
          </div>
        </div>
      ) : (
        children || text
      )}
    </Button>
  );
};

export default CustomButton;
