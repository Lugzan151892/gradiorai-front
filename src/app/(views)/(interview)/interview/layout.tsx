import AppHeader from '@/components/header/AppHeader';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'AI Интервью',
    template: '%s | Gradior. AI Интервью.',
  },
  description: 'Испытайте себя в настоящем интервью сгенерированном под Вашу вакансию!',
  keywords: [
    'Gradior AI',
    'Gradior AI Тестирование',
    'Gradior AI Интервью',
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

const InterviewLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return (
    <div className={'w-full h-full flex flex-col'}>
      <AppHeader />
      <div className={'flex max-w-full max-h-full h-full'}>{children}</div>
    </div>
  );
};

export default InterviewLayout;
