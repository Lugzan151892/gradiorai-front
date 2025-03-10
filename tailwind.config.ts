import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      mobile: { min: '0px', max: '1023px' },
      desktop: { min: '1024px' },
      ...defaultTheme.screens,
    },
    extend: {
      borderWidth: {
        1: '1px',
      },
      colors: {
        background: 'var(--background)',
        white: 'var(--main-white)',
        black: 'var(--main-black)',
        green: 'var(--main-green)',
        'main-blue': 'var(--main-blue)',
        'blue-secondary': 'var(--main-blue-secondary)',
        error: 'var(--main-error)',
        success: 'var(--main-success)',
        warning: 'var(--main-warning)',
        gray: 'var(--main-gray)',
        'gray-second': 'var(--second-gray)',
        aqua: 'var(--main-aqua)',
        'text-secondary': 'var(--text-secondary)',
        'text-gray': 'var(--text-gray)',
      },
      gridTemplateRows: {
        layout: '48px 1fr',
      },
    },
  },
  plugins: [],
} satisfies Config;
