import AppHeader from '@/components/header/AppHeader';
import ScrollContainer from '@/components/ui/scrollarea/CustomScrollarea';
import React from 'react';

const TestsLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return (
    <div className={'w-full h-full flex flex-col'}>
      <AppHeader />
      <div className={'max-w-5xl flex mx-auto overflow-hidden'}>
        <ScrollContainer>
          <div className={'flex mobile:px-2 mobile:mb-4'}>{children}</div>
        </ScrollContainer>
      </div>
    </div>
  );
};

export default TestsLayout;
