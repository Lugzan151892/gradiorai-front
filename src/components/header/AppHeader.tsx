'use client';

import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';
import HeaderUserState from '@/components/header/components/HeaderUserState';
import CustomIcon from '@/components/ui/icon/CustomIcon';

const AppHeader: React.FC<Readonly<{ scrollRef?: React.RefObject<HTMLDivElement | null>; withState?: boolean }>> = ({
  scrollRef,
  withState,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const scrollEl = scrollRef?.current;
    if (!scrollEl) return;
    const onScroll = () => {
      setScrolled(scrollEl.scrollTop > 10);
    };

    scrollEl.addEventListener('scroll', onScroll);
    return () => scrollEl.removeEventListener('scroll', onScroll);
  }, [scrollRef]);

  const router = useRouter();

  return (
    <div
      className={clsx(
        'flex fixed top-0 left-0 right-0 z-50 h-[112px] bg-bg-header shadow-indigo-900 lg:px-60 px-4 items-center transition-shadow duration-300',
        withState ? 'justify-between' : 'justify-center',
        scrolled && 'shadow-xl'
      )}
    >
      <div className={'flex'}>
        <CustomIcon
          name={'owl'}
          size={24}
          color={'var(--low-green)'}
        />
        <div
          className={'ml-2 cursor-pointer text-white text-base'}
          onClick={() => router.push('/')}
        >
          gradiorAI
        </div>
      </div>
      {withState ? <HeaderUserState /> : null}
    </div>
  );
};

export default AppHeader;
