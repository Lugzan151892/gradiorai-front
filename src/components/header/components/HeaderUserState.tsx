'use client';

import UIButton from '@/components/ui/button/UIButton';
import CustomIcon from '@/components/ui/icon/CustomIcon';
import Api from '@/core/api/api';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { RootState } from '@/store';
import { logout } from '@/store/user/userSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import MenuItem, { IMenuItemProps } from '@/components/header/components/MenuItem';
import { EMENU_ITEM } from '@/components/header/interfaces';
import Image from 'next/image';
import userLogin from '@/assets/icons/user-profile.svg';
import { useBreakpoint } from '@/hooks/useBreakpoints';

interface IMenuItem extends IMenuItemProps {
  id: EMENU_ITEM;
  show?: boolean;
}

const HeaderUserState = () => {
  const router = useRouter();
  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { isMobile } = useBreakpoint();

  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogin = () => {
    router.push('/login');
  };

  const username = useMemo(() => {
    if (!user) {
      return null;
    }

    return `${user.email}${user.admin ? ' (ADMIN)' : ''}`;
  }, [user]);

  const handleLogout = async () => {
    const result = await Api.get('/auth/logout');

    if (result.success) {
      localStorage.removeItem('token');
    }

    dispatch(logout());
    router.push('/');
  };

  const handleMenuClick = (id: EMENU_ITEM) => {
    switch (id) {
      case EMENU_ITEM.SYSTEM: {
        setShowMenu(false);
        router.push('/system');
        break;
      }
      case EMENU_ITEM.TESTS: {
        setShowMenu(false);
        router.push('/tests');
        break;
      }
      case EMENU_ITEM.INTERVIEW: {
        setShowMenu(false);
        router.push('/interview');
        break;
      }
      case EMENU_ITEM.RESUME_CHECK: {
        setShowMenu(false);
        router.push('/interview/resume-check');
        break;
      }
      case EMENU_ITEM.QUIT: {
        setShowMenu(false);
        handleLogout();
        break;
      }
      default: {
        setShowMenu(false);
        break;
      }
    }
  };

  const menuItems: IMenuItem[] = [
    {
      id: EMENU_ITEM.SUBSCRIBE,
      text: 'Подписка',
      icon: 'wallet',
      onClick: () => handleMenuClick(EMENU_ITEM.SUBSCRIBE),
      show: !!user?.admin,
    },
    {
      id: EMENU_ITEM.SUPPORT,
      text: 'Поддержка',
      icon: 'question-outline',
      onClick: () => handleMenuClick(EMENU_ITEM.SUPPORT),
      show: !!user?.admin,
    },
    {
      id: EMENU_ITEM.SYSTEM,
      text: 'Система',
      icon: 'settings',
      onClick: () => handleMenuClick(EMENU_ITEM.SYSTEM),
      show: !!user?.admin,
    },
    {
      id: EMENU_ITEM.TESTS,
      text: 'Пройти тестирование',
      icon: 'settings',
      onClick: () => handleMenuClick(EMENU_ITEM.TESTS),
      show: isMobile,
    },
    {
      id: EMENU_ITEM.INTERVIEW,
      text: 'Пройти собеседование',
      icon: 'settings',
      onClick: () => handleMenuClick(EMENU_ITEM.INTERVIEW),
      show: isMobile,
    },
    {
      id: EMENU_ITEM.RESUME_CHECK,
      text: 'Проверить резюме',
      icon: 'settings',
      onClick: () => handleMenuClick(EMENU_ITEM.RESUME_CHECK),
      show: isMobile,
    },
    {
      id: EMENU_ITEM.QUIT,
      text: 'Выход',
      icon: 'turn-off',
      className: 'mt-auto',
      onClick: () => handleMenuClick(EMENU_ITEM.QUIT),
      show: true,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <>
      {!user?.id ? (
        <div className={'flex gap-2'}>
          <UIButton
            onClick={handleLogin}
            text={'ВОЙТИ'}
          />
        </div>
      ) : (
        <div
          className={'flex items-center'}
          ref={menuRef}
        >
          <div
            className={'flex items-center cursor-pointer'}
            onClick={() => setShowMenu(!showMenu)}
          >
            <Image
              src={userLogin}
              alt={'profile'}
              width={40}
              height={40}
            />
            <CustomIcon
              name={'menu-arrow'}
              color={'var(--main-white)'}
              className={`ml-1 transform transition-transform duration-300 ${showMenu ? 'rotate-180' : ''}`}
            />
          </div>
          {showMenu && (
            <div
              className={
                'z-50 p-4 bg-black rounded-xl flex flex-col overflow-hidden lg:w-[400px] w-full max-w-full lg:h-[400px] h-screen max-h-[calc(100dvh-114px)] absolute top-[114px] lg:right-[30px] right-0 overflow-y-auto'
              }
            >
              <MenuItem
                icon={'user'}
                text={username || ''}
                isStatic
              />
              {menuItems
                .filter((e) => e.show)
                .map((item) => (
                  <MenuItem
                    key={item.id}
                    {...item}
                  />
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HeaderUserState;
