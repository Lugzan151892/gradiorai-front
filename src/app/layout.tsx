import React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import GlobalLoader from '@/features/loading/GlobalBusy';
import Providers from '@/app/providers';
import ErrorModal from '@/features/error-modal/ErrorModal';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Gradior',
    template: '%s | Gradior',
  },
  description:
    'От новичка до эксперта - наши AI-тесты помогут вам оценить уровень знаний и найти точки роста. Выбирайте направление, отвечайте на вопросы, развивайтесь. Прокачивайте навыки с нами!',
  keywords: [
    'Gradior AI',
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
  authors: [{ name: 'Gradior Team', url: 'https://gradiorai.ru/' }],
  creator: 'Gradior Team',
  metadataBase: new URL('https://gradiorai.ru/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Gradior — Ваш ИИ-помощник в подготовке к собеседованиям',
    description:
      'От новичка до эксперта - наши AI-тесты помогут вам оценить уровень знаний и найти точки роста. Выбирайте направление, отвечайте на вопросы, развивайтесь. Прокачивайте навыки с нами!',
    url: 'https://gradiorai.ru/',
    siteName: 'Gradior',
    locale: 'ru_RU',
    type: 'website',
  },
  category: 'technology',
  applicationName: 'Gradior',
  generator: 'Next.js',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'yandex-verification': '93977f41416139bf',
    'twitter:card': 'summary_large_image',
  },
};

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return (
    <html lang={'en'}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full overflow-hidden bg-[url("../assets/images/main-bg.png")] bg-no-repeat bg-cover bg-left`}
      >
        <Providers>
          {children}
          <GlobalLoader />
          <ErrorModal />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
