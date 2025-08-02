'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
// import { RootState } from '@/store';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';
import Api from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import { openModal } from '@/store/tech/techSlice';
import { ScrollArea } from '@/components/ui/scroll-area/ScrollArea';
import { IInterview } from '@/app/(views)/(interview)/interview/types';
import CustomIcon from '@/components/ui/icon/CustomIcon';
import { normalizeServerDate } from '@/core/utils/date';
import deleteBasket from '@/assets/icons/delete_basket.svg';
import { cn } from '@/lib/utils';
import InterviewModal from './components/InterviewModal';

const ProfileResults = () => {
  // const { user } = useAppSelector((state: RootState) => state.user);
  const [interviews, setInterviews] = useState<IInterview[]>([]);
  const dispatch = useAppDispatch();
  const [currentInterview, setCurrentInterview] = useState<null | IInterview>(null);
  const [interviewModal, setInterviewModal] = useState(false);

  const loadInterviewById = async (id: string) => {
    if (!id) {
      return;
    }

    try {
      dispatch(setLoading(true));
      const result = await Api.get<{ id: string }, IInterview>('/interview/interview', { id });

      setCurrentInterview(result.payload);
      return result.payload;
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleOpenInterviewModal = async (id: string) => {
    const result = await loadInterviewById(id);

    if (result) {
      setInterviewModal(true);
    }
  };

  const loadInterviews = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<undefined, IInterview[]>('/user/interviews');

      setInterviews(result.payload);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <div className={'flex flex-col gap-6'}>
      <div>Здесь будут фильтры</div>
      <div className={'h-[calc(100dvh-250px)]'}>
        <ScrollArea>
          <div className={'flex flex-col gap-4 h-full mr-4'}>
            {interviews.map((interview) => (
              <div
                className={
                  'flex w-full gap-8 bg-main-black rounded-3xl items-center p-6 cursor-pointer border-1 border-transparent hover:border-main-gray'
                }
                key={interview.id}
                onClick={() => handleOpenInterviewModal(interview.id)}
              >
                <CustomIcon name={'calendar'} />
                <div>{normalizeServerDate(interview.created_at)}</div>
                <div>
                  <span>Статус: </span>
                  <span className={cn(interview.finished && 'text-success', !interview.finished && 'text-main-blue')}>
                    {interview.finished ? 'Пройдено' : 'В процессе'}
                  </span>
                </div>
                <Image
                  className={'ml-auto cursor-pointer'}
                  src={deleteBasket}
                  alt={'delete'}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <InterviewModal
        open={interviewModal}
        interview={currentInterview}
        onClose={() => {
          setInterviewModal(false);
          setCurrentInterview(null);
        }}
      />
    </div>
  );
};

export default ProfileResults;
