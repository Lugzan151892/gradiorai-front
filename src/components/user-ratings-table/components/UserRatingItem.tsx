import { cn } from '@/lib/utils';
import React from 'react';
import firstPlaceIcon from '@/components/user-ratings-table/assets/trophy.svg';
import secondPlaceIcon from '@/components/user-ratings-table/assets/2nd-place-medal.svg';
import thirdPlaceIcon from '@/components/user-ratings-table/assets/3rd-place-medal.svg';
import Image from 'next/image';
import { IUser } from '@/core/interfaces/types';
import UserAvatar from '@/components/user-avatar/UserAvatar';
import rankingIcon from '@/components/user-ratings-table/assets/ranking.svg';
import { useBreakpoint } from '@/hooks/useBreakpoints';

interface IUserRatingItemProps {
  rating: number;
  position: number;
  user?: IUser;
}

const UserRatingItem: React.FC<IUserRatingItemProps> = ({ rating, position, user }) => {
  const positionBackground = position <= 3 ? 'bg-main-purple' : 'bg-main-gray';
  const itemBackground = position <= 3 ? 'bg-secondary-gray' : 'bg-main-dark';
  const itemBorderColor = position <= 3 ? 'border-main-purple' : 'border-main-dark';
  const { isMobile } = useBreakpoint();

  const positionIcon = () => {
    if (position === 1)
      return (
        <Image
          src={firstPlaceIcon}
          width={isMobile ? 16 : 20}
          alt={'first place'}
        />
      );
    if (position === 2)
      return (
        <Image
          src={secondPlaceIcon}
          width={isMobile ? 16 : 20}
          alt={'second place'}
        />
      );
    if (position === 3)
      return (
        <Image
          src={thirdPlaceIcon}
          width={isMobile ? 16 : 20}
          alt={'third place'}
        />
      );
    return position;
  };
  return (
    <div className={cn('flex items-center w-full lg:p-6 p-3 rounded-3xl border-1', itemBackground, itemBorderColor)}>
      <div className={'flex items-center lg:gap-4 gap-2 pr-3 min-w-0 flex-1'}>
        <div
          className={cn(
            'text-main-white text-xl font-bold rounded-full lg:w-11 lg:h-11 min-w-8 min-h-8 flex items-center justify-center',
            positionBackground
          )}
        >
          {positionIcon()}
        </div>
        <UserAvatar
          userData={user}
          size={isMobile ? 40 : 60}
          alt={'profile'}
        />
        <div
          className={'text-main-white lg:text-xl text-lg font-bold truncate min-w-0'}
          title={user?.username || user?.email}
        >
          {user?.username || user?.email}
        </div>
      </div>
      <div
        className={cn(
          'ml-auto px-3 py-2 rounded-lg flex items-center justify-between min-w-[85px]',
          position <= 3 ? 'bg-main-purple' : 'bg-main-gray'
        )}
      >
        <Image
          src={rankingIcon}
          width={20}
          height={16}
          alt={'star'}
        />
        <div className={'text-main-white'}>{rating}</div>
      </div>
    </div>
  );
};

export default UserRatingItem;
