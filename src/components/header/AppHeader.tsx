'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import HeaderUserState from '@/components/header/components/HeaderUserState';

const AppHeader: React.FC<{ withState?: boolean }> = ({ withState = true }) => {
  const router = useRouter();

  return (
    <header className={'h-12 w-full bg-main-blue flex items-center text-2xl px-4'}>
      <div
        className={'cursor-pointer text-white hover:text-success'}
        onClick={() => router.push('/')}
      >
        Skill Test
      </div>
      {withState ? <HeaderUserState /> : null}
    </header>
  );
};

export default AppHeader;
