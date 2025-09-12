'use client';

import Api from '@/core/api/api';
import { IAchievement } from '@/core/interfaces/types';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import { RootState } from '@/store';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ProfileAchievements = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const [achievements, setAchievements] = useState<IAchievement[]>([]);

  const loadAchievements = useCallback(async () => {
    if (!user?.id) return;
    dispatch(setLoading(true));
    try {
      const result = await Api.get<{ userId: number }, IAchievement[]>('/achievements', { userId: user.id });
      setAchievements(result.payload);
    } catch (error) {
      errorHandler(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [user, dispatch]);

  useEffect(() => {
    loadAchievements();
  }, [loadAchievements]);

  return <div>ProfileAchievements</div>;
};

export default ProfileAchievements;
