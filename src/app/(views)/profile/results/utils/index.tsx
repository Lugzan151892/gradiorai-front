import CustomIcon from '@/components/ui/icon/CustomIcon';
import { Trans } from '@/i18n/Trans';
import React from 'react';

export enum EINTERVIEW_STATUS_FILTER {
  ALL = 1,
  SUCCESS,
  FAILED,
  IN_PROGRESS,
}
export enum EINTERVIEW_TIME_FILTER {
  ALL = 'ALL',
  TODAY = '1d',
  WEEK = '7d',
  MONTH = '30d',
  THREE_MONTHS = '90d',
}
export enum EINTERVIEW_RESULT_FILTER {
  ALL = 1,
  EIGHT_AND_MORE,
  FROM_FIVE_TO_EIGHT,
  FOUR_AND_LESS,
}

export const statusOptions = [
  {
    id: EINTERVIEW_STATUS_FILTER.ALL,
    item: (
      <Trans
        ns={'common'}
        k={'common_all'}
      />
    ),
  },
  {
    id: EINTERVIEW_STATUS_FILTER.SUCCESS,
    item: (
      <Trans
        ns={'profile'}
        k={'profile_interview_success'}
      />
    ),
  },
  {
    id: EINTERVIEW_STATUS_FILTER.FAILED,
    item: (
      <Trans
        ns={'profile'}
        k={'profile_interview_failed'}
      />
    ),
  },
  {
    id: EINTERVIEW_STATUS_FILTER.IN_PROGRESS,
    item: (
      <Trans
        ns={'profile'}
        k={'profile_interview_in_progress'}
      />
    ),
  },
];

export const timeOptions = [
  {
    id: EINTERVIEW_TIME_FILTER.ALL,
    text: 'За все время',
    item: (
      <Trans
        ns={'profile'}
        k={'profile_time_all'}
      />
    ),
  },
  {
    id: EINTERVIEW_TIME_FILTER.TODAY,
    text: 'Сегодня',
    item: (
      <Trans
        ns={'profile'}
        k={'profile_time_today'}
      />
    ),
  },
  {
    id: EINTERVIEW_TIME_FILTER.WEEK,
    text: 'За последнюю неделю',
    item: (
      <Trans
        ns={'profile'}
        k={'profile_time_week'}
      />
    ),
  },
  {
    id: EINTERVIEW_TIME_FILTER.MONTH,
    text: 'За последний месяц',
    item: (
      <Trans
        ns={'profile'}
        k={'profile_time_month'}
      />
    ),
  },
  {
    id: EINTERVIEW_TIME_FILTER.THREE_MONTHS,
    text: 'За 3 месяца',
    item: (
      <Trans
        ns={'profile'}
        k={'profile_time_three_months'}
      />
    ),
  },
];

export const resultOptions = [
  {
    id: EINTERVIEW_RESULT_FILTER.ALL,
    text: 'Любая',
    item: (
      <Trans
        ns={'profile'}
        k={'profile_result_any'}
      />
    ),
  },
  {
    id: EINTERVIEW_RESULT_FILTER.EIGHT_AND_MORE,
    text: '8.0 и выше',
    item: (
      <div className={'flex items-center gap-3'}>
        <CustomIcon
          color={'var(--main-yellow)'}
          name={'result-star'}
        />
        <Trans
          ns={'profile'}
          k={'profile_result_eight_and_more'}
        />
      </div>
    ),
  },
  {
    id: EINTERVIEW_RESULT_FILTER.FROM_FIVE_TO_EIGHT,
    text: 'от 5.0 до 8.0',
    item: (
      <div className={'flex items-center gap-3'}>
        <CustomIcon
          color={'var(--main-yellow)'}
          name={'result-star'}
        />
        <Trans
          ns={'profile'}
          k={'profile_result_five_to_eight'}
        />
      </div>
    ),
  },
  {
    id: EINTERVIEW_RESULT_FILTER.FOUR_AND_LESS,
    text: '4.0 и ниже',
    item: (
      <div className={'flex items-center gap-3'}>
        <CustomIcon
          color={'var(--main-yellow)'}
          name={'result-star'}
        />
        <Trans
          ns={'profile'}
          k={'profile_result_four_and_less'}
        />
      </div>
    ),
  },
];
