'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getUserData } from '@/store/userSlice';
import { useAppDispatch } from './redux';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return { user, loading };
};
