'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import HeaderUserState from '@/components/header/components/HeaderUserState';

const AppHeader: React.FC<{ withState?: boolean }> = ({ withState = true }) => {
  const router = useRouter();

  return (
    <header className={'desktop:px-10 mobile:px-5 mobile:pt-3 pt-12 flex'}>
      <div
        className={'cursor-pointer text-white text-6xl mobile:text-5xl px-4 py-4 max-w-max hover:text-low-green'}
        onClick={() => router.push('/')}
      >
        Gradior
      </div>
      {withState ? <HeaderUserState /> : null}
    </header>
  );
};

export default AppHeader;
