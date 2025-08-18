'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area/ScrollArea';
import routeChecker from '@/hoc/routeChecker';

const SystemUsers = () => {
  return (
    <div className={'flex flex-col h-full items-center'}>
      <div className={'text-5xl mb-5'}>Доска задач + аналитика</div>
      <div className={'w-full px-4 mt-4 h-full overflow-hidden'}>
        <ScrollArea>
          <div className={'mb-4 relative bg-modal'}>
            <div className={'text-2xl'}>Доска задач</div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default routeChecker(SystemUsers, 'adminOnly');
