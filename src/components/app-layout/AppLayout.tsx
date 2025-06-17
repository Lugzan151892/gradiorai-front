import React, { useRef } from 'react';
import AppHeader from '@/components/header/AppHeader';

const AppLayout: React.FC<Readonly<{ children: React.ReactNode; withState?: boolean }>> = ({
  children,
  withState = true,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={'h-screen flex flex-col pt-[112px]'}>
      <AppHeader
        scrollRef={scrollRef}
        withState={withState}
      />
      <main
        className={'flex-1 overflow-y-auto h-screen'}
        ref={scrollRef}
      >
        <div>{children}</div>
      </main>
    </div>
  );
};

export default AppLayout;
