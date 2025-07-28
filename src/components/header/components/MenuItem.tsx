import CustomIcon from '@/components/ui/icon/CustomIcon';
import IconMarkup from '@/components/ui/icon/utils/IconMarkup';
import React from 'react';
import Image from 'next/image';
import userAvatarEmpty from '@/assets/icons/user-avatar-empty.svg';
import { cn } from '@/lib/utils';

export interface IMenuItemProps {
  icon: keyof typeof IconMarkup;
  text: string;
  isStatic?: boolean;
  color?: string;
  className?: string;
  onClick?: () => void;
}

const MenuItem: React.FC<Readonly<IMenuItemProps>> = ({ icon, text, className, isStatic, color, onClick }) => {
  return (
    <div
      className={cn('flex items-center p-2 rounded', !isStatic && 'hover:bg-main-gray cursor-pointer', className)}
      onClick={onClick}
    >
      {icon === 'user' ? (
        <Image
          src={userAvatarEmpty}
          alt={'profile'}
          width={40}
          height={40}
        />
      ) : (
        <CustomIcon
          name={icon}
          color={color || 'var(--main-white)'}
          size={24}
        />
      )}
      <div className={cn('ml-3 text-lg', isStatic && 'font-bold')}>{text}</div>
    </div>
  );
};

export default MenuItem;
