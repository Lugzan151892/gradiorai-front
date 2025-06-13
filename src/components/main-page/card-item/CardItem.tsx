import Image from 'next/image';
import React from 'react';
import hut from './assets/hut.svg';
import analize from './assets/analize.svg';
import education from './assets/education.svg';
import list from './assets/list.svg';

const CardItem: React.FC<
  Readonly<{
    title: string;
    description: string;
    additional: string;
    icon: 'hut' | 'analize' | 'education' | 'list';
  }>
> = ({ title, description, additional, icon }) => {
  const getIcon = () => {
    switch (icon) {
      case 'hut':
        return hut;
      case 'analize':
        return analize;
      case 'education':
        return education;
      case 'list':
        return list;
      default:
        return hut;
    }
  };
  return (
    <div className={'p-6 flex flex-col gap-4 w-[342px] border-1 border-main-gray rounded-3xl'}>
      <div className={'flex w-full gap-2 mb-4 items-center'}>
        <Image
          src={getIcon()}
          height={50}
          width={50}
          alt={'hut'}
        />
        <div className={'text-xl text-main-purple font-semibold'}>{title}</div>
      </div>
      <div>{description}</div>
      <div className={'w-full border-1 border-text-disabled'} />
      <div>{additional}</div>
    </div>
  );
};

export default CardItem;
