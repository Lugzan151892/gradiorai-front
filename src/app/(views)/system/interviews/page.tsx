'use client';

import Api from '@/core/api/api';
import { normalizeServerDate } from '@/core/utils/date';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import React, { useCallback, useEffect, useState } from 'react';
import { IInterview } from '@/app/(views)/(interview)/interview/types';
import UIButton from '@/components/ui/button/UIButton';
import { openModal } from '@/store/tech/techSlice';
import { ScrollArea } from '@/components/ui/scroll-area/ScrollArea';

const SystemInterviews = () => {
  const [interviews, setInterviews] = useState<IInterview[]>([]);
  const dispatch = useAppDispatch();

  const loadInterviews = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<undefined, IInterview[]>('/interview/user-interviews');

      setInterviews(result.payload);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const handleDeleteInterview = async (id: string) => {
    try {
      const result = await Api.delete<{ id: string }, { message: string }>('/interview/delete', { id });

      dispatch(
        openModal({
          text: result.payload.message,
        })
      );

      loadInterviews();
    } catch (e) {
      errorHandler(e, dispatch);
    }
  };

  useEffect(() => {
    loadInterviews();
  }, [loadInterviews]);

  return (
    <div className={'flex flex-col h-full items-center'}>
      <div className={'text-5xl mb-5'}>Список собеседований</div>
      <div className={'w-full px-4 mt-4 h-full overflow-hidden'}>
        <ScrollArea>
          <div className={'mb-4 relative bg-modal'}>
            <div
              className={'sticky top-0 left-0 border grid grid-cols-[12%_20%_33%_15%_10%_10%] min-h-8 border bg-modal'}
            >
              <div className={'text-2xl border-r px-2'}>Дата создания</div>
              <div className={'text-2xl border-r px-2'}>ID</div>
              <div className={'text-2xl border-r px-2'}>Описание пользователя</div>
              <div className={'text-2xl border-r px-2'}>Ссылка на интервью</div>
              <div className={'text-2xl border-r px-2'}>STATUS</div>
              <div className={'text-2xl border-r px-2'}>ACTIONS</div>
            </div>
            {interviews.length &&
              interviews.map((interview) => (
                <div
                  key={interview.id}
                  className={'border w-full grid grid-cols-[12%_20%_33%_15%_10%_10%]'}
                >
                  <div className={'text-xl border-r px-2'}>
                    {interview.created_at ? normalizeServerDate(interview.created_at) : ''}
                  </div>
                  <div className={'text-xl border-r text-center'}>{interview.id}</div>
                  <div className={'text-xl border-r px-2 truncate'}>{interview.user_prompt}</div>
                  <a
                    className={'text-xl text-center border-r border-white hover:text-main-blue hover:underline'}
                    href={`/interview/${interview.id}`}
                  >
                    Перейти
                  </a>
                  <div className={'text-xl border-r px-2'}>{interview.finished ? 'Завершено' : 'В процессе'}</div>
                  <div className={'flex flex-col px-2 py-2'}>
                    <UIButton
                      text={'Удалить'}
                      onClick={() => handleDeleteInterview(interview.id)}
                    />
                  </div>
                </div>
              ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SystemInterviews;
