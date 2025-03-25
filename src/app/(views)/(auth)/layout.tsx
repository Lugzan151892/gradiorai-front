'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const AuthLayout: React.FC<{
  children: Readonly<React.ReactNode>;
}> = ({ children }) => {
  const router = useRouter();

  return (
    <div
      className={'w-full h-full flex flex-col bg-[url("../assets/images/auth-bg.png")] bg-no-repeat bg-cover bg-left'}
    >
      <div
        className={'cursor-pointer text-white h-12 text-2xl px-4 py-4'}
        onClick={() => router.push('/')}
      >
        Skill Test
      </div>
      <div className={'w-full h-full flex'}>
        <div className={'flex justify-center w-full h-full items-center'}>
          <div
            className={
              'max-w-sm w-full h-full max-h-[700px] rounded-3xl bg-transparent p-10 bg-[url("../assets/images/auth-bg.png")] bg-no-repeat bg-center bg-origin-content'
            }
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
