import React, { useRef } from 'react';
import AppHeader from '@/components/header/AppHeader';
import { ScrollArea } from '@/components/ui/scroll-area/ScrollArea';

const AppLayout: React.FC<Readonly<{ children: React.ReactNode; withState?: boolean }>> = ({
  children,
  withState = true,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={'h-screen flex flex-col'}>
      <AppHeader
        scrollRef={scrollRef}
        withState={withState}
      />
      <div className={'h-[112px]'} />
      <main
        className={'flex-1 overflow-y-auto min-h-[calc(100vh-112px)]'}
        ref={scrollRef}
      >
        <ScrollArea className={'h-full'}>
          <div>{children}</div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default AppLayout;
