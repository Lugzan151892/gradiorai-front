'use client';

import ScrollContainer from '@/components/ui/scrollarea/CustomScrollarea';
import Api from '@/core/api/api';
import { normalizeServerDate } from '@/core/utils/date';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import React, { useCallback, useEffect, useState } from 'react';
import { IInterview } from '../../(interview)/interview/types';
import CustomButton from '@/components/ui/button/CustomButton';
import { openModal } from '@/store/tech/techSlice';

const SystemInterviews = () => {
  const [interviews, setInterviews] = useState<IInterview[]>([]);
  const dispatch = useAppDispatch();

  const loadInterviews = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<any, IInterview[]>('/interview/user-interviews');

      setInterviews(result.payload);
    } catch (e: any) {
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
    } catch (e: any) {
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
        <ScrollContainer>
          <div className={'mb-4 relative bg-modal'}>
            <div
              className={
                'sticky top-0 left-0 border-1 grid grid-cols-[12%,20%,33%,15%,10%,10%] min-h-8 border-1 bg-modal'
              }
            >
              <div className={'text-2xl border-r-1 px-2'}>Дата создания</div>
              <div className={'text-2xl border-r-1 px-2'}>ID</div>
              <div className={'text-2xl border-r-1 px-2'}>Описание пользователя</div>
              <div className={'text-2xl border-r-1 px-2'}>Ссылка на интервью</div>
              <div className={'text-2xl border-r-1 px-2'}>STATUS</div>
              <div className={'text-2xl border-r-1 px-2'}>ACTIONS</div>
            </div>
            {interviews.length &&
              interviews.map((interview) => (
                <div
                  key={interview.id}
                  className={'border-1 w-full grid grid-cols-[12%,20%,33%,15%,10%,10%]'}
                >
                  <div className={'text-xl border-r-1 px-2'}>
                    {interview.created_at ? normalizeServerDate(interview.created_at) : ''}
                  </div>
                  <div className={'text-xl border-r-1 text-center'}>{interview.id}</div>
                  <div className={'text-xl border-r-1 px-2'}>{interview.user_prompt}</div>
                  <a
                    className={'text-xl text-center border-r-1 border-white hover:text-main-blue hover:underline'}
                    href={`/interview/${interview.id}`}
                  >
                    Перейти
                  </a>
                  <div className={'text-xl border-r-1 px-2'}>{interview.finished ? 'Завершено' : 'В процессе'}</div>
                  <div className={'flex flex-col px-2 py-2'}>
                    <CustomButton
                      type={'error'}
                      text={'Удалить'}
                      onClick={() => handleDeleteInterview(interview.id)}
                    />
                  </div>
                </div>
              ))}
          </div>
        </ScrollContainer>
      </div>
    </div>
  );
};

export default SystemInterviews;
