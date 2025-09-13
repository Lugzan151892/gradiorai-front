import CustomIcon from '@/components/ui/icon/CustomIcon';
import { EACHIEVEMENT_TYPE, IAchievement } from '@/core/interfaces/types';
import { normalizeServerDate } from '@/core/utils/date';
import { getPublicFileLink } from '@/core/utils/files';
import { Trans } from '@/i18n/Trans';
import { cn } from '@/lib/utils';
import React from 'react';
interface AchievementItemProps {
  achievement: IAchievement;
  className?: string;
}

const AchievementItem: React.FC<AchievementItemProps> = ({ achievement, className }) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-[10px] bg-main-black border-2 border-main-purple p-6 w-[max-content] max-w-[350px]',
        className,
        !achievement.userProgress?.completed && 'border-text-disabled'
      )}
    >
      <div className={'flex gap-2'}>
        <div
          className={cn(
            'min-w-12 min-h-12 max-w-12 max-h-12 flex items-center justify-center bg-main-purple rounded-full',
            !achievement.userProgress?.completed && 'bg-main-gray'
          )}
        >
          <div
            className={cn('w-6 h-6', achievement.userProgress?.completed ? 'bg-main-white' : 'bg-main-dark')}
            style={{
              maskImage: `url(${getPublicFileLink(achievement.image?.path || '')})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskImage: `url(${getPublicFileLink(achievement.image?.path || '')})`,
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
            }}
          />
        </div>
        <div className={'flex flex-col'}>
          <div className={'flex gap-2 items-center'}>
            <Trans
              className={'text-lg'}
              ns={'achievement'}
              k={achievement.title as any}
            />
            <div className={'flex gap-1 items-center text-main-purple ml-auto text-lg'}>
              <CustomIcon
                name={'star'}
                size={20}
                color={'var(--main-purple)'}
              />
              {achievement.reward_points}
            </div>
          </div>
          <div>
            <div className={'text-text-disabled'}>
              <Trans
                className={'text-lg'}
                ns={'achievement'}
                k={achievement.description as any}
              />
            </div>
          </div>
        </div>
      </div>
      {!!achievement.userProgress?.completed && (
        <div className={'flex gap-2 justify-end text-text-disabled text-xs'}>
          {normalizeServerDate(achievement.userProgress?.completed_at || '', 'DD.MM.YYYY')}
        </div>
      )}

      {!achievement.userProgress?.completed &&
        achievement.target &&
        achievement.type === EACHIEVEMENT_TYPE.PROGRESS && (
          <div className={'flex flex-col gap-2 mt-auto'}>
            <div className={'flex justify-between text-xs text-text-disabled'}>
              <span>Прогресс</span>
              <span>
                {achievement.userProgress?.progress || 0} / {achievement.target}
              </span>
            </div>
            <div className={'w-full bg-main-gray rounded-full h-2'}>
              <div
                className={'bg-main-purple h-2 rounded-full transition-all duration-300'}
                style={{
                  width: `${Math.min(((achievement.userProgress?.progress || 0) / achievement.target) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        )}
    </div>
  );
};

export default AchievementItem;
