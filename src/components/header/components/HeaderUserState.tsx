'use client';

import CustomButton from '@/components/ui/button/CustomButton';
import CustomIcon from '@/components/ui/icon/CustomIcon';
import Api from '@/core/api/api';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { RootState } from '@/store';
import { logout } from '@/store/user/userSlice';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
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
        <div className={'ml-auto flex items-center'}>
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
                'p-4 bg-black rounded-10 flex flex-col overflow-hidden w-[400px] max-w-full h-[500px] max-h-[calc(100vh-60px)] absolute top-[60px] mobile:mx-4 desktop:right-[30px] mobile:right-0'
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
