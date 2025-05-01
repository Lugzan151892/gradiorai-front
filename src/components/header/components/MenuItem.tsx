import CustomIcon from '@/components/ui/icon/CustomIcon';
import IconMarkup from '@/components/ui/icon/utils/IconMarkup';
import React from 'react';

export interface IMenuItemProps {
  icon: keyof typeof IconMarkup;
  text: string;
  isStatic?: boolean;
  className?: string;
  onClick?: () => void;
}

const MenuItem: React.FC<Readonly<IMenuItemProps>> = ({ icon, text, className, isStatic, onClick }) => {
  return (
    <div
      className={`flex items-center ${isStatic ? '' : 'hover:bg-hover-gray cursor-pointer'} p-2 rounded ` + className}
      onClick={onClick}
    >
      <CustomIcon
        name={icon}
        color={'var(--main-white)'}
        size={30}
      />
      <div className={'ml-3'}>{text}</div>
    </div>
  );
};

export default MenuItem;
