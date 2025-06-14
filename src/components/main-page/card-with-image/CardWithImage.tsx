import React from 'react';
import Image from 'next/image';
import arm from '@/components/main-page/assets/arm.png';
import world from '@/components/main-page/assets/world.png';
import romb from '@/components/main-page/assets/romb.png';
import question from '@/components/main-page/assets/question.png';
import { cn } from '@/lib/utils';
import { useBreakpoint } from '@/hooks/useBreakpoints';

const CardWithImage: React.FC<
  Readonly<{ title: string; text: string; image: 'arm' | 'world' | 'romb' | 'question'; className?: string }>
> = ({ title, text, image, className }) => {
  const { isMobile } = useBreakpoint();

  const getImageStats = () => {
    switch (image) {
      case 'arm': {
        return {
          image: arm,
          style: {
            transform: 'rotate(-37.86deg)',
            transformOrigin: 'center',
          },
          height: isMobile ? 104 : 186,
          width: isMobile ? 114 : 203,
          className: 'absolute lg:right-0 -right-5 lg:top-1/2 top-15 -translate-y-1/2',
        };
      }
      case 'world': {
        return {
          image: world,
          height: isMobile ? 150 : 186,
          width: isMobile ? 150 : 203,
          className: 'absolute lg:right-0 -right-5 bottom-0',
        };
      }
      case 'romb': {
        return {
          image: romb,
          height: 186,
          width: 203,
          className: 'absolute right-0 top-1/2 -translate-y-1/2',
        };
      }
      case 'question': {
        return {
          image: question,
          style: isMobile
            ? {
                transform: 'rotate(15deg)',
                transformOrigin: 'center',
              }
            : undefined,
          height: isMobile ? 103 : 135,
          width: isMobile ? 69 : 90,
          className: 'absolute right-2 top-1/2 -translate-y-1/2',
        };
      }
    }
  };

  return (
    <div
      className={cn(
        'flex gap-4 justify-between border-1 border-main-gray rounded-3xl overflow-hidden lg:max-h-[158px] relative',
        className
      )}
    >
      <div className={'lg:max-w-[476px] max-w-[80%] my-6 ml-6'}>
        <div className={'lg:text-xl text-base font-semibold'}>{title}</div>
        <div className={'lg:text-lg text-sm leading-[24px] mt-4'}>{text}</div>
      </div>
      <Image
        className={getImageStats().className}
        src={getImageStats().image}
        alt={image}
        width={getImageStats().width}
        height={getImageStats().height}
        style={{
          ...getImageStats().style,
          objectFit: 'contain',
        }}
      />
    </div>
  );
};

export default CardWithImage;
