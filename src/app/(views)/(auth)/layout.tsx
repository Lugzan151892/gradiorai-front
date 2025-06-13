'use client';

import AppLayout from '@/components/app-layout/AppLayout';
import React from 'react';

const AuthLayout: React.FC<{
  children: Readonly<React.ReactNode>;
}> = ({ children }) => {
  return (
    <AppLayout withState={false}>
      <div className={'flex items-center justify-center max-w-[800px] mx-auto mt-10'}>{children}</div>
    </AppLayout>
  );
};

export default AuthLayout;
