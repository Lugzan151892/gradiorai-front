'use client';

import UIButton from '@/components/ui/button/UIButton';
import routeChecker from '@/hoc/routeChecker';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ESYSTEM_PAGES } from './interfaces';

const SystemPage = () => {
  const router = useRouter();
  const buttons: {
    id: ESYSTEM_PAGES;
    text: string;
    href: string;
  }[] = [
    {
      id: ESYSTEM_PAGES.LOGS,
      text: 'Логи',
      href: 'system/logs',
    },
    {
      id: ESYSTEM_PAGES.GPT,
      text: 'Настройки ГПТ',
      href: 'system/gpt',
    },
    {
      id: ESYSTEM_PAGES.QUESTIONS,
      text: 'Список вопросов',
      href: 'system/questions',
    },
    {
      id: ESYSTEM_PAGES.ENTITIES,
      text: 'Изменение сущностей',
      href: 'system/edit-entities',
    },
    {
      id: ESYSTEM_PAGES.USERS,
      text: 'Список пользователей',
      href: 'system/users',
    },
    {
      id: ESYSTEM_PAGES.REVIEWS,
      text: 'Отзывы пользователей',
      href: 'system/reviews',
    },
    {
      id: ESYSTEM_PAGES.INTERVIEWS,
      text: 'Мои собеседования',
      href: 'system/interviews',
    },
    {
      id: ESYSTEM_PAGES.FILES,
      text: 'Системные файлы',
      href: 'system/files',
    },
    {
      id: ESYSTEM_PAGES.ACTIONS,
      text: 'Активность пользователей',
      href: 'system/actions-log',
    },
    {
      id: ESYSTEM_PAGES.TRANSACTIONS,
      text: 'Затраты на сервис',
      href: 'system/admins-transactions',
    },
    {
      id: ESYSTEM_PAGES.BACKUPS,
      text: 'Бэкапы базы данных',
      href: 'system/backups',
    },
    {
      id: ESYSTEM_PAGES.TRANSLATIONS,
      text: 'Локализация',
      href: 'system/translations',
    },
    {
      id: ESYSTEM_PAGES.ANALIZE,
      text: 'Доска задач + аналитика',
      href: 'system/issue-board',
    },
    {
      id: ESYSTEM_PAGES.FAKE_USERS,
      text: 'Фейковые пользователи',
      href: 'system/fake-users',
    },
    {
      id: ESYSTEM_PAGES.ACHIEVEMENTS,
      text: 'Достижения',
      href: 'system/achievements',
    },
  ];

  return (
    <div className={'flex items-center h-full w-full justify-center my-auto'}>
      <div
        className={'grid grid-cols-[repeat(auto-fit,minmax(350px,max-content))] justify-center w-full gap-y-2 gap-x-2'}
      >
        {buttons.map((button) => (
          <UIButton
            text={button.text}
            key={button.id}
            onClick={() => {
              router.push(button.href);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default routeChecker(SystemPage, 'adminOnly');
