import React, { useRef } from 'react';
import AppHeader from '@/components/header/AppHeader';
import { ScrollArea } from '@/components/ui/scroll-area/ScrollArea';

const AppLayout: React.FC<Readonly<{ children: React.ReactNode; withState?: boolean }>> = ({
  children,
  withState = true,
}) => {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={'flex flex-col pt-[112px] [height:100dvh]'}>
      <AppHeader
        scrollRef={viewportRef}
        withState={withState}
      />
      <main className={'flex-1 overflow-hidden'}>
        <ScrollArea viewportRef={viewportRef}>{children}</ScrollArea>
      </main>
    </div>
  );
};

export default AppLayout;
