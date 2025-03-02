'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const AppHeader = () => {
  const router = useRouter();
  return (
    <header
      className={
        'h-12 w-full bg-main-blue flex items-center text-2xl px-4 cursor-pointer'
      }
      onClick={() => router.push('/')}
    >
      Skill Test
    </header>
  );
};

export default AppHeader;
