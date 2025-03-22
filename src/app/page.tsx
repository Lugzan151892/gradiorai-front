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
          'flex flex-col w-full h-full bg-[url("../assets/images/background.png")] bg-no-repeat bg-cover bg-left'
        }
      >
        <div className={'ml-auto px-2 pr-5 py-4'}>
          <HeaderUserState />
        </div>
        <div className={'flex flex-col w-full h-full text-white desktop:px-16 mobile:px-4 desktop:w-[40%]'}>
          <div className={'flex flex-col h-full'}>
            <div className={'mt-30 text-6xl mobile:text-3xl text-center mt-10 mx-auto'}>Добро пожаловать</div>
            <div className={'mt-30 text-6xl mobile:text-3xl text-center'}>в Skill Test</div>
            <div className={'text-2xl mobile:text-base mt-4'}>
              Наши AI-тесты помогут вам оценить уровень знаний, выявить слабые места и подготовиться к новым вызовам!
            </div>
            <div className={'desktop:ml-4 mt-4 max-w-md'}>
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
              <div className={'w-52 flex'}>
                <CustomButton
                  className={'mt-3 mobile:mx-auto w-full py-3 rounded-2xl'}
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
      </main>
    </div>
  );
};

export default Home;
