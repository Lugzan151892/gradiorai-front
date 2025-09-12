'use client';

import CustomIcon from '@/components/ui/icon/CustomIcon';
import Api from '@/core/api/api';
import { IAchievement, IAchievementWithProgress } from '@/core/interfaces/types';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import { Trans } from '@/i18n/Trans';
import { RootState } from '@/store';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import AchievementItem from './components/AchievementItem';

const ProfileAchievements = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const [userAchievements, setUserAchievements] = useState<IAchievementWithProgress[]>([]);
  const [allAchievements, setAllAchievements] = useState<IAchievement[]>([]);

  const loadAchievements = useCallback(async () => {
    if (!user?.id) return;
    dispatch(setLoading(true));
    try {
      const result = await Api.get<{ userId: number }, IAchievementWithProgress[]>('/achievements', {
        userId: user.id,
      });
      setUserAchievements(result.payload);
    } catch (error) {
      errorHandler(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [user, dispatch]);

  const loadAllAchievements = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const result = await Api.get<undefined, IAchievement[]>('/achievements');
      setAllAchievements(result.payload);
    } catch (error) {
      errorHandler(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    loadAchievements();
    loadAllAchievements();
  }, [loadAchievements, loadAllAchievements]);

  return (
    <div>
      <div>
        <div className={'flex gap-3 items-center'}>
          <CustomIcon
            name={'icon-trophy'}
            size={30}
            color={'var(--main-purple)'}
          />
          <Trans
            className={'text-2xl font-bold'}
            ns={'profile'}
            k={'profile_achievements_title_completed'}
          />
          <div className={'px-4 bg-main-purple text-white rounded-full text-base font-bold'}>4</div>
        </div>
        <div className={'flex gap-6 flex-wrap mt-4'}>
          {userAchievements.map((achievement) => (
            <AchievementItem
              key={achievement.id}
              achievement={achievement}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileAchievements;
