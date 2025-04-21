'use client';

import CustomIcon from '@/components/ui/icon/CustomIcon';
import React from 'react';

interface ISettingsBlockProps {
  children: React.ReactNode;
  captionAfter?: React.ReactNode;
  icon?: 'search-book' | 'monitor' | 'hat' | 'rocket';
  className?: string;
  title?: string;
  description?: string;
}

const SettingsBlock: React.FC<Readonly<ISettingsBlockProps>> = ({
  children,
  icon,
  title,
  description,
  className,
  captionAfter,
}) => {
  return (
    <div className={'w-full h-full bg-bg-transparent-25 rounded-10 flex py-6 px-10 ' + className}>
      <div className={'mobile:hidden w-20 h-full mr-20'}>
        {icon && (
          <CustomIcon
            name={icon}
            size={82}
            color={'var(--main-white)'}
          />
        )}
      </div>
      <div className={'flex flex-col mobile:w-full'}>
        <div className={'flex'}>
          <div className={'desktop:hidden w-20 h-full mr-4'}>
            {icon && (
              <CustomIcon
                name={icon}
                size={40}
                color={'var(--main-white)'}
              />
            )}
          </div>
          <div className={'flex flex-col'}>
            <div className={'flex items-center'}>
              {title && <div className={'desktop:text-3xl mobile:text-2xl'}>{title}</div>}
              {captionAfter && <div className={'ml-2'}>{captionAfter}</div>}
            </div>

            {description && <div className={'desktop:text-xl mobile:text-xs mt-2'}>{description}</div>}
          </div>
        </div>
        <div className={'w-full mobile:mx-auto'}>{children}</div>
      </div>
    </div>
  );
};

export default SettingsBlock;
