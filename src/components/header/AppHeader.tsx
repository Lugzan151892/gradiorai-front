'use client';

import React, { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';
import HeaderUserState from '@/components/header/components/HeaderUserState';
import Image from 'next/image';
import logoTransparentFull from '@/assets/icons/gradior_transparent_full.png';
import CustomIcon from '@/components/ui/icon/CustomIcon';
import IconMarkup from '@/components/ui/icon/utils/IconMarkup';
import { cn } from '@/lib/utils';

interface ILinkItem {
  id: string;
  text: string;
  href?: string;
  onClick?: () => void;
  submenu?: {
    subTitle: string;
    links: Array<{
      id: number;
      text: string;
      description: string;
      href: string;
      icon: keyof typeof IconMarkup;
    }>;
  };
}

const AppHeader: React.FC<Readonly<{ scrollRef?: React.RefObject<HTMLDivElement | null>; withState?: boolean }>> = ({
  scrollRef,
  withState,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLinkId, setHoveredLinkId] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelHoverTimeout = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const delayedSetHoveredId = (id: string | null) => {
    cancelHoverTimeout();
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredLinkId(id);
      hoverTimeoutRef.current = null;
    }, 300);
  };

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

  const links: ILinkItem[] = [
    {
      id: 'ABOUT',
      text: 'О НАС',
      onClick: () => {
        const el = document.getElementById('faq');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'INSTRUMENTS',
      text: 'ИНСТРУМЕНТЫ',
      submenu: {
        subTitle: 'Инструменты',
        links: [
          {
            id: 1,
            text: 'СОБЕСЕДОВАНИЕ',
            description: 'Пройти собеседование с AI',
            href: '/interview',
            icon: 'settings-new',
          },
          {
            id: 2,
            text: 'ТЕСТИРОВАНИЕ',
            description: 'Пройти тестирование с AI',
            href: '/tests',
            icon: 'settings-new',
          },
          {
            id: 3,
            text: 'ПРОВЕРКА РЕЗЮМЕ',
            description: 'Проверить резюме с AI',
            href: '/interview/resume-check',
            icon: 'settings-new',
          },
          {
            id: 4,
            text: 'СОЗДАНИЕ РЕЗЮМЕ',
            description: 'Создать резюме с AI',
            href: '/interview/resume-create',
            icon: 'settings-new',
          },
        ],
      },
    },
    {
      id: 'FAQ',
      text: 'FAQ',
      onClick: () => {
        const el = document.getElementById('faq');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
    },
  ];

  return (
    <div
      className={clsx(
        'flex fixed top-0 left-0 right-0 z-10 h-[112px] shadow-indigo-900 lg:px-60 px-4 bg-main-dark items-center transition-shadow transition-colors duration-300',
        withState ? 'justify-between' : 'justify-center',
        scrolled && 'shadow-xl bg-main-dark'
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
        <div
          className={clsx(
            'absolute top-[33px] left-[50%] transform-[translate(-50%,0)] p-2 xl:flex hidden gap-2 rounded-3xl border-1 border-main-gray bg-main-dark'
          )}
          onMouseLeave={() => delayedSetHoveredId(null)}
        >
          {links.map((el) => (
            <div
              key={el.id}
              className={'relative'}
              onMouseEnter={() => {
                cancelHoverTimeout();
                setHoveredLinkId(el.submenu ? el.id : null);
              }}
            >
              <div
                className={clsx(
                  'px-4 py-1 cursor-pointer rounded-3xl transition-colors duration-150 hover:[background:var(--main-gray)] hover:[box-shadow:inset_0_0_0_1px_hsla(0,0%,100%,0.04)]'
                )}
                onClick={() => {
                  if (el.onClick) el.onClick();
                  else if (el.href) router.push(el.href);
                }}
              >
                <div className={'font-medium text-sm'}>{el.text}</div>
              </div>
              {el.submenu && hoveredLinkId === el.id && (
                <div
                  className={
                    'absolute top-full mt-4 left-[50%] transform-[translate(-50%,0)] gap-2 rounded-3xl bg-main-dark border-1 border-main-gray shadow-lg z-20 p-2 flex flex-col justify-center gap-3 p-4'
                  }
                  onMouseEnter={() => {
                    cancelHoverTimeout();
                    setHoveredLinkId(el.id);
                  }}
                  onMouseLeave={() => delayedSetHoveredId(null)}
                >
                  <div className={'text-text-disabled pl-2'}>{el.submenu.subTitle}</div>
                  {el.submenu.links.map((sub) => (
                    <div
                      key={sub.id}
                      className={cn(
                        'group cursor-pointer rounded-2xl transition-colors duration-150 hover:[background:var(--main-gray)] hover:[box-shadow:inset_0_0_0_1px_hsla(0,0%,100%,0.04)] text-nowrap',
                        'flex items-center gap-2 p-2'
                      )}
                      onClick={() => router.push(sub.href)}
                    >
                      <div
                        className={
                          'p-2 transition-colors duration-300 bg-transparent group-hover:[background-image:var(--main-gradient)] border-1 border-main-gray rounded-3xl'
                        }
                      >
                        <CustomIcon
                          size={16}
                          name={sub.icon}
                        />
                      </div>
                      <div className={'flex flex-col gap-1'}>
                        <div>{sub.text}</div>
                        <div className={'text-text-disabled text-xs'}>{sub.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {withState && <HeaderUserState />}
    </div>
  );
};

export default AppHeader;
