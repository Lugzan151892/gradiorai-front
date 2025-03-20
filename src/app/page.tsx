'use client';
import CustomButton from '@/components/ui/button/CustomButton';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import React from 'react';
import AdminWrapper from '@/components/admin-wrapper/AdminWrapper';
import HeaderUserState from '@/components/header/components/HeaderUserState';

const Home = () => {
  const router = useRouter();
  useUser();
  return (
    <div className={'flex flex-col w-full h-full'}>
      <main className={'flex flex-col w-full h-full bg-main-blue'}>
        <div className={'ml-auto px-2 py-4'}>
          <HeaderUserState />
        </div>
        <div className={'flex flex-col w-full h-full text-white px-16 desktop:w-[40%]'}>
          <div className={'flex flex-col h-full'}>
            <div className={'mt-30 text-6xl mobile:text-3xl text-center mt-10 mx-auto'}>Добро пожаловать</div>
            <div className={'mt-30 text-6xl mobile:text-3xl text-center'}>в Skill Test</div>
            <div className={'text-2xl mobile:text-base mt-4'}>
              Наши тесты помогут вам оценить уровень знаний, выявить слабые места и подготовиться к новым вызовам!
            </div>
            <div className={'grow'} />
            <div className={'mobile:mt-auto mx-auto flex mb-6'}>
              <CustomButton
                className={'mt-9 mobile:mx-auto max-w-sm'}
                type={'success'}
                text={'Начать'}
                onClick={() => router.push('/tests')}
              />
            </div>
            <AdminWrapper className={'max-w-[max-content] mt-auto mb-4'}>
              <CustomButton
                type={'error'}
                text={'Система'}
                onClick={() => router.push('/system')}
              />
            </AdminWrapper>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
