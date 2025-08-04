import { cn } from '@/lib/utils';
import React from 'react';
import type iconMarkup from '@/components/ui/icon/utils/IconMarkup';
import CustomIcon from '../icon/CustomIcon';

interface ICustomButtonProps {
  text?: string;
  className?: string;
  type?: 'default' | 'transparent';
  children?: Readonly<React.ReactNode>;
  iconAfter?: keyof typeof iconMarkup;
  iconBefore?: keyof typeof iconMarkup;
  onClick?: () => void;
  disabled?: boolean;
}

const UIButton: React.FC<ICustomButtonProps> = ({
  text,
  className,
  children,
  onClick,
  disabled,
  iconAfter,
  iconBefore,
  type = 'default',
}) => {
  const disabledClass = disabled ? 'pointer-events-none text-text-disabled' : 'cursor-pointer text-text-black';
  const typeClasses =
    type === 'default'
      ? 'bg-main-white font-medium px-6 text-sm/[22px]'
      : 'text-xs bg-transparent text-text-disabled border-1 border-main-gray';

  return (
    <button
      className={cn(
        'rounded-4xl py-2 px-3 hover:[box-shadow:inset_0_4px_4px_rgba(0,0,0,0.25)]',
        className,
        disabledClass,
        typeClasses
      )}
      onClick={onClick}
    >
      <div className={'flex items-center justify-center'}>
        {iconBefore && (
          <CustomIcon
            className={'mr-2'}
            color={disabled ? 'var(--text-disabled)' : 'var(--main-white)'}
            name={iconBefore}
          />
        )}
        <span className={'truncate overflow-hidden whitespace-nowrap flex-1'}>{children || text}</span>
        {iconAfter && (
          <CustomIcon
            className={'ml-3'}
            color={disabled ? 'var(--text-disabled)' : 'var(--main-black)'}
            name={iconAfter}
          />
        )}
      </div>
    </button>
  );
};

export default UIButton;
