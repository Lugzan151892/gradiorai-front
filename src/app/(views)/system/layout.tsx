import AppHeader from '@/components/header/AppHeader';
import React from 'react';

const SystemLayout: React.FC<{
  children: Readonly<React.ReactNode>;
}> = ({ children }) => {
  return (
    <div className={'grid grid-cols-1 grid-rows-layout h-full overflow-hidden'}>
      <AppHeader />
      <div className={'flex justify-center w-full h-full overflow-y-auto'}>
        <div className={'w-full'}>{children}</div>
      </div>
    </div>
  );
};

export default SystemLayout;
