import AppHeader from '@/components/header/AppHeader';
import React from 'react';

const SystemLayout: React.FC<{
  children: Readonly<React.ReactNode>;
}> = ({ children }) => {
  return (
    <div className={'w-full h-full flex flex-col'}>
      <AppHeader />
      <div className={'flex justify-center w-full h-full'}>
        <div className={'w-full'}>{children}</div>
      </div>
    </div>
  );
};

export default SystemLayout;
