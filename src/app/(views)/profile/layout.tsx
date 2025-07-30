'use client';

import Link from 'next/link';
import React, { ReactNode } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
import AppLayoutClient from '@/components/app-layout/AppLayoutClient';
import { cn } from '@/lib/utils';

const tabs = [
  { href: '/profile/information', label: 'Профиль' },
  { href: '/profile/interviews', label: 'Результаты' },
];

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  const activeTab = useSelectedLayoutSegment(); // берёт сегмент из URL

  return (
    <AppLayoutClient withState>
      <div className={'lg:mt-6 w-full max-w-[1440px] mx-auto'}>
        <div className={'mb-4 flex gap-4 pb-2'}>
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'pb-1 text-lg',
                tab.href.endsWith(`/${activeTab}`) && 'border-main-purple text-main-purple border-b-2 font-semibold',
                'hover:border-main-purple hover:border-b-2 hover:text-main-purple'
              )}
            >
              {tab.label}
            </Link>
          ))}
        </div>
        <div>{children}</div>
      </div>
    </AppLayoutClient>
  );
};

export default ProfileLayout;
