'use client';

import CustomButton from '@/components/ui/button/CustomButton';
import CustomIcon from '@/components/ui/icon/CustomIcon';
import Api from '@/core/api/api';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { RootState } from '@/store';
import { logout } from '@/store/user/userSlice';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

const HeaderUserState = () => {
  const router = useRouter();
  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    router.push('/login');
  };
  const handleRegister = () => {
    router.push('/registration');
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

  return (
    <>
      {!user?.id ? (
        <div className={'ml-auto flex gap-2'}>
          <CustomButton
            small
            text={'Войти'}
            type={'success'}
            onClick={handleLogin}
          />
          <CustomButton
            small
            type={'success'}
            text={'Зарегистрироваться'}
            onClick={handleRegister}
          />
        </div>
      ) : (
        <div className={'ml-auto flex items-center'}>
          <CustomIcon
            size={30}
            name={'user'}
            color={'var(--main-white)'}
            tooltip={username || ''}
          />
          <CustomIcon
            className={'cursor-pointer desktop:hidden ml-2'}
            name={'login'}
            size={30}
            color={'var(--main-white)'}
            onClick={handleLogout}
          />
          <CustomButton
            className={'mobile:hidden ml-2'}
            small
            color={'gray'}
            text={'Выйти'}
            onClick={handleLogout}
          />
        </div>
      )}
    </>
  );
};

export default HeaderUserState;
