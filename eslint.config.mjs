import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {},
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'next/core-web-vitals',
    'next/typescript',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ),
  {
    rules: {
      semi: ['error', 'always'], // Всегда требовать точку с запятой
      'react/jsx-max-props-per-line': ['error', { maximum: 1 }], // Один атрибут на строку
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'always', children: 'never' },
      ], // Всегда использовать {} в props, но не в дочерних элементах
      '@typescript-eslint/explicit-function-return-type': 'off', // Отключаем явное указание типа возврата
      '@typescript-eslint/no-unused-vars': ['error'], // Запрещаем неиспользуемые переменные
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Предупреждение для console.log, кроме console.warn и console.error
      'react/self-closing-comp': ['error', { component: true, html: true }], // Автозакрывающиеся теги, если нет контента
      'react/jsx-boolean-value': ['error', 'never'], // Не указывать `={true}` у булевых пропсов
      'object-shorthand': ['error', 'always'], // { data: data } => { data }
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];

export default eslintConfig;
