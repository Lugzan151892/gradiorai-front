import React from 'react';
import Image from 'next/image';
import arm from '../assets/arm.png';
import world from '../assets/world.png';
import romb from '../assets/romb.png';
import question from '../assets/question.png';
import { cn } from '@/lib/utils';

const CardWithImage: React.FC<
  Readonly<{ title: string; text: string; image: 'arm' | 'world' | 'romb' | 'question'; className?: string }>
> = ({ title, text, image, className }) => {
  const getImage = () => {
    switch (image) {
      case 'arm':
        return arm;
      case 'world':
        return world;
      case 'romb':
        return romb;
      case 'question':
        return question;
    }
  };
  return (
    <div className={cn('flex gap-4 border-1 border-main-gray rounded-3xl', className)}>
      <div className={'max-w-[476px] my-6 ml-6'}>
        <div className={'text-xl font-semibold'}>{title}</div>
        <div className={'text-lg leading-[24px] mt-4'}>{text}</div>
      </div>
      <Image
        src={getImage()}
        alt={image}
        width={203}
        height={186}
      />
    </div>
  );
};

export default CardWithImage;
