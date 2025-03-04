'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getUserData } from '@/store/userSlice';
import { useAppDispatch } from './redux';
import { usePathname } from 'next/navigation';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useSelector((state: RootState) => state.user);
  const pathName = usePathname();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch, pathName]);

  return { user, loading };
};
