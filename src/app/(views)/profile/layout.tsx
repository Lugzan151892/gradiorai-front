'use client';

import Link from 'next/link';
import React, { ReactNode } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
import AppLayoutClient from '@/components/app-layout/AppLayoutClient';
import { cn } from '@/lib/utils';
import { Trans } from '@/i18n/Trans';

const tabs = [
  {
    href: '/profile/information',
    label: (
      <Trans
        ns={'common'}
        k={'common_profile'}
      />
    ),
  },
  {
    href: '/profile/results',
    label: (
      <Trans
        ns={'common'}
        k={'common_results'}
      />
    ),
  },
  {
    href: '/profile/achievements',
    label: (
      <Trans
        ns={'common'}
        k={'common_achievements'}
      />
    ),
  },
];

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  const activeTab = useSelectedLayoutSegment(); // берёт сегмент из URL

  return (
    <AppLayoutClient withState>
      <div className={'lg:mt-6 lg:w-full lg:max-w-[1440px] max-w-[468px] mx-auto px-4 pb-4'}>
        <div className={'mb-4 flex gap-4 pb-2 justify-self-start'}>
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
