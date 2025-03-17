import React from 'react';
import AppHeader from '@/components/header/AppHeader';

const TestsLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return (
    <div className={'grid grid-cols-1 grid-rows-layout h-full'}>
      <AppHeader />
      {children}
    </div>
  );
};

export default TestsLayout;
