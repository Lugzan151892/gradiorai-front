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
import userAvatarEmpty from '@/assets/icons/user-avatar-empty.svg';
import { cn } from '@/lib/utils';

interface IMenuItem extends IMenuItemProps {
  id: EMENU_ITEM;
  hide?: boolean;
}

const HeaderUserState = () => {
  const router = useRouter();
  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const [showMenu, setShowMenu] = useState(false);

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
      case EMENU_ITEM.PROFILE: {
        setShowMenu(false);
        router.push('/profile/information');
        break;
      }
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
      case EMENU_ITEM.RESUME_CREATE: {
        setShowMenu(false);
        router.push('/interview/resume-create');
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
      id: EMENU_ITEM.PROFILE,
      text: 'Профиль',
      icon: 'settings',
      onClick: () => handleMenuClick(EMENU_ITEM.PROFILE),
      hide: !user?.admin,
    },
    {
      id: EMENU_ITEM.SYSTEM,
      text: 'Система',
      icon: 'settings',
      onClick: () => handleMenuClick(EMENU_ITEM.SYSTEM),
      hide: !user?.admin,
    },
    {
      id: EMENU_ITEM.INTERVIEW,
      text: 'Собеседование',
      icon: 'two-users',
      onClick: () => handleMenuClick(EMENU_ITEM.INTERVIEW),
    },
    {
      id: EMENU_ITEM.TESTS,
      text: 'Тестирование',
      icon: 'to-do-list',
      onClick: () => handleMenuClick(EMENU_ITEM.TESTS),
    },
    {
      id: EMENU_ITEM.RESUME_CHECK,
      text: 'Проверка резюме',
      icon: 'file-check',
      onClick: () => handleMenuClick(EMENU_ITEM.RESUME_CHECK),
    },
    {
      id: EMENU_ITEM.RESUME_CREATE,
      text: 'Создание резюме',
      icon: 'file-create',
      onClick: () => handleMenuClick(EMENU_ITEM.RESUME_CREATE),
    },
    {
      id: EMENU_ITEM.QUIT,
      text: 'Выход',
      icon: 'logout',
      color: 'var(--main-error)',
      className: 'mt-auto',
      onClick: () => handleMenuClick(EMENU_ITEM.QUIT),
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
              src={userAvatarEmpty}
              alt={'profile'}
              width={40}
              height={40}
            />
            <CustomIcon
              name={'menu-arrow'}
              color={'var(--main-white)'}
              className={cn('ml-1 transform transition-transform duration-300', showMenu && 'rotate-180')}
            />
          </div>
          {showMenu && (
            <div
              className={cn(
                'z-50 p-4 bg-black lg:border lg:border-main-gray lg:rounded-xl flex flex-col overflow-hidden',
                'lg:w-[350px] w-full max-w-full lg:h-[420px] h-screen max-h-[calc(100dvh-90px)] absolute top-[90px] lg:right-[100px] right-0 overflow-y-auto'
              )}
            >
              <MenuItem
                icon={'user'}
                text={username || ''}
                isStatic
                className={'mb-4'}
              />
              <div className={'flex flex-col gap-1 h-full'}>
                {menuItems
                  .filter((e) => !e.hide)
                  .map((item) => (
                    <MenuItem
                      key={item.id}
                      {...item}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HeaderUserState;
