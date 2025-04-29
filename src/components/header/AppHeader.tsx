'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import HeaderUserState from '@/components/header/components/HeaderUserState';
import CustomIcon from '@/components/ui/icon/CustomIcon';

const AppHeader: React.FC<{ withState?: boolean }> = ({ withState = true }) => {
  const router = useRouter();

  return (
    <header className={'desktop:px-6 mobile:px-5 mobile:py-2 desktop:py-5 flex items-center'}>
      <CustomIcon
        name={'owl'}
        size={64}
        color={'var(--low-green)'}
      />
      <div
        className={'cursor-pointer text-white text-6xl mobile:text-5xl max-w-max hover:text-low-green'}
        onClick={() => router.push('/')}
      >
        Gradior
      </div>
      {withState ? <HeaderUserState /> : null}
    </header>
  );
};

export default AppHeader;
