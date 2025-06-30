import React, { useRef } from 'react';
import AppHeader from '@/components/header/AppHeader';
import { ScrollArea } from '@/components/ui/scroll-area/ScrollArea';

const AppLayout: React.FC<Readonly<{ children: React.ReactNode; withState?: boolean }>> = ({
  children,
  withState = true,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={'flex flex-col pt-[112px] [height:100dvh]'}>
      <AppHeader
        scrollRef={scrollRef}
        withState={withState}
      />
      <main
        className={'flex-1 overflow-hidden'}
        ref={scrollRef}
      >
        <ScrollArea>{children}</ScrollArea>
      </main>
    </div>
  );
};

export default AppLayout;
