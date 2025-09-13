'use client';

import { ScrollArea } from '@/components/ui/scroll-area/ScrollArea';
import routeChecker from '@/hoc/routeChecker';
import React, { useCallback, useEffect, useState } from 'react';
import { EACHIEVEMENT_TRIGGER, EACHIEVEMENT_TYPE, IAchievement } from '@/core/interfaces/types';
import Api from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import UIButton from '@/components/ui/button/UIButton';
import { openModal } from '@/store/tech/techSlice';
import { useConfirm } from '@/features/confirm-provider/ConfirmProvider';
import AchievementModal from '@/app/(views)/system/achievements/components/AchievementModal';

const SystemAchievements = () => {
  const [achievements, setAchievements] = useState<IAchievement[]>([]);
  const dispatch = useAppDispatch();
  const [currentAchievement, setCurrentAchievement] = useState<IAchievement | null>(null);
  const [openAchievementModal, setOpenAchievementModal] = useState(false);
  const confirm = useConfirm();

  const handleAddAchievement = () => {
    setCurrentAchievement({
      id: 0,
      title: '',
      key: '',
      image_id: 0,
      image: null,
      reward_points: 0,
      type: EACHIEVEMENT_TYPE.ONESHOT,
      trigger: EACHIEVEMENT_TRIGGER.ANSWER_QUESTION,
      target: 0,
      description: '',
      active: true,
    });
    setOpenAchievementModal(true);
  };

  const loadAchievements = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const achievements = await Api.get<any, IAchievement[]>('/achievements');
      setAchievements(achievements.payload);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const handleEditAchievement = async (id: number) => {
    if (!id) return;

    try {
      dispatch(setLoading(true));
      const result = await Api.get<undefined, IAchievement>(`/achievements/${id}`);

      setCurrentAchievement(result.payload);
      setOpenAchievementModal(true);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteAchievement = async (id: number) => {
    if (!id) return;

    const checkConfirm = await confirm({
      caption: 'Удалить достижение?',
      content:
        'Вы действитльно хотите удалить достижение? Это удалит весь прогресс пользователей, связанный с этим достижением.',
      type: 'warning',
      buttons: [
        {
          key: 'yes',
          label: 'Удалить',
          type: 'danger',
        },
        {
          key: 'no',
          label: 'Отмена',
          type: 'default',
        },
      ],
    });

    if (checkConfirm !== 'yes') return;

    try {
      await Api.delete<{ id: number }, { message: string }>('/achievements', { id });

      dispatch(
        openModal({
          text: 'Достижение успешно удалено',
        })
      );

      loadAchievements();
    } catch (e) {
      errorHandler(e, dispatch);
    }
  };

  const handleSaveAchievement = async (achievement: IAchievement) => {
    try {
      dispatch(setLoading(true));
      if (achievement.id) await Api.putFormData<IAchievement, IAchievement>('/achievements', achievement);
      else await Api.postFormData<IAchievement, IAchievement>('/achievements', achievement);

      dispatch(
        openModal({
          text: achievement.id ? 'Достижение успешно обновлен' : 'Достижение успешно добавлен',
        })
      );

      loadAchievements();
      setOpenAchievementModal(false);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    loadAchievements();
  }, [loadAchievements]);

  return (
    <div className={'flex flex-col h-full items-center'}>
      <div className={'text-5xl mb-5'}>Список достижений</div>
      <div className={'flex'}>
        <UIButton
          text={'Добавить достижение'}
          onClick={() => handleAddAchievement()}
        />
      </div>
      <div className={'w-full px-4 mt-4 h-full overflow-hidden'}>
        <ScrollArea>
          <div className={'mb-4 relative bg-modal'}>
            <div
              className={
                'sticky top-0 left-0 border grid grid-cols-[5%_15%_20%_15%_15%_15%_15%] min-h-8 border bg-modal'
              }
            >
              <div className={'text-2xl border-r px-2'}>ID</div>
              <div className={'text-2xl border-r px-2'}>Название</div>
              <div className={'text-2xl border-r px-2'}>Тип</div>
              <div className={'text-2xl border-r px-2'}>Триггер</div>
              <div className={'text-2xl border-r px-2'}>Целевое значение</div>
              <div className={'text-2xl border-r px-2'}>Награда</div>
              <div className={'text-2xl border-r px-2'}>ACTIONS</div>
            </div>
            {!!achievements.length &&
              achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={'border w-full grid grid-cols-[5%_15%_20%_15%_15%_15%_15%]'}
                >
                  <div className={'text-xl border-r text-center'}>{achievement.id}</div>
                  <div className={'text-xl border-r px-2 truncate'}>{achievement.title}</div>
                  <div className={'text-xl border-r px-2'}>{achievement.type}</div>
                  <div className={'text-xl border-r px-2'}>{achievement.trigger}</div>
                  <div className={'text-xl border-r px-2'}>{achievement.target}</div>
                  <div className={'text-xl border-r px-2'}>{achievement.reward_points}</div>
                  <div className={'flex flex-col px-2 py-2'}>
                    <UIButton
                      className={'mb-2'}
                      text={'Редактировать'}
                      onClick={() => handleEditAchievement(achievement.id)}
                    />
                    <UIButton
                      text={'Удалить'}
                      onClick={() => handleDeleteAchievement(achievement.id)}
                    />
                  </div>
                </div>
              ))}
          </div>
        </ScrollArea>
      </div>
      {currentAchievement && (
        <AchievementModal
          open={openAchievementModal}
          onClose={() => setOpenAchievementModal(false)}
          onSave={handleSaveAchievement}
          achievement={currentAchievement}
        />
      )}
    </div>
  );
};

export default routeChecker(SystemAchievements, 'adminOnly');
