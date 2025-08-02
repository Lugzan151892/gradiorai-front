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

const ProfileResults = () => {
  // const { user } = useAppSelector((state: RootState) => state.user);
  const [interviews, setInterviews] = useState<IInterview[]>([]);
  const dispatch = useAppDispatch();

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
      <div>tut filtry</div>
      <div className={'flex-1 overflow-hidden max-h-[calc(100vh-300px)]'}>
        <ScrollArea>
          {/* <div className={'flex flex-col h-full'}> */}
          {interviews.map((interview) => (
            <div
              className={'flex w-full bg-main-dark rounded-3xl items-center p-6'}
              key={interview.id}
            >
              <CustomIcon name={'calendar'} />
              <div>{normalizeServerDate(interview.created_at)}</div>
              <div>{interview.id}</div>
              <Image
                className={'ml-auto cursor-pointer'}
                src={deleteBasket}
                alt={'delete'}
              />
            </div>
          ))}
          {/* </div> */}
        </ScrollArea>
      </div>
    </div>
  );
};

export default ProfileResults;
