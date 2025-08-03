import CustomIcon from '@/components/ui/icon/CustomIcon';
import React from 'react';

export enum EINTERVIEW_STATUS_FILTER {
  ALL = 1,
  SUCCESS,
  FAILED,
  IN_PROGRESS,
}
export enum EINTERVIEW_TIME_FILTER {
  ALL = 1,
  TODAY,
  WEEK,
  MONTH,
  THREE_MONTHS,
}
export enum EINTERVIEW_RESULT_FILTER {
  ALL = 1,
  FIVE,
  FOUR,
  THREE_AND_LESS,
}

export const statusOptions = [
  {
    id: EINTERVIEW_STATUS_FILTER.ALL,
    text: 'Все',
  },
  {
    id: EINTERVIEW_STATUS_FILTER.SUCCESS,
    text: 'Успешно пройдено',
  },
  {
    id: EINTERVIEW_STATUS_FILTER.FAILED,
    text: 'Не пройдено',
  },
  {
    id: EINTERVIEW_STATUS_FILTER.IN_PROGRESS,
    text: 'Не завершено',
  },
];

export const timeOptions = [
  {
    id: EINTERVIEW_TIME_FILTER.ALL,
    text: 'За все время',
  },
  {
    id: EINTERVIEW_TIME_FILTER.TODAY,
    text: 'Сегодня',
  },
  {
    id: EINTERVIEW_TIME_FILTER.WEEK,
    text: 'За последнюю неделю',
  },
  {
    id: EINTERVIEW_TIME_FILTER.MONTH,
    text: 'За последний месяц',
  },
  {
    id: EINTERVIEW_TIME_FILTER.THREE_MONTHS,
    text: 'За 3 месяца',
  },
];

export const resultOptions = [
  {
    id: EINTERVIEW_RESULT_FILTER.ALL,
    text: 'Любая',
  },
  {
    id: EINTERVIEW_RESULT_FILTER.FIVE,
    text: '5.0',
    item: (
      <div className={'flex items-center gap-3'}>
        <CustomIcon
          color={'var(--main-yellow)'}
          name={'result-star'}
        />
        <div>5.0</div>
      </div>
    ),
  },
  {
    id: EINTERVIEW_RESULT_FILTER.FOUR,
    text: '4.0',
    item: (
      <div className={'flex items-center gap-3'}>
        <CustomIcon
          color={'var(--main-yellow)'}
          name={'result-star'}
        />
        <div>4.0</div>
      </div>
    ),
  },
  {
    id: EINTERVIEW_RESULT_FILTER.THREE_AND_LESS,
    text: '3.0 и ниже',
    item: (
      <div className={'flex items-center gap-3'}>
        <CustomIcon
          color={'var(--main-yellow)'}
          name={'result-star'}
        />
        <div>3.0 и ниже</div>
      </div>
    ),
  },
];
