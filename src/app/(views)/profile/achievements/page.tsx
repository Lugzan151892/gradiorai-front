'use client';

import CustomIcon from '@/components/ui/icon/CustomIcon';
import Api from '@/core/api/api';
import { IAchievement } from '@/core/interfaces/types';
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
  const [userAchievements, setUserAchievements] = useState<IAchievement[]>([]);

  const loadAchievements = useCallback(async () => {
    if (!user?.id) return;
    dispatch(setLoading(true));
    try {
      const result = await Api.get<{ userId: number }, IAchievement[]>('/achievements', {
        userId: user.id,
      });
      setUserAchievements(result.payload);
    } catch (error) {
      errorHandler(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [user, dispatch]);

  const splittedAchievements = useMemo(() => {
    return userAchievements.reduce<{ completed: IAchievement[]; notCompleted: IAchievement[] }>(
      (acc, achievement) => {
        if (achievement.userProgress?.completed) {
          acc.completed.push(achievement);
        } else {
          acc.notCompleted.push(achievement);
        }
        return acc;
      },
      { completed: [], notCompleted: [] }
    );
  }, [userAchievements]);

  useEffect(() => {
    loadAchievements();
  }, [loadAchievements]);

  return (
    <div className={'flex flex-col gap-20'}>
      {!!splittedAchievements.completed.length && (
        <div>
          <div className={'flex gap-3 items-center'}>
            <CustomIcon
              name={'icon-trophy'}
              size={30}
              color={'var(--main-purple)'}
            />
            <Trans
              className={'text-2xl font-bold'}
              ns={'achievement'}
              k={'achievement_title_completed'}
            />
            <div className={'px-4 bg-main-purple text-white rounded-full text-base font-bold'}>
              {splittedAchievements.completed.length}
            </div>
          </div>
          <div className={'flex gap-6 flex-wrap mt-4'}>
            {splittedAchievements.completed.map((achievement) => (
              <AchievementItem
                key={achievement.id}
                achievement={achievement}
              />
            ))}
          </div>
        </div>
      )}
      {!!splittedAchievements.notCompleted.length && (
        <div>
          <div className={'flex gap-3 items-center'}>
            <CustomIcon
              name={'target'}
              size={30}
              color={'var(--main-purple)'}
            />
            <Trans
              className={'text-2xl font-bold'}
              ns={'achievement'}
              k={'achievement_title_not_completed'}
            />
            <div className={'px-4 bg-main-gray text-white rounded-full text-base font-bold'}>
              {splittedAchievements.notCompleted.length}
            </div>
          </div>
          <div className={'flex gap-6 flex-wrap mt-4'}>
            {splittedAchievements.notCompleted.map((achievement) => (
              <AchievementItem
                key={achievement.id}
                achievement={achievement}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileAchievements;
