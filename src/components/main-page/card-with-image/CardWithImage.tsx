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

  const imageStyles = () => {
    switch (image) {
      case 'arm':
        return {
          transform: 'rotate(-37.86deg)',
          transformOrigin: 'center',
        };
      default:
        return undefined;
    }
  };

  const imageSizes = () => {
    switch (image) {
      case 'arm':
        return {
          height: 186,
          width: 203,
        };
      case 'world':
        return {
          height: 186,
          width: 203,
        };
      case 'romb':
        return {
          height: 186,
          width: 203,
        };
      case 'question':
        return {
          height: 135,
          width: 90,
        };
    }
  };

  return (
    <div
      className={cn(
        'flex gap-4 justify-between border-1 border-main-gray rounded-3xl overflow-hidden max-h-[158px] relative',
        className
      )}
    >
      <div className={'max-w-[476px] my-6 ml-6'}>
        <div className={'text-xl font-semibold'}>{title}</div>
        <div className={'text-lg leading-[24px] mt-4'}>{text}</div>
      </div>
      <Image
        className={'absolute right-0 top-1/2 -translate-y-1/2'}
        src={getImage()}
        alt={image}
        width={imageSizes().width}
        height={imageSizes().height}
        style={{
          ...imageStyles(),
          objectFit: 'contain',
        }}
      />
    </div>
  );
};

export default CardWithImage;
