import React from 'react';
import IconMarkup from '@/components/ui/icon/utils/IconMarkup';
import CustomIcon from '@/components/ui/icon/CustomIcon';

const CardItem: React.FC<
  Readonly<{
    title: string;
    description: string;
    additional: string;
    icon: keyof typeof IconMarkup;
  }>
> = ({ title, description, additional, icon }) => {
  return (
    <div className={'p-6 flex flex-col gap-4 w-full lg:max-w-[342px] border-1 border-main-gray rounded-3xl'}>
      <div className={'flex w-full gap-2 mb-4 items-center'}>
        <CustomIcon
          name={icon}
          size={50}
          color={'var(--color-main-purple)'}
        />
        <div className={'text-xl text-main-purple font-semibold'}>{title}</div>
      </div>
      <div className={'text-lg leading-6'}>{description}</div>
      <div className={'w-full border-1 border-text-disabled'} />
      <div className={'text-sm font-light italic text-text-disabled'}>{additional}</div>
    </div>
  );
};

export default CardItem;
