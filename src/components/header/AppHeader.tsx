'use client';

import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';
import HeaderUserState from '@/components/header/components/HeaderUserState';
import Image from 'next/image';
import logoTransparentFull from '@/assets/icons/gradior_transparent_full.png';

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
    {
      id: 4,
      text: 'СОЗДАНИЕ РЕЗЮМЕ',
      href: '/interview/resume-create',
    },
    {
      id: 4,
      text: 'FAQ',
      href: '/interview/resume-create',
      onClick: () => {
        const el = document.getElementById('faq');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
    },
  ];

  return (
    <div
      className={clsx(
        'flex fixed top-0 left-0 right-0 z-10 h-[112px] bg-bg-header shadow-indigo-900 lg:px-60 px-4 items-center transition-shadow duration-300',
        withState ? 'justify-between' : 'justify-center',
        scrolled && 'shadow-xl'
      )}
    >
      <div className={'flex items-center'}>
        <Image
          src={logoTransparentFull}
          alt={'gradiorai'}
          width={32}
          height={32}
        />
        <div
          className={'ml-2 cursor-pointer text-white lg:text-2xl text-base'}
          onClick={() => router.push('/')}
        >
          gradiorAI
        </div>
      </div>
      {withState && (
        <div className={'p-2 xl:flex hidden gap-2 rounded-3xl bg-main-dark border-1 border-main-gray'}>
          {links.map((el) => (
            <div
              className={
                'px-4 py-1 cursor-pointer rounded-3xl transition-colors duration-150 hover:[background:var(--main-gray)] hover:[box-shadow:inset_0_0_0_1px_hsla(0,0%,100%,0.04)]'
              }
              key={el.id}
              onClick={() => {
                if (el.onClick) el.onClick();
                else router.push(el.href);
              }}
            >
              <div className={'font-medium text-sm'}>{el.text}</div>
            </div>
          ))}
        </div>
      )}
      {withState && <HeaderUserState />}
    </div>
  );
};

export default AppHeader;
