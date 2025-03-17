'use client';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { RootState } from '@/store';
import CustomButton from '@/components/ui/button/CustomButton';
import Api from '@/core/api/api';
import { logout } from '@/store/user/userSlice';
import CustomIcon from '@/components/ui/icon/CustomIcon';

const AppHeader = () => {
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
    <header className={'h-12 w-full bg-main-blue flex items-center text-2xl px-4'}>
      <div
        className={'cursor-pointer text-white'}
        onClick={() => router.push('/')}
      >
        Skill Test
      </div>
      {!user?.id ? (
        <div className={'ml-auto flex gap-2'}>
          <CustomButton
            small
            text={'Войти'}
            onClick={handleLogin}
          />
          <CustomButton
            small
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
            text={'Выйти'}
            onClick={handleLogout}
          />
        </div>
      )}
    </header>
  );
};

export default AppHeader;
