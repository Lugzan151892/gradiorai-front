import { getMetaData } from '@/core/utils/meta';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = getMetaData({
  title: {
    default: 'gradiorAI. Регистрация',
    template: '%s | gradiorAI. Регистрация.',
  },
  description:
    'Зарегистрируйтесь и получите безграничный доступ к обученному AI сервису по подготовке к собеседованиям',
  keywords: [
    'авторизация',
    'авторизация gradior',
    'вход',
    'вход gradior',
    'регистрация',
    'регистрация gradior',
    'зарегистрироваться',
    'зарегистрироваться gradior',
    'полный доступ',
    'полный доступ gradior',
    'без ограничений',
    'без ограничений gradior',
  ],
});

const RegistrationLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return <>{children}</>;
};

export default RegistrationLayout;
