import AppHeader from '@/components/header/AppHeader';
import React from 'react';

const AuthLayout: React.FC<{
  children: Readonly<React.ReactNode>;
}> = ({ children }) => {
  return (
    <div className={'w-full h-full flex flex-col'}>
      <AppHeader withState={false} />
      <div className={'w-full h-full flex bg-main-blue'}>
        <div className={'flex justify-center w-full items-center'}>
          <div className={'max-w-sm w-full border-main-blue desktop:border-2 rounded bg-white p-10'}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
