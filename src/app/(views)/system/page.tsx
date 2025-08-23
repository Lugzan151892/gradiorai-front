'use client';

import UIButton from '@/components/ui/button/UIButton';
import routeChecker from '@/hoc/routeChecker';
import { useRouter } from 'next/navigation';
import React from 'react';

const SystemPage = () => {
  const router = useRouter();
  const buttons = [
    {
      id: 1,
      text: 'Логи',
      href: 'system/logs',
    },
    {
      id: 2,
      text: 'Настройки ГПТ',
      href: 'system/gpt',
    },
    {
      id: 3,
      text: 'Список вопросов',
      href: 'system/questions',
    },
    {
      id: 4,
      text: 'Изменение сущностей',
      href: 'system/edit-entities',
    },
    {
      id: 5,
      text: 'Список пользователей',
      href: 'system/users',
    },
    {
      id: 6,
      text: 'Отзывы пользователей',
      href: 'system/reviews',
    },
    {
      id: 7,
      text: 'Мои собеседования',
      href: 'system/interviews',
    },
    {
      id: 8,
      text: 'Системные файлы',
      href: 'system/files',
    },
    {
      id: 9,
      text: 'Активность пользователей',
      href: 'system/actions-log',
    },
    {
      id: 10,
      text: 'Затраты на сервис',
      href: 'system/admins-transactions',
    },
    {
      id: 11,
      text: 'Список бэкапов',
      href: 'system/backups',
    },
    {
      id: 12,
      text: 'Доска задач + аналитика',
      href: 'system/issue-board',
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
