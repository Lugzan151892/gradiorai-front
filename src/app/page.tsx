'use client';
import UIButton from '@/components/ui/button/UIButton';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import React from 'react';
import DescriptionListItem from '@/components/description-list-item/DescriptionListItem';
import CustomIcon from '@/components/ui/icon/CustomIcon';
import AppLayout from '@/components/app-layout/AppLayout';

const Home = () => {
  const router = useRouter();
  useUser();

  return (
    <AppLayout>
      <div className={'min-w-full min-h-full flex flex-col'}>
        <div
          className={
            'sm:my-auto md:max-xl:h-full md:max-xl:mt-10 sm:grid sm:grid-cols-2 sm:gap-x-2 sm:grid-rows-[max-content,max-content] md:max-xl:flex md:max-xl:flex-col md:max-xl:items-center sm:ml-36 md:max-xl:px-5'
          }
        >
          <div className={'text-white max-w-[690px]'}>
            <div className={'sm:text-5xl md:max-xl:text-3xl'}>AI Тестирование</div>
            <div className={'text-2xl md:max-xl:hidden mt-4'}>
              От новичка до эксперта - наши AI-тесты помогут вам оценить уровень знаний и найти точки роста. Выбирайте
              направление, отвечайте на вопросы, развивайтесь. Прокачивайте навыки с нами!
            </div>
            <div className={'text-xl sm:hidden mt-4'}>
              От новичка до эксперта - наши AI-тесты помогут вам оценить уровень знаний и найти точки роста.
            </div>
          </div>
          <div className={'max-w-[540px] md:max-xl:w-full sm:row-span-2 sm:mt-16 md:max-xl:mt-5 sm:mr-4'}>
            <DescriptionListItem title={'Оценка знаний'} />
            <DescriptionListItem
              className={'mt-4 md:max-xl:text-base'}
              title={'Подготовка к собеседованиям'}
            />
            <DescriptionListItem
              className={'mt-4 md:max-xl:text-base'}
              title={'Анализ пробелов'}
            />
            <DescriptionListItem
              className={'mt-4 md:max-xl:text-base'}
              title={'Обучение'}
            />
          </div>
          <div className={'grow sm:hidden'} />
          <div className={'text-white sm:mt-36 md:max-xl:mb-5 md:max-xl:mt-10 sm:max-w-[450px]'}>
            <div className={'sm:hidden text-xl'}>Начните прямо сейчас!</div>
            <div className={'md:max-xl:hidden text-2xl'}>Начните проходить тест прямо сейчас!</div>
            <div className={'mt-3 w-[202px] h-[50px] flex mx-auto'}>
              <UIButton
                className={'md:max-xl:mx-auto w-full py-1! rounded-2xl!'}
                text={'Начать'}
                onClick={() => router.push('/tests')}
              >
                <CustomIcon
                  name={'youtube'}
                  color={'var(--main-white)'}
                  size={30}
                />
              </UIButton>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
