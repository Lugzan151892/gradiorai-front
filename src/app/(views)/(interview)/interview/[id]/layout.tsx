import React from 'react';
import type { Metadata } from 'next';
import { getMetaData } from '@/core/utils/meta';

export const metadata: Metadata = getMetaData({
  title: {
    default: 'Онлайн собеседование',
    template: '%s | gradiorAI. Онлайн собеседование.',
  },
  description:
    'Укажите конфигурацию параметров для составления контекста собеседования и испытайте себя в настоящем интервью сгенерированном под Вашу вакансию!',
  keywords: [
    'интервью',
    'подготовка к собеседованию',
    'техническое интервью',
    'интервью чат',
    'программирование',
    'вакансия',
    'собеседование с чатом GPT',
    'чат GPT',
    'имитация собеседования',
    'Frontend собеседование',
    'Backend собеседование',
    'DevOps собеседование',
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
});

const ResumeCheckLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return <>{children}</>;
};

export default ResumeCheckLayout;
