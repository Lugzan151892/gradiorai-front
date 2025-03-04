'use client';
import { useAppSelector } from '@/hooks/redux';
import { useRouter } from 'next/navigation';
import React from 'react';
import { RootState } from '@/store';
import CustomButton from '../ui/button/CustomButton';

const AppHeader = () => {
  const router = useRouter();
  const { user } = useAppSelector((state: RootState) => state.user);

  const handleLogin = () => {
    router.push('/login');
  };
  const handleRegister = () => {
    router.push('/registration');
  };
  return (
    <header
      className={'h-12 w-full bg-main-blue flex items-center text-2xl px-4'}
    >
      <div className={'cursor-pointer'} onClick={() => router.push('/')}>
        Skill Test
      </div>
      {!user?.id ? (
        <div className={'ml-auto flex gap-2'}>
          <CustomButton small text={'Войти'} onClick={handleLogin} />
          <CustomButton
            small
            text={'Зарегистрироваться'}
            onClick={handleRegister}
          />
        </div>
      ) : null}
    </header>
  );
};

export default AppHeader;
