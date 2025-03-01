import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderWidth: {
        1: '1px',
      },
      colors: {
        background: 'var(--background)',
        white: 'var(--main-white)',
        'main-blue': 'var(--main-blue)',
        'blue-secondary': 'var(--main-blue-secondary)',
        error: 'var(--main-error)',
        success: 'var(--main-success)',
        warning: 'var(--main-warning)',
        gray: 'var(--main-gray)',
        aqua: 'var(--main-aqua)',
        'text-secondary': 'var(--text-secondary)',
      },
      gridTemplateRows: {
        layout: '48px 1fr',
      },
    },
  },
  plugins: [],
} satisfies Config;
