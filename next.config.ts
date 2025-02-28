import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  /** Все ниже настройки для статики */
  output: 'export', // Включает статический экспорт
  trailingSlash: true, // Добавляет слеш в конце URL (если нужно)
  images: {
    unoptimized: true, // Отключает Next.js Image Optimization (требует сервера)
  },
};

export default nextConfig;
