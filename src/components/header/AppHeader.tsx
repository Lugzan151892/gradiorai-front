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

  const links = [
    {
      id: 1,
      text: 'СОБЕСЕДОВАНИЕ',
      href: '/interview',
    },
    {
      id: 2,
      text: 'ТЕСТИРОВАНИЕ',
      href: '/tests',
    },
    {
      id: 3,
      text: 'ПРОВЕРКА РЕЗЮМЕ',
      href: '/interview/resume-check',
    },
  ];

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
          color={'var(--color-text-disabled)'}
        />
        <div
          className={'ml-2 cursor-pointer text-white lg:text-2xl text-base'}
          onClick={() => router.push('/')}
        >
          gradiorAI
        </div>
      </div>
      <div className={'px-6 py-2 xl:flex hidden gap-8 rounded-3xl bg-main-dark'}>
        {links.map((el) => (
          <div
            className={'text-sm font-medium cursor-pointer hover:underline hover:text-main-purple'}
            key={el.id}
            onClick={() => router.push(el.href)}
          >
            {el.text}
          </div>
        ))}
      </div>
      {withState ? <HeaderUserState /> : null}
    </div>
  );
};

export default AppHeader;
