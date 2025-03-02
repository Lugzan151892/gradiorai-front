'use client';
import AppHeader from '@/components/header/AppHeader';
import CustomButton from '@/components/ui/button/CustomButton';
import { useRouter } from 'next/navigation';
import React from 'react';

const Home = () => {
  const router = useRouter();

  return (
    <div className={'flex flex-col w-full h-full'}>
      <AppHeader />
      <main className={'flex flex-col w-full h-full'}>
        <div
          className={
            'flex flex-col w-full h-full bg-[url("../assets/images/main-page-bg.png")] text-black bg-no-repeat bg-contain bg-right px-10'
          }
        >
          <div className={'mt-30 text-4xl mt-10'}>
            Добро пожаловать в Skill Test
          </div>
          <div className={'text-lg mt-3'}>
            Хочешь узнать, насколько ты хорош в своей сфере?
          </div>
          <div className={'text-lg mt-4'}>
            Наши тесты помогут тебе оценить уровень знаний, выявить слабые места
            и подготовиться к новым вызовам!
          </div>
          <div>
            <CustomButton
              className={'mt-9'}
              text={'Начать'}
              onClick={() => router.push('/tests')}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
