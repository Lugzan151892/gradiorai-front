'use client';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useRouter } from 'next/navigation';
import React from 'react';
import { RootState } from '@/store';
import CustomButton from '@/components/ui/button/CustomButton';
import Api from '@/core/api/api';
import { logout } from '@/store/userSlice';

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

  const handleLogout = async () => {
    const result = await Api.get('/auth/logout');

    if (result.success) {
      localStorage.removeItem('token');
    }

    dispatch(logout());
    router.push('/login');
  };
  return (
    <header
      className={'h-12 w-full bg-main-blue flex items-center text-2xl px-4'}
    >
      {/* eslint-disable-next-line react/jsx-max-props-per-line */}
      <div className={'cursor-pointer'} onClick={() => router.push('/')}>
        Skill Test
      </div>
      {!user?.id ? (
        <div className={'ml-auto flex gap-2'}>
          {/* eslint-disable-next-line react/jsx-max-props-per-line */}
          <CustomButton small text={'Войти'} onClick={handleLogin} />
          <CustomButton
            small
            text={'Зарегистрироваться'}
            onClick={handleRegister}
          />
        </div>
      ) : (
        <div className={'ml-auto flex items-center'}>
          <div className={'text-white mr-2'}>
            {`USER: ${user.email}${user.admin ? ' (ADMIN)' : ''}`}
          </div>
          {/* eslint-disable-next-line react/jsx-max-props-per-line */}
          <CustomButton small text={'Выйти'} onClick={handleLogout} />
        </div>
      )}
    </header>
  );
};

export default AppHeader;
