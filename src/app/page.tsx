'use client';
import AppHeader from '@/components/header/AppHeader';
import CustomButton from '@/components/ui/button/CustomButton';
import { useUser } from '@/hooks/useUser';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import background from '@/assets/images/main-page-bg.png';

const Home = () => {
  const router = useRouter();
  useUser();
  return (
    <div className={'flex flex-col w-full h-full'}>
      <AppHeader />
      <main className={'flex flex-col w-full h-full'}>
        <div
          className={
            'flex flex-col w-full h-full desktop:bg-[url("../assets/images/main-page-bg.png")] sm:bg-white md:bg-white text-black bg-no-repeat bg-contain bg-right px-10'
          }
        >
          <div className={'flex flex-col h-full desktop:w-2/4'}>
            <div className={'mt-30 text-4xl mt-10'}>
              Добро пожаловать в Skill Test
            </div>
            <div className={'desktop:hidden text-lg mt-3'}>
              Проверь свои знания и прокачай навыки!
            </div>
            <div className={'mobile:hidden text-lg mt-3'}>
              Хочешь узнать, насколько ты хорош в своей сфере?
            </div>
            <div className={'mobile:hidden text-lg mt-4'}>
              Наши тесты помогут тебе оценить уровень знаний, выявить слабые
              места и подготовиться к новым вызовам!
            </div>
            <Image
              className={'lg:hidden'}
              src={background}
              alt={'background'}
            />
            <div className={'mobile:mt-auto mobile:mx-auto mobile:flex mb-4'}>
              <CustomButton
                className={'mt-9 mobile:mx-auto max-w-sm'}
                type={'success'}
                text={'Начать'}
                onClick={() => router.push('/tests')}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
