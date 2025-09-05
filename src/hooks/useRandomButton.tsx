import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Trans } from '@/i18n/Trans';
import { getRandomElement } from '@/core/utils/array';

export interface ButtonItem {
  id: number;
  text: string;
  onClick: () => void;
  unauth: boolean;
  children: React.ReactNode;
}

interface UseRandomButtonOptions {
  user?: any;
  customButtons?: ButtonItem[];
}

export const useRandomButton = ({ user, customButtons }: UseRandomButtonOptions = {}) => {
  const router = useRouter();

  const defaultButtons = useMemo<ButtonItem[]>(() => [
    {
      id: 1,
      text: 'ПРОЙТИ ТЕСТИРОВАНИЕ',
      onClick: () => router.push('/tests'),
      unauth: true,
      children: (
        <Trans
          ns={'main'}
          k={'main_do_tests'}
          format={'uppercase'}
        />
      ),
    },
    {
      id: 2,
      text: 'ПРОЙТИ СОБЕСЕДОВАНИЕ',
      onClick: () => router.push('/interview'),
      unauth: false,
      children: (
        <Trans
          ns={'main'}
          k={'main_do_interview'}
          format={'uppercase'}
        />
      ),
    },
    {
      id: 3,
      text: 'ПРОВЕРИТЬ РЕЗЮМЕ',
      onClick: () => router.push('/interview/resume-check'),
      unauth: false,
      children: (
        <Trans
          ns={'main'}
          k={'main_do_check_cv'}
          format={'uppercase'}
        />
      ),
    },
    {
      id: 4,
      text: 'СОЗДАТЬ РЕЗЮМЕ',
      onClick: () => router.push('/interview/resume-create'),
      unauth: false,
      children: (
        <Trans
          ns={'main'}
          k={'main_do_create_cv'}
          format={'uppercase'}
        />
      ),
    },
  ], [router]);

  const [selectedButton, setSelectedButton] = useState<ButtonItem>(() => 
    customButtons?.[0] || defaultButtons[0]
  );

  useEffect(() => {
    const buttons = customButtons || defaultButtons;
    const filteredButtons = buttons.filter((el: ButtonItem) => !!user || el.unauth);
    const newButton = getRandomElement(filteredButtons);

    if (newButton) {
      setSelectedButton(newButton);
    }
  }, [user, customButtons, defaultButtons]);

  return {
    selectedButton,
    setSelectedButton,
    allButtons: customButtons || defaultButtons,
    filteredButtons: (customButtons || defaultButtons).filter((el: ButtonItem) => !!user || el.unauth),
  };
};
