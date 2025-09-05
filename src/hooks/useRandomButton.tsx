import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Trans } from '@/i18n/Trans';
import { getRandomElement } from '@/core/utils/array';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setSelectedButton } from '@/store/randomButton/randomButtonSlice';
import { RootState } from '@/store';

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
  const dispatch = useAppDispatch();
  const { selectedButton, isInitialized } = useAppSelector((state: RootState) => state.randomButton);

  const defaultButtons = useMemo<ButtonItem[]>(
    () => [
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
    ],
    [router]
  );

  useEffect(() => {
    if (!isInitialized) {
      const buttons = customButtons || defaultButtons;
      const filteredButtons = buttons.filter((el: ButtonItem) => !!user || el.unauth);
      const newButton = getRandomElement(filteredButtons);

      if (newButton) {
        dispatch(setSelectedButton(newButton));
      }
    }
  }, [isInitialized, user, customButtons, defaultButtons, dispatch]);

  useEffect(() => {
    if (isInitialized) {
      const buttons = customButtons || defaultButtons;
      const filteredButtons = buttons.filter((el: ButtonItem) => !!user || el.unauth);
      const newButton = getRandomElement(filteredButtons);

      if (newButton && (!selectedButton || newButton.id !== selectedButton.id)) {
        dispatch(setSelectedButton(newButton));
      }
    }
  }, [user, customButtons, isInitialized, selectedButton, defaultButtons, dispatch]);

  const allButtons = customButtons || defaultButtons;
  const filteredButtons = allButtons.filter((el: ButtonItem) => !!user || el.unauth);

  return {
    selectedButton: selectedButton || allButtons[0],
    setSelectedButton: (button: ButtonItem) => dispatch(setSelectedButton(button)),
    allButtons,
    filteredButtons,
  };
};
