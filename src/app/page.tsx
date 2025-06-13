'use client';
import UIButton from '@/components/ui/button/UIButton';
import { useRouter } from 'next/navigation';
import React from 'react';
import AppLayout from '@/components/app-layout/AppLayout';
import CardItem from '@/components/main-page/card-item/CardItem';
// style={{ background: 'var(--main-gradient)' }}
const Home = () => {
  const router = useRouter();
  return (
    <AppLayout>
      <div className={'mt-6 w-full max-w-[1440px] mx-auto h-full'}>
        <section
          className={'h-full sm:h-[758px] rounded-b-4xl flex flex-col justify-center items-center'}
          style={{ background: 'var(--main-gradient)' }}
        >
          <div className={'w-full sm:max-w-[1100px] flex flex-col gap-6 text-center'}>
            <div className={'text-[64px] leading-[100%] font-bold'}>AI Тренажер для идеального собеседования</div>
            <div className={'text-xl'}>
              Проходите реалистичные тестовые собеседования с AI, разбирайте сложные кейсы и технические задания,
              получайте мгновенный анализ ваших ответов и тренируйтесь без ограничений
            </div>
            <div>
              <UIButton
                text={'НАЧАТЬ ТЕСТИРОВАНИЕ'}
                iconAfter={'arrow-top-right'}
                onClick={() => {
                  router.push('/');
                }}
              />
            </div>
          </div>
        </section>
        <section className={'w-full flex flex-col justify-center items-center mt-20 gap-19'}>
          <div className={'max-w-[1040px] text-2xl font-semibold text-center'}>
            gradiorAI поможет вам пройти любое собеседование с помощью персонализированных симуляций и обратной связи в
            реальном времени
          </div>
          <div className={'flex gap-6'}>
            <CardItem
              icon={'hut'}
              title={'Оценка знаний'}
              description={
                'Проверьте свою готовность к собеседованию! Наш AI-ассистент проанализирует ваши ответы и выявит слабые места, чтобы вы могли подготовиться максимально эффективно.'
              }
              additional={
                'По данным исследований, 67% кандидатов проваливают собеседования из-за недостаточной подготовки в профессиональной области.'
              }
            />
            <CardItem
              icon={'list'}
              title={'Подготовка к собеседованиям'}
              description={
                'Собеседование – это не экзамен, а переговоры о вашей будущей работе. Мы поможем вам подготовиться так, чтобы произвести впечатление уверенного профессионала.'
              }
              additional={
                'Лучшие результаты дает подготовка за 5-7 дней до собеседования, но даже 1 день занятий значительно улучшит ваши показатели.'
              }
            />
            <CardItem
              icon={'analize'}
              title={'Анализ пробелов'}
              description={
                'Ваше собеседование провалилось, но вы не понимаете почему? Наш AI-ассистент проведет детальный разбор и выявит, что нужно улучшить, чтобы в следующий раз гарантированно получить оффер.'
              }
              additional={'67% соискателей повторяют одни и те же ошибки на разных собеседованиях.'}
            />
            <CardItem
              icon={'education'}
              title={'Обучение'}
              description={
                'Собеседование – это навык, которому можно научиться. Наша система адаптивного обучения поможет вам освоить все тонкости успешного прохождения интервью за короткий срок.'
              }
              additional={'Для максимального эффекта сочетайте обучение с практикой в нашем симуляторе собеседований.'}
            />
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Home;
