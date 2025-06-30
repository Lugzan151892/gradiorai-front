'use client';

import { useAppDispatch } from '@/hooks/redux';
import { getUserData } from '@/store/user/userSlice';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const UserInitializer = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(getUserData());
  }, [pathname, dispatch]);

  return null;
};

export default UserInitializer;
