'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderUserState from '@/components/header/components/HeaderUserState';
import Image from 'next/image';
import logoTransparentFull from '@/assets/icons/gradior_transparent_full.png';
import CustomIcon from '@/components/ui/icon/CustomIcon';
import IconMarkup from '@/components/ui/icon/utils/IconMarkup';
import { cn } from '@/lib/utils';
import { sleep } from '@/core/utils/common';
import { usePathname } from 'next/navigation';
import { Trans } from '@/i18n/Trans';
import { useRandomButton } from '@/hooks/useRandomButton';
import { RootState } from '@/store';
import { useAppSelector } from '@/hooks/redux';

interface ILinkItem {
  id: string;
  text: string | React.ReactNode;
  href?: string;
  onClick?: () => void;
  submenu?: {
    subTitle: string | React.ReactNode;
    links: Array<{
      id: number;
      text: string | React.ReactNode;
      description: string | React.ReactNode;
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
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredLinkId, setHoveredLinkId] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { user } = useAppSelector((state: RootState) => state.user);
  const { selectedButton } = useRandomButton({ user });
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
  const pathName = usePathname();

  const goHome = () => {
    const el = document.getElementById('home');
    if (el) {
      const offset = 112;
      const scrollContainer = scrollRef?.current;

      if (scrollContainer) {
        const elTop = el.getBoundingClientRect().top;
        const containerTop = scrollContainer.getBoundingClientRect().top;
        const scrollOffset = elTop - containerTop + scrollContainer.scrollTop - offset;

        scrollContainer.scrollTo({
          top: scrollOffset,
          behavior: 'smooth',
        });
      }
    }
    router.push('/');
  };

  const links: ILinkItem[] = [
    {
      id: 'HOME',
      text: (
        <Trans
          ns={'main'}
          k={'main_go_home'}
          format={'uppercase'}
        />
      ),
      onClick: goHome,
    },
    {
      id: 'ABOUT',
      text: (
        <Trans
          ns={'main'}
          k={'main_about'}
          format={'uppercase'}
        />
      ),
      onClick: async () => {
        if (pathName !== '/') {
          router.push('/');
          await sleep(300);
        }
        const el = document.getElementById('about');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'INSTRUMENTS',
      text: (
        <Trans
          ns={'common'}
          k={'common_instruments'}
          format={'uppercase'}
        />
      ),
      submenu: {
        subTitle: (
          <Trans
            ns={'common'}
            k={'common_instruments'}
          />
        ),
        links: [
          {
            id: 1,
            text: (
              <Trans
                ns={'common'}
                k={'common_interview'}
                format={'uppercase'}
              />
            ),
            description: (
              <Trans
                ns={'common'}
                k={'common_interview_description'}
              />
            ),
            href: '/interview',
            icon: 'two-users',
          },
          {
            id: 2,
            text: (
              <Trans
                ns={'common'}
                k={'common_tests'}
                format={'uppercase'}
              />
            ),
            description: (
              <Trans
                ns={'common'}
                k={'common_tests_description'}
              />
            ),
            href: '/tests',
            icon: 'to-do-list',
          },
          {
            id: 3,
            text: (
              <Trans
                ns={'common'}
                k={'common_check_cv'}
                format={'uppercase'}
              />
            ),
            description: (
              <Trans
                ns={'common'}
                k={'common_check_cv_description'}
              />
            ),
            href: '/interview/resume-check',
            icon: 'file-check',
          },
          {
            id: 4,
            text: (
              <Trans
                ns={'common'}
                k={'common_create_cv'}
                format={'uppercase'}
              />
            ),
            description: (
              <Trans
                ns={'common'}
                k={'common_create_cv_description'}
              />
            ),
            href: '/interview/resume-create',
            icon: 'file-create',
          },
        ],
      },
    },
    {
      id: 'FAQ',
      text: (
        <Trans
          ns={'common'}
          k={'common_faq'}
          format={'uppercase'}
        />
      ),
      onClick: async () => {
        if (pathName !== '/') {
          router.push('/');
          await sleep(300);
        }
        const el = document.getElementById('faq');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
    },
  ];

  return (
    <div
      className={cn(
        'flex fixed top-0 left-0 right-0 z-10 h-[112px] shadow-indigo-900 lg:px-10 px-4 items-center transition-shadow duration-300',
        withState ? 'justify-between' : 'justify-center',
        scrolled && 'shadow-xl bg-main-dark',
        showMenu && 'lg:bg-main-dark bg-black'
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
          onClick={goHome}
        >
          <Trans
            ns={'common'}
            k={'common_sitename'}
          />
        </div>
      </div>
      {withState && (
        <div
          className={cn(
            'absolute top-[33px] left-[50%] transform-[translate(-50%,0)] p-2 xl:flex hidden rounded-3xl border-1 border-main-gray bg-main-dark'
          )}
          onMouseLeave={() => delayedSetHoveredId(null)}
        >
          {links.map((el, index) => (
            <div
              key={el.id}
              className={cn('relative', !index ? 'ml-0' : 'ml-2')}
              onMouseEnter={() => {
                cancelHoverTimeout();
                setHoveredLinkId(el.submenu ? el.id : null);
              }}
            >
              <div
                className={cn(
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
          <div
            className={cn(
              'transition-all duration-300 ease-in-out overflow-hidden',
              scrolled ? 'max-w-[300px] opacity-100 translate-x-0 ml-2' : 'max-w-0 opacity-0 translate-x-4'
            )}
          >
            <div
              className={cn(
                'px-4 py-1 flex cursor-pointer rounded-3xl transition-colors duration-150 text-main-black bg-main-white hover:[box-shadow:inset_0_4px_4px_rgba(0,0,0,0.25)]'
              )}
              onClick={() => {
                if (selectedButton.onClick) selectedButton.onClick();
              }}
            >
              <div className={'font-medium text-sm whitespace-nowrap'}>{selectedButton.children}</div>
              <CustomIcon
                className={'ml-2'}
                name={'arrow-top-right'}
                size={16}
                color={'var(--main-black)'}
              />
            </div>
          </div>
        </div>
      )}
      {withState && (
        <HeaderUserState
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />
      )}
    </div>
  );
};

export default AppHeader;
