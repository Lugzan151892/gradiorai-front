import React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import GlobalLoader from '@/features/loading/GlobalBusy';
import Providers from '@/app/providers';
import ErrorModal from '@/features/error-modal/ErrorModal';
import UserInitializer from '@/components/user-initializer/UserInitializer';

const interDisplay = localFont({
  src: [
    {
      path: '../assets/fonts/InterDisplay-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/InterDisplay-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../assets/fonts/InterDisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/InterDisplay-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../assets/fonts/InterDisplay-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/InterDisplay-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../assets/fonts/InterDisplay-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/InterDisplay-SemiBoldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../assets/fonts/InterDisplay-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/InterDisplay-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-inter-display',
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
        className={`${interDisplay.className} antialiased bg-[#030b1b] w-full h-full overflow-hidden leading-[100%] font-normal text-sm tracking-[0]`}
      >
        <Providers>
          {children}
          <GlobalLoader />
          <ErrorModal />
          <UserInitializer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
