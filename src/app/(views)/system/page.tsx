'use client';

import CustomButton from '@/components/ui/button/CustomButton';
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
  ];
  return (
    <div className={'flex items-center h-full w-full justify-center'}>
      <div
        className={
          'grid grid-flow-col auto-cols-auto-fit auto-cols-[minmax(150px,max-content)] justify-center w-full gap-y-2 gap-x-2'
        }
      >
        {buttons.map((button) => (
          <CustomButton
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
