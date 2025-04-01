'use client';

import CustomIcon from '@/components/ui/icon/CustomIcon';
import React from 'react';

interface ISettingsBlockProps {
  children: React.ReactNode;
  icon?: 'search-book' | 'monitor' | 'hut' | 'rocket';
  title?: string;
  description?: string;
}

const SettingsBlock: React.FC<Readonly<ISettingsBlockProps>> = ({ children, icon, title, description }) => {
  return (
    <div className={'w-full h-full bg-bg-transparent-25 rounded-10 flex py-6 px-10'}>
      <div className={'w-20 h-full mr-20'}>
        {icon && (
          <CustomIcon
            name={icon}
            size={82}
            color={'var(--main-white)'}
          />
        )}
      </div>
      <div className={'flex flex-col'}>
        {title && <div className={'text-4xl'}>{title}</div>}
        {description && <div className={'text-xl mt-2'}>{description}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default SettingsBlock;
