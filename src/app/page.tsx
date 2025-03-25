'use client';
import CustomButton from '@/components/ui/button/CustomButton';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import React from 'react';
import AdminWrapper from '@/components/admin-wrapper/AdminWrapper';
import HeaderUserState from '@/components/header/components/HeaderUserState';
import DescriptionListItem from '@/components/description-list-item/DescriptionListItem';
import CustomIcon from '@/components/ui/icon/CustomIcon';

const Home = () => {
  const router = useRouter();
  useUser();
  return (
    <div className={'flex flex-col w-full h-full '}>
      <main
        className={
          'grid desktop:grid-cols-[1fr,max-content] mobile:grid-cols-[1fr] mobile:grid-rows-[max-content,1fr] w-full h-full bg-[url("../assets/images/background.png")] bg-no-repeat bg-cover bg-left'
        }
      >
        <div
          className={
            'flex flex-col w-full h-full text-white desktop:pr-16 desktop:pl-32 mobile:px-4 desktop:w-[100%] mobile:order-2'
          }
        >
          <div className={'flex flex-col items-center h-full desktop:w-[40%]'}>
            <div className={'desktop:mt-30 mobile:mt-3 text-6xl mobile:text-3xl text-center mt-10'}>
              Добро пожаловать
            </div>
            <div className={'text-6xl mobile:text-3xl text-center'}>в Skill Test</div>
            <div className={'text-2xl mobile:text-base mt-16 mobile:mt-10 text-center'}>
              Наши AI-тесты помогут вам оценить уровень знаний, выявить слабые места и подготовиться к новым вызовам!
            </div>
            <div className={'mt-14 mobile:mt-5 max-w-md w-full'}>
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
            <div className={'grow'} />
            <div className={'mobile:mt-auto flex mx-auto flex-col items-center mb-6'}>
              <div className={'text-2xl mobile:text-base mt-2'}>Начните проходить тест прямо сейчас!</div>
              <div className={'mt-3 w-[202px] h-[73px] flex'}>
                <CustomButton
                  className={'mobile:mx-auto w-full py-3 !rounded-2xl'}
                  type={'success'}
                  text={'Начать'}
                  onClick={() => router.push('/tests')}
                >
                  <CustomIcon
                    name={'youtube'}
                    size={40}
                  />
                </CustomButton>
              </div>
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
        <div className={'ml-auto px-2 pr-5 py-4 mobile:order-1'}>
          <HeaderUserState />
        </div>
      </main>
    </div>
  );
};

export default Home;
