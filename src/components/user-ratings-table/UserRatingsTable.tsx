import { Trans } from '@/i18n/Trans';
import React, { useEffect, useState } from 'react';
import UserRatingItem from './components/UserRatingItem';
import { IUserRating } from '@/core/interfaces/types';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import Api from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import { IFakeUser } from '@/app/(views)/system/interfaces';

const UserRatingsTable = () => {
  const [usersRating, setUsersRating] = useState<IUserRating[]>([]);
  const dispatch = useAppDispatch();
  /** @todo: Перевести на реальные данные */
  const averageRating = 3027;

  useEffect(() => {
    const fetchUsersRating = async () => {
      try {
        dispatch(setLoading(true));
        const response = await Api.getSilent<undefined, { data: IUserRating[] }>('/user/rating/get-users-rating');
        const fakeUsers = await Api.getSilent<undefined, IFakeUser[]>('/user/rating/fake-users');
        if (response.success && fakeUsers.success) {
          const users = [
            ...response.payload.data,
            ...fakeUsers.payload.map((user) => ({
              ...user,
              user_id: 0,
              user: { id: user.id, email: user.name, admin: false },
              tests_rating: user.total_rating,
              interviews_rating: user.total_rating,
            })),
          ];
          users.sort((a, b) => b.total_rating - a.total_rating);
          setUsersRating(users.slice(0, 10) as IUserRating[]);
        }
      } catch (e) {
        errorHandler(e, dispatch);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchUsersRating();
  }, [dispatch]);

  return (
    <div className={'max-w-[1440px] mx-auto'}>
      <div className={'lg:text-2xl text-xl font-semibold text-center'}>
        <Trans
          ns={'main'}
          k={'main_users_rating_title'}
        />
      </div>
      <div className={'bg-main-black border-1 border-main-gray rounded-3xl lg:p-6 p-3 mt-14'}>
        <div className={'flex flex-col gap-4'}>
          {usersRating.map((item, index) => (
            <UserRatingItem
              key={item.id}
              rating={item.total_rating}
              position={index + 1}
              user={item.user}
            />
          ))}
        </div>
        <div className={'w-full border-1 border-main-gray my-7'} />
        <div className={'flex lg:gap-40 gap-10 items-center justify-center'}>
          <div className={'flex flex-col gap-2'}>
            <div className={'text-4xl font-bold text-main-purple text-center'}>{usersRating.length}</div>
            <div className={'text-text-disabled text-lg'}>
              <Trans
                ns={'main'}
                k={'main_users_rating_users_amount_title'}
              />
            </div>
          </div>
          <div className={'flex flex-col gap-2'}>
            <div className={'text-4xl font-bold text-main-purple text-center'}>{averageRating}</div>
            <div className={'text-text-disabled text-lg'}>
              <Trans
                ns={'main'}
                k={'main_users_rating_users_average_title'}
              />
            </div>
          </div>
          <div className={'flex flex-col gap-2'}>
            <div className={'text-4xl font-bold text-main-purple text-center'}>{usersRating[0]?.total_rating}</div>
            <div className={'text-text-disabled text-lg'}>
              <Trans
                ns={'main'}
                k={'main_users_rating_max_rating_title'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRatingsTable;
