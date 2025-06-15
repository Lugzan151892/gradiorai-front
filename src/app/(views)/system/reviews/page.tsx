'use client';

import Api from '@/core/api/api';
import { IUserReview } from '@/core/interfaces/types';
import { normalizeServerDate } from '@/core/utils/date';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area/ScrollArea';

const SystemReviews = () => {
  const [reviews, setReviews] = useState<IUserReview[]>([]);
  const dispatch = useAppDispatch();

  const loadReviews = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<any, IUserReview[]>('/user/reviews');

      setReviews(result.payload);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const getStatusText = (review: IUserReview) => {
    if (review.saved_by) {
      return review.saved_by.admin ? 'ADMIN' : 'USER';
    }

    return 'UNKNOWN';
  };

  return (
    <div className={'flex flex-col h-full items-center'}>
      <div className={'text-5xl mb-5'}>Список отзывов от пользователей</div>
      <div className={'w-full px-4 mt-4 h-full overflow-hidden'}>
        <ScrollArea>
          <div className={'mb-4 relative bg-modal'}>
            <div className={'sticky top-0 left-0 border grid grid-cols-[5%_12%_15%_54%_7%_7%] min-h-8 border bg-modal'}>
              <div className={'text-2xl border-r text-center'}>ID</div>
              <div className={'text-2xl border-r px-2'}>Дата отзыва</div>
              <div className={'text-2xl border-r px-2'}>Email или IP</div>
              <div className={'text-2xl border-r px-2'}>Текст отзыва</div>
              <div className={'text-2xl text-center border-r px-2'}>Рейтинг</div>
              <div className={'text-2xl text-center'}>STATUS</div>
            </div>
            {reviews.length &&
              reviews.map((review) => (
                <div
                  key={review.id}
                  className={'border w-full grid grid-cols-[5%_12%_15%_54%_7%_7%]'}
                >
                  <div className={'text-xl border-r text-center'}>{review.id}</div>
                  <div className={'text-xl border-r px-2'}>{normalizeServerDate(review.created_at)}</div>
                  <div className={'text-xl border-r px-2'}>{review.saved_by?.email || review.ip}</div>
                  <div className={'text-xl border-r px-2'}>{review.text}</div>
                  <div className={'text-xl text-center border-r px-2'}>{review.rating || 'NULL'}</div>
                  <div className={'text-xl text-center'}>{getStatusText(review)}</div>
                </div>
              ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SystemReviews;
