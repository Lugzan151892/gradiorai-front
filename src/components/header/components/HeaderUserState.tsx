'use client';

import CustomButton from '@/components/ui/button/CustomButton';
import CustomIcon from '@/components/ui/icon/CustomIcon';
import Api from '@/core/api/api';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { RootState } from '@/store';
import { logout } from '@/store/user/userSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import MenuItem, { IMenuItemProps } from '@/components/header/components/MenuItem';

interface IMenuItem extends IMenuItemProps {
  id: number;
  show?: boolean;
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
    router.push('/login');
  };

  const menuItems: IMenuItem[] = [
    {
      id: 1,
      text: 'Подписка',
      icon: 'wallet',
      show: !!user?.admin,
    },
    {
      id: 2,
      text: 'Поддержка',
      icon: 'question-outline',
      show: !!user?.admin,
    },
    {
      id: 3,
      text: 'Выход',
      icon: 'turn-off',
      className: 'mt-auto',
      onClick: handleLogout,
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
        <div className={'ml-auto flex gap-2'}>
          <CustomButton
            className={'!rounded-10 !px-3 !py-2 text-xl h-max '}
            color={'low-green'}
            onClick={handleLogin}
          >
            <div className={'flex'}>
              <CustomIcon
                className={'desktop:mr-6'}
                name={'user-login'}
                size={25}
                color={'var(--main-white)'}
              />
              <div className={'mobile:hidden'}>Вход</div>
            </div>
          </CustomButton>
        </div>
      ) : (
        <div
          className={'ml-auto flex items-center'}
          ref={menuRef}
        >
          <CustomIcon
            className={'cursor-pointer'}
            size={30}
            name={'user-login'}
            color={'var(--main-white)'}
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div
              className={
                'z-50 p-4 bg-black rounded-10 flex flex-col overflow-hidden desktop:w-[400px] mobile:w-full max-w-full desktop:h-[500px] mobile:h-full max-h-[calc(100vh-60px)] absolute top-[60px] desktop:right-[30px] mobile:right-0'
              }
            >
              <div className={'flex items-center mb-10'}>
                <CustomIcon
                  name={'user'}
                  color={'var(--main-white)'}
                  size={30}
                />
                <div className={'ml-3'}>{username}</div>
              </div>
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
