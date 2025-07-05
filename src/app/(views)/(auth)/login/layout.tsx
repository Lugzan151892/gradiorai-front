import { getMetaData } from '@/core/utils/meta';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = getMetaData({
  title: {
    default: 'gradiorAI. Авторизация',
    template: '%s | gradiorAI. Авторизация.',
  },
  description: 'Авторизуйтесь и получите безграничный доступ к обученному AI сервису по подготовке к собеседованиям',
  keywords: [
    'авторизация',
    'авторизация gradior',
    'вход',
    'вход gradior',
    'полный доступ',
    'полный доступ gradior',
    'без ограничений',
    'без ограничений gradior',
  ],
});

const LoginLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return <>{children}</>;
};

export default LoginLayout;
