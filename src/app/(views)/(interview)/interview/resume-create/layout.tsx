import React from 'react';
import type { Metadata } from 'next';
import { getMetaData } from '@/core/utils/meta';

export const metadata: Metadata = getMetaData({
  title: {
    default: 'Создание резюме',
    template: '%s | gradiorAI. Создание резюме.',
  },
  description: 'Опишите свои навыки и получите готовое резюме с помощью обученного AI',
  keywords: [
    'проверка резюме',
    'проверка резюме к собеседованию',
    'техническая проверка резюме',
    'проверка резюме чат GPT',
    'программирование',
    'чат GPT',
    'имитация собеседования',
    'проверка резюме',
    'подготовка к собеседованию',
    'проверка резюме к собеседованию',
    'генерация проверки резюме с чатом GPT',
    'проверка знаний',
  ],
});

const ResumeCreateLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return <>{children}</>;
};

export default ResumeCreateLayout;
