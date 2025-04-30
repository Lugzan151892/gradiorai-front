'use client';
import CustomButton from '@/components/ui/button/CustomButton';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import React from 'react';
import DescriptionListItem from '@/components/description-list-item/DescriptionListItem';
import CustomIcon from '@/components/ui/icon/CustomIcon';
import AppHeader from '@/components/header/AppHeader';

const Home = () => {
  const router = useRouter();
  useUser();

  return (
    <div className={'min-w-full min-h-full flex flex-col'}>
      <AppHeader />
      <div
        className={
          'desktop:my-auto mobile:h-full mobile:mt-10 desktop:grid desktop:grid-cols-2 desktop:gap-x-2 desktop:grid-rows-[max-content,max-content] mobile:flex mobile:flex-col mobile:items-center desktop:ml-36 mobile:px-5'
        }
      >
        <div className={'text-white max-w-[690px]'}>
          <div className={'desktop:text-5xl mobile:text-3xl'}>AI Тестирование</div>
          <div className={'text-2xl mobile:hidden mt-4'}>
            От новичка до эксперта - наши AI-тесты помогут вам оценить уровень знаний и найти точки роста. Выбирайте
            направление, отвечайте на вопросы, развивайтесь. Прокачивайте навыки с нами!
          </div>
          <div className={'text-xl desktop:hidden mt-4'}>
            От новичка до эксперта - наши AI-тесты помогут вам оценить уровень знаний и найти точки роста.
          </div>
        </div>
        <div className={'max-w-[540px] mobile:w-full desktop:row-span-2 desktop:mt-16 mobile:mt-5 desktop:mr-4'}>
          <DescriptionListItem title={'Оценка знаний'} />
          <DescriptionListItem
            className={'mt-4 mobile:text-base'}
            title={'Подготовка к собеседованиям'}
          />
          <DescriptionListItem
            className={'mt-4 mobile:text-base'}
            title={'Анализ пробелов'}
          />
          <DescriptionListItem
            className={'mt-4 mobile:text-base'}
            title={'Обучение'}
          />
        </div>
        <div className={'grow desktop:hidden'} />
        <div className={'text-white desktop:mt-36 mobile:mb-5 mobile:mt-5 desktop:max-w-[450px]'}>
          <div className={'desktop:hidden text-xl'}>Начните прямо сейчас!</div>
          <div className={'mobile:hidden text-2xl'}>Начните проходить тест прямо сейчас!</div>
          <div className={'mt-3 w-[202px] h-[50px] flex mx-auto'}>
            <CustomButton
              className={'mobile:mx-auto w-full !py-1 !rounded-2xl'}
              type={'success'}
              text={'Начать'}
              onClick={() => router.push('/tests')}
            >
              <CustomIcon
                name={'youtube'}
                color={'var(--main-white)'}
                size={30}
              />
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
