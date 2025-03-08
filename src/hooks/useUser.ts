'use client';

import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getUserData } from '@/store/user/userSlice';
import { useAppDispatch } from '@/hooks/redux';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const { user, unAuth } = useSelector((state: RootState) => state.user);
  const isFetched = useRef(false);

  useEffect(() => {
    if (!unAuth && !isFetched.current) {
      isFetched.current = true;
      dispatch(getUserData());
    }
  }, [dispatch, unAuth]);

  return { user, unAuth };
};
