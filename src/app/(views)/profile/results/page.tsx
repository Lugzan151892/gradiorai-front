'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
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
import { useConfirm } from '@/features/confirm-provider/ConfirmProvider';
import UISelect from '@/components/ui/select/UISelect';
import UILabel from '@/components/ui/label/UILabel';
import { resultOptions, statusOptions, timeOptions } from './utils';

const ProfileResults = () => {
  const confirm = useConfirm();
  const [interviews, setInterviews] = useState<IInterview[]>([]);
  const dispatch = useAppDispatch();
  const [currentInterview, setCurrentInterview] = useState<null | IInterview>(null);
  const [interviewModal, setInterviewModal] = useState(false);

  const [statusFilter, setStatusFilter] = useState(1);
  const [timeFilter, setTimeFilter] = useState(1);
  const [resultFilter, setResultFilter] = useState(1);

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

  const handleDeleteInterview = async (id: string) => {
    if (!id) return;

    const checkConfirm = await confirm({
      caption: 'Удалить собеседование?',
      content: 'Вы действительно хотите удалить это собеседование? Это действие необратимо.',
      type: 'warning',
      buttons: [
        { key: 'yes', label: 'Удалить', type: 'danger' },
        { key: 'no', label: 'Отмена', type: 'default' },
      ],
    });

    if (checkConfirm !== 'yes') return;

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
      <div>
        <div className={'flex gap-4'}>
          <div className={'flex flex-col gap-2'}>
            <UILabel>Статус</UILabel>
            <UISelect
              value={statusFilter}
              options={statusOptions}
              optionType={'number'}
              onChange={(val) => setStatusFilter(val as number)}
            />
          </div>
          <div className={'flex flex-col gap-2'}>
            <UILabel>Дата</UILabel>
            <UISelect
              value={timeFilter}
              options={timeOptions}
              optionType={'number'}
              onChange={(val) => setTimeFilter(val as number)}
            />
          </div>
          <div className={'flex flex-col gap-2'}>
            <UILabel>Оценка</UILabel>
            <UISelect
              value={resultFilter}
              options={resultOptions}
              optionType={'number'}
              onChange={(val) => setResultFilter(val as number)}
            />
          </div>
        </div>
      </div>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteInterview(interview.id);
                  }}
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
