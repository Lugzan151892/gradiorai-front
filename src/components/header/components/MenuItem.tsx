import CustomIcon from '@/components/ui/icon/CustomIcon';
import IconMarkup from '@/components/ui/icon/utils/IconMarkup';
import React from 'react';
import { cn } from '@/lib/utils';
import UserAvatar from '@/components/user-avatar/UserAvatar';

export interface IMenuItemProps {
  icon: keyof typeof IconMarkup;
  text: string;
  isLink?: boolean;
  isStatic?: boolean;
  color?: string;
  className?: string;
  onClick?: () => void;
}

const MenuItem: React.FC<Readonly<IMenuItemProps>> = ({ icon, text, className, isStatic, color, onClick, isLink }) => {
  return (
    <div
      className={cn(
        'group flex items-center p-2 rounded',
        !isStatic && 'hover:bg-main-gray cursor-pointer',
        isLink && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {icon === 'user' ? (
        <UserAvatar size={40} />
      ) : (
        <CustomIcon
          name={icon}
          color={color || 'var(--main-white)'}
          size={24}
        />
      )}
      <div className={cn('ml-3 text-base', isStatic && 'font-bold', isLink && 'group-hover:underline')}>{text}</div>
    </div>
  );
};

export default MenuItem;
