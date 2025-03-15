'use client';

import { useAppSelector } from '@/hooks/redux';
import { RootState } from '@/store';
import React from 'react';

const AdminWrapper: React.FC<{
  children: Readonly<React.ReactNode>;
  className?: string;
}> = ({ children, className }) => {
  const { user } = useAppSelector((state: RootState) => state.user);

  if (!user?.admin) {
    return null;
  }

  return (
    <div className={className + ' relative'}>
      <div className={'px-3 bg-orange rounded absolute text-white text-sm font-semibold top-[-9px] right-[-16px]'}>
        D
      </div>
      {children}
    </div>
  );
};

export default AdminWrapper;
