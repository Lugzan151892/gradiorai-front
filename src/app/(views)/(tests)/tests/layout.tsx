import AppHeader from '@/components/header/AppHeader';
import ScrollContainer from '@/components/ui/scrollarea/CustomScrollarea';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Тестирование',
    template: '%s | Gradior. Тестирование.',
  },
  description:
    'Настройте тесты под себя. Выбирайте направление, в котором хотите проверить свои навыки и приступайте к тестированию!',
  keywords: [
    'Gradior AI',
    'Gradior AI Тестирование',
    'подготовка к собеседованию',
    'техническое интервью',
    'AI тесты',
    'интервью чат',
    'AI генератор вопросов',
    'программирование',
    'вакансия',
    'Frontend собеседование',
    'Backend интервью',
    'DevOps интервью',
    'IT собеседования',
    'тесты',
    'подготовка к собеседованию',
    'вопросы к собеседованию',
    'генерация вопросов чатом GPT',
    'Gradior',
    'gradior ai',
    'IT',
    'проверка знаний',
    'сервис для генерации тестов по программированию',
    'тестовые вопросы по программированию',
    'вопросы для фронтенд разработчика',
    'автоматическая генерация вопросов',
  ],
};

const TestsLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return (
    <div className={'w-full h-full flex flex-col'}>
      <AppHeader />
      <div className={'flex max-w-full max-h-full h-full overflow-hidden'}>
        <ScrollContainer>
          <div className={'w-[1362px] flex grow max-w-full grow mx-auto my-2'}>
            <div className={'flex h-full w-full desktop:px-4 mobile:px-2'}>{children}</div>
          </div>
        </ScrollContainer>
      </div>
    </div>
  );
};

export default TestsLayout;
