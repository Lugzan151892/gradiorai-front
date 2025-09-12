import CustomIcon from '@/components/ui/icon/CustomIcon';
import { IAchievementWithProgress, IAchievement } from '@/core/interfaces/types';
import { normalizeServerDate } from '@/core/utils/date';
import { getPublicFileLink } from '@/core/utils/files';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

interface AchievementItemProps {
  achievement: IAchievementWithProgress | IAchievement;
  className?: string;
}

const AchievementItem: React.FC<AchievementItemProps> = ({ achievement, className }) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-[10px] bg-main-black border-2 border-main-purple p-6 w-[max-content]',
        className,
        !achievement.userProgress?.completed && 'border-text-disabled'
      )}
    >
      <div className={'flex gap-2'}>
        <div className={'w-12 h-12 flex items-center justify-center bg-main-purple rounded-full'}>
          <Image
            src={getPublicFileLink(achievement.image?.path || '')}
            alt={achievement.title}
            width={24}
            height={24}
          />
        </div>
        <div className={'flex flex-col'}>
          <div className={'flex gap-2 items-center'}>
            <div className={'text-lg'}>{achievement.title}</div>
            <div className={'flex gap-1 items-center text-main-purple ml-auto'}>
              <CustomIcon
                name={'star'}
                size={20}
              />
              {achievement.reward_points}
            </div>
          </div>
          <div>
            <div className={'text-text-disabled'}>{achievement.description}</div>
          </div>
        </div>
      </div>
      {!!achievement.userProgress?.completed && (
        <div className={'flex gap-2 justify-end text-text-disabled text-xs'}>
          {normalizeServerDate(achievement.userProgress?.completed_at || '', 'DD.MM.YYYY')}
        </div>
      )}
    </div>
  );
};

export default AchievementItem;
