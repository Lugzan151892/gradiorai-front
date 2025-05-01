import AppHeader from '@/components/header/AppHeader';
import ScrollContainer from '@/components/ui/scrollarea/CustomScrollarea';
import React from 'react';

const TestsLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return (
    <div className={'w-full h-full flex flex-col'}>
      <AppHeader />
      <div className={'flex max-w-full max-h-full h-full overflow-hidden'}>
        <ScrollContainer>
          <div className={'w-[1362px] flex max-w-full max-h-full h-full flex-grow mx-auto'}>
            <div className={'flex h-full w-full mobile:px-2'}>{children}</div>
          </div>
        </ScrollContainer>
      </div>
    </div>
  );
};

export default TestsLayout;
