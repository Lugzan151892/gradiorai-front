import type { Metadata } from 'next';

export const getMetaData = (data?: Partial<Metadata>) => {
  const isProduction = process.env.IS_PRODUCTION === 'true';

  const metadata: Metadata = {
    title: data?.title || {
      default: 'gradiorAI. Подготовка к собеседованию с AI',
      template: '%s | gradiorAI',
    },
    description:
      data?.description ||
      'От новичка до эксперта - наши AI-тесты помогут вам оценить уровень знаний и найти точки роста. Выбирайте направление, отвечайте на вопросы, развивайтесь. Прокачивайте навыки с нами!',
    keywords: [
      'gradiorAI',
      'Gradior AI',
      'генерация тестов',
      'генерация собеседования',
      'реальное собеседование',
      'gradiorAI пройти собеседование',
      'gradior пройти собеседование',
      'gradiorAI пройти тестирование',
      'gradior пройти тестирование',
      'gradiorAI проверить резюме',
      'gradior проверить резюме',
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
      ...(data?.keywords ? data.keywords : []),
    ],
    authors: [{ name: 'Gradior Team', url: 'https://gradiorai.ru/' }],
    creator: 'Gradior Team',
    metadataBase: new URL('https://gradiorai.ru/'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: data?.openGraph?.title || 'gradiorAI — Ваш ИИ-помощник в подготовке к собеседованиям',
      description:
        data?.openGraph?.description ||
        'От новичка до эксперта - наши AI-тесты помогут вам оценить уровень знаний и найти точки роста. Выбирайте направление, отвечайте на вопросы, развивайтесь. Прокачивайте навыки с нами!',
      url: 'https://gradiorai.ru/',
      siteName: 'gradiorAI',
      locale: 'ru_RU',
      type: 'website',
    },
    category: 'technology',
    applicationName: 'gradiorAI',
    generator: 'Next.js',
    robots: {
      index: isProduction,
      follow: isProduction,
      nocache: false,
      googleBot: {
        index: isProduction,
        follow: isProduction,
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

  return metadata;
};
