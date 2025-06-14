import AppLayoutClient from '@/components/app-layout/AppLayoutClient';
import React from 'react';

const AuthLayout: React.FC<{
  children: Readonly<React.ReactNode>;
}> = ({ children }) => {
  return (
    <AppLayoutClient withState={false}>
      <div className={'flex items-center justify-center max-w-[800px] mx-auto mt-10'}>{children}</div>
    </AppLayoutClient>
  );
};

export default AuthLayout;
