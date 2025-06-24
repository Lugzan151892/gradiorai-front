'use client';
import UIButton from '@/components/ui/button/UIButton';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import AppLayout from '@/components/app-layout/AppLayout';
import CardItem from '@/components/main-page/card-item/CardItem';
// import CardWithImage from '@/components/main-page/card-with-image/CardWithImage';
import robot from '@/components/main-page/assets/robot.png';
import Image from 'next/image';
import abstract from '@/components/main-page/assets/abstract.svg';
import abstract2 from '@/components/main-page/assets/abstract2.svg';
import butterfly from '@/components/main-page/assets/butterfly.svg';
import donut from '@/components/main-page/assets/donut.svg';
import mail from '@/components/main-page/assets/mail.svg';
// import telegramm from '@/components/main-page/assets/telegramm.svg';
import CustomIcon from '@/components/ui/icon/CustomIcon';
import chatExample from '@/components/main-page/assets/chat-example.png';
import { useAppSelector } from '@/hooks/redux';
import { RootState } from '@/store';
import { getRandomElement } from '@/core/utils/array';

const Home = () => {
  const router = useRouter();

  const { user } = useAppSelector((state: RootState) => state.user);

  const [mainButton, setMainButton] = useState({
    id: 1,
    text: 'ПОПРОБОВАТЬ УНИКАЛЬНЫЕ ТЕСТЫ',
    onClick: () => router.push('/tests'),
    unauth: true,
  });

  useEffect(() => {
    const buttons = [
      {
        id: 1,
        text: 'ПОПРОБОВАТЬ УНИКАЛЬНЫЕ ТЕСТЫ',
        onClick: () => router.push('/tests'),
        unauth: true,
      },
      {
        id: 2,
        text: 'ПОСОРЕВНОВАТЬСЯ С AI В СОБЕСЕДОВАНИИ',
        onClick: () => router.push('/interview'),
        unauth: false,
      },
      {
        id: 3,
        text: 'ПРОВЕРИТЬ АКТУЛАЛЬНОСТЬ СВОЕГО РЕЗЮМЕ',
        onClick: () => router.push('/interview/resume-check'),
        unauth: false,
      },
    ];

    const filteredButtons = buttons.filter((el) => !!user || el.unauth);

    const newButton = getRandomElement(filteredButtons);

    if (newButton) {
      setMainButton(newButton);
    }
  }, [user, router]);

  return (
    <AppLayout>
      <div className={'lg:mt-6 w-full max-w-[1440px] mx-auto'}>
        <section
          className={'lg:h-[758px] h-[544px] rounded-b-4xl flex flex-col justify-center items-center px-4'}
          style={{ background: 'var(--main-gradient)' }}
        >
          <div className={'max-w-full lg:max-w-[1100px] flex flex-col gap-6 text-center'}>
            <div className={'lg:text-[64px] text-[40px] leading-[100%] font-bold'}>Подготовка к собеседованию с AI</div>
            <div className={'lg:text-3xl text-base'}>Искусственный интелект, который улучшает твои знания</div>
            <div className={'lg:text-lg text-base'}>
              Пройди собеседование с актуальными вопросами, получи теоретические знания в разных направлениях, оцени
              свое резюме. Наши инструменты дадут тебе преимущество перед другими кандидатами.
            </div>
            <div>
              <UIButton
                text={mainButton.text}
                iconAfter={'arrow-top-right'}
                onClick={mainButton.onClick}
              />
            </div>
          </div>
        </section>
        <section className={'w-full flex flex-col justify-center items-center mt-20 gap-19 px-4'}>
          <div className={'max-w-[1040px] lg:text-2xl text-xl font-semibold text-center'}>
            gradiorAI поможет вам пройти любое собеседование с помощью персонализированных симуляций и обратной связи в
            реальном времени
          </div>
          <div className={'flex xl:flex-nowrap flex-wrap justify-center gap-6'}>
            <div className={'flex sm:flex-nowrap flex-wrap gap-6'}>
              <CardItem
                icon={'item-hut'}
                title={'Оценка знаний'}
                description={
                  'Проверьте свою готовность к собеседованию! Наш AI-ассистент проанализирует ваши ответы и выявит слабые места, чтобы вы могли подготовиться максимально эффективно.'
                }
                additional={
                  'По данным исследований, 67% кандидатов проваливают собеседования из-за недостаточной подготовки в профессиональной области.'
                }
              />
              <CardItem
                icon={'item-list'}
                title={'Подготовка к собеседованиям'}
                description={
                  'Собеседование – это не экзамен, а переговоры о вашей будущей работе. Мы поможем вам подготовиться так, чтобы произвести впечатление уверенного профессионала.'
                }
                additional={
                  'Лучшие результаты дает подготовка за 5-7 дней до собеседования, но даже 1 день занятий значительно улучшит ваши показатели.'
                }
              />
            </div>
            <div className={'flex sm:flex-nowrap flex-wrap gap-6'}>
              <CardItem
                icon={'item-analize'}
                title={'Анализ пробелов'}
                description={
                  'Ваше собеседование провалилось, но вы не понимаете почему? Наш AI-ассистент проведет детальный разбор и выявит, что нужно улучшить, чтобы в следующий раз гарантированно получить оффер.'
                }
                additional={'67% соискателей повторяют одни и те же ошибки на разных собеседованиях.'}
              />
              <CardItem
                icon={'item-education'}
                title={'Обучение'}
                description={
                  'Собеседование – это навык, которому можно научиться. Наша система адаптивного обучения поможет вам освоить все тонкости успешного прохождения интервью за короткий срок.'
                }
                additional={
                  'Для максимального эффекта сочетайте обучение с практикой в нашем симуляторе собеседований.'
                }
              />
            </div>
          </div>
        </section>
        {/** Временно скрыто */}
        {/* <section
          className={'lg:h-[454px] rounded-b-4xl flex justify-center items-center lg:mt-[140px] mt-18 px-4 py-12'}
          style={{ background: 'var(--main-gradient)' }}
        >
          <div className={'w-full lg:max-w-[808px] flex flex-col gap-6 lg:text-left text-center'}>
            <div className={'text-4xl lg:text-5xl leading-[100%] font-bold'}>Генерация с AI </div>
            <div className={'lg:text-xl text-base'}>
              Превратите свой опыт в убедительные ответы с помощью нашего интеллектуального помощника. Просто укажите
              параметры – и получите готовые варианты ответов, которые впечатлят любого работодателя
            </div>
            <Image
              className={'lg:hidden flex mx-auto'}
              height={300}
              src={chatExample}
              alt={'chat'}
            />
            <div>
              <UIButton
                text={'НАЧАТЬ'}
                iconAfter={'arrow-top-right'}
                onClick={() => {
                  router.push('/');
                }}
              />
            </div>
          </div>
          <Image
            className={'hidden lg:flex'}
            height={300}
            src={chatExample}
            alt={'chat'}
          />
        </section> */}
        {/* <section className={'flex flex-col lg:mt-20 mt-19 lg:gap-19 gap-8'}>
          <div className={'lg:text-2xl text-xl font-semibold text-center'}>Преимущества нашего AI-генератора</div>
          <div className={'flex gap-4 flex-wrap px-4'}>
            <CardWithImage
              className={'lg:w-[49%] w-full'}
              title={'Режим улучшения – доработка ваших черновиков'}
              text={
                'Загрузите свой текст и получите: оптимизацию формулировок, добавление профессиональных терминов и исправление стилистики'
              }
              image={'arm'}
            />
            <CardWithImage
              className={'lg:w-[49%] w-full'}
              title={'Отраслевые шаблоны для 25+ профессий'}
              text={'Готовые шаблоны с профессиональной лексикой, включая редкие специализации IT'}
              image={'world'}
            />
            <CardWithImage
              className={'lg:w-[49%] w-full'}
              title={'Умная адаптация под уровень позиции'}
              text={'Наш ИИ анализирует требования вакансии и автоматически подстраивает ответы под нужный уровень'}
              image={'romb'}
            />
            <CardWithImage
              className={'lg:w-[49%] w-full'}
              title={'Генерация вопросов работодателю'}
              text={'10+ умных вопросов под вашу сферу, включая редкие специализации'}
              image={'question'}
            />
          </div>
        </section> */}
        <section
          className={
            'lg:h-[454px] h-[665px] rounded-b-4xl flex justify-center items-center lg:mt-[140px] mt-18 px-4 py-12'
          }
          style={{ background: 'var(--main-gradient)' }}
        >
          <div className={'w-full lg:max-w-[660px] flex flex-col gap-6 lg:text-left text-center'}>
            <div className={'text-4xl lg:text-5xl leading-[100%] font-bold'}>Собеседование</div>
            <div className={'lg:text-xl text-base'}>
              Текст-чат, как в ChatGPT, но с фокусом на реалистичных сценариях собеседований. Чат-бот имитирует диалог с
              рекрутером или техническим специалистом с мгновенной обратной связью
            </div>
            <Image
              className={'lg:hidden flex mx-auto'}
              height={300}
              src={chatExample}
              alt={'chat'}
            />
            <div>
              <UIButton
                text={'ПРОЙТИ СОБЕСЕДОВАНИЕ'}
                iconAfter={'arrow-top-right'}
                onClick={() => {
                  router.push('/interview');
                }}
              />
            </div>
          </div>
          <Image
            className={'hidden lg:flex ml-4'}
            src={chatExample}
            height={300}
            alt={'chat'}
          />
        </section>
        <section className={'flex flex-col lg:mt-20 mt-18 lg:gap-19 gap-8 px-4'}>
          <div className={'lg:text-2xl text-xl font-semibold text-center'}>
            Почему это работает лучше, чем самостоятельная подготовка?
          </div>
          <div className={'lg:grid lg:grid-cols-[40%_1fr] lg:grid-rows-2 flex flex-col gap-6'}>
            <div
              className={
                'col-start-1 col-end-2 row-start-1 row-end-3 bg-main-black rounded-3xl p-6 relative lg:min-h-auto min-h-[292px]'
              }
            >
              <div className={'flex flex-col gap-4'}>
                <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>
                  AI не просто слушает — он понимает контекст
                </div>
                <div className={'lg:max-w-[254px] max-w-[70%] lg:text-lg text-sm leading-[24px]'}>
                  Глубокая семантическая обработка: алгоритм оценивает, насколько ваш ответ соответствует
                  профессиональным стандартам, а не просто «звучит красиво».
                </div>
              </div>
              <div className={'absolute bottom-0 right-0'}>
                <div className={'relative w-[250px] h-[250px]'}>
                  <div
                    className={'w-[250px] h-[250px] rounded-full bg-[#9073CB] blur-[120px] absolute right-0 bottom-0'}
                  />
                  <Image
                    className={'absolute -right-4 bottom-0'}
                    src={robot}
                    alt={'robot'}
                    height={220}
                    width={207}
                  />
                </div>
              </div>
            </div>
            <div
              className={
                'col-start-2 col-end-3 row-start-1 row-end-2 flex flex-col gap-4 bg-main-black rounded-3xl p-6'
              }
            >
              <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>
                Реалистичные условия без стресса реального отказа
              </div>
              <div className={'lg:text-lg text-sm leading-[24px]'}>
                Адаптивная сложность: если вы справляетесь, AI усложняет вопросы (как настоящий интервьюер). Провокации:
                симуляция неудобных моментов.
              </div>
            </div>
            <div
              className={
                'col-start-2 col-end-3 row-start-2 row-end-3 flex flex-col gap-4 bg-main-black rounded-3xl p-6'
              }
            >
              <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>
                Экономия времени за счёт точного фокуса
              </div>
              <div className={'lg:text-lg text-sm leading-[24px]'}>
                Концентрация на важном: вместо просмотра 10 видео на YouTube только релевантные знания. Мгновенный
                фидбек: не нужно ждать проверки — оценка и советы появляются сразу.
              </div>
            </div>
          </div>
        </section>
        <section
          className={'lg:h-[454px] rounded-b-4xl flex justify-center items-center lg:mt-[140px] mt-18 px-4 py-12'}
          style={{ background: 'var(--main-gradient)' }}
        >
          <div className={'w-full lg:max-w-[606px] flex flex-col gap-6 lg:text-left text-center'}>
            <div className={'text-4xl lg:text-5xl leading-[100%] font-bold'}>Тестирование</div>
            <div className={'lg:text-xl text-base'}>
              Прежде чем идти на интервью, узнайте свои сильные и слабые стороны. Наши тесты помогут вам объективно
              оценить уровень подготовки и закрыть пробелы
            </div>
            <Image
              className={'lg:hidden flex mx-auto'}
              height={300}
              src={chatExample}
              alt={'chat'}
            />
            <div>
              <UIButton
                text={'НАЧАТЬ ТЕСТ'}
                iconAfter={'arrow-top-right'}
                onClick={() => {
                  router.push('/tests');
                }}
              />
            </div>
          </div>
          <Image
            className={'hidden lg:flex ml-4'}
            height={300}
            src={chatExample}
            alt={'chat'}
          />
        </section>
        <section className={'lg:mt-20 mt-18 flex lg:flex-row flex-col items-center h-full px-4'}>
          <div
            className={'w-full flex flex-col p-6 gap-4 border-1 border-main-gray rounded-3xl w-1/5 lg:min-h-[242px]'}
          >
            <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>Выберите уровень</div>
            <div className={'lg:text-lg text-sm leading-[24px]'}>
              Начинающий (Junior), Опытный (Middle) или Экспертный (Senior)
            </div>
          </div>
          <div className={'border-1 border-main-gray border-dashed lg:w-1/15 lg:h-0 h-8 w-0'} />
          <div
            className={'w-full flex flex-col p-6 gap-4 border-1 border-main-gray rounded-3xl w-1/5 lg:min-h-[242px]'}
          >
            <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>Настройте специализацию</div>
            <div className={'lg:text-lg text-sm leading-[24px]'}>
              15+ технических специализаций (IT, дизайн, продуктовый менеджмент)
            </div>
          </div>
          <div className={'border-1 border-main-gray border-dashed lg:w-1/15 lg:h-0 h-8 w-0'} />
          <div
            className={'w-full flex flex-col p-6 gap-4 border-1 border-main-gray rounded-3xl w-1/5 lg:min-h-[242px]'}
          >
            <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>Определите направление</div>
            <div className={'lg:text-lg text-sm leading-[24px]'}>
              Выберите направление в вашей специализации для эффективного обучения
            </div>
          </div>
          <div className={'border-1 border-main-gray border-dashed lg:w-1/15 lg:h-0 h-8 w-0'} />
          <div
            className={'w-full flex flex-col p-6 gap-4 border-1 border-main-gray rounded-3xl w-1/5 lg:min-h-[242px]'}
          >
            <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>Пройдите тест</div>
            <div className={'lg:text-lg text-sm leading-[24px]'}>
              После настройки AI сгенерирует персонализированный тест
            </div>
          </div>
        </section>
        <section
          className={'lg:h-[454px] h-[544px] rounded-b-4xl flex justify-center items-center lg:mt-[140px] mt-18'}
          style={{ background: 'var(--main-gradient)' }}
        >
          <div className={'w-full lg:max-w-[808px] flex flex-col gap-6 text-center'}>
            <div className={'lg:text-5xl text-4xl leading-[100%] font-bold'}>Проверка резюме</div>
            <div className={'lg:text-xl text-base'}>
              Резюме — это ваша визитная карточка для работодателя. AI проверит документ и предложит рекомендации по
              улучшению
            </div>
            <div>
              <UIButton
                text={'ПРОВЕРИТЬ РЕЗЮМЕ'}
                iconAfter={'arrow-top-right'}
                onClick={() => {
                  router.push('/interview/resume-check');
                }}
              />
            </div>
          </div>
        </section>
        <section className={'flex flex-col lg:mt-20 mt-18 lg:gap-19 gap-8 px-4'}>
          <div className={'text-2xl font-semibold text-center'}>Как это работает?</div>
          <div className={'lg:grid lg:grid-cols-2 lg:grid-rows-[158px_158px] flex flex-col gap-6'}>
            <div className={'flex border-1 border-main-gray rounded-3xl p-4 relative overflow-hidden'}>
              <div className={'flex flex-col gap-4 max-w-[70%]'}>
                <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>Загрузите резюме</div>
                <div className={'lg:text-lg text-sm leading-[24px]'}>
                  Поддерживаемые форматы: PDF, DOCX, TXT. Можно вставить текст вручную или загрузить из LinkedIn
                </div>
              </div>
              <Image
                className={'absolute lg:right-0 lg:bottom-0 -right-15'}
                src={butterfly}
                alt={'abstract'}
              />
            </div>
            <div className={'flex border-1 border-main-gray rounded-3xl p-4 relative overflow-hidden'}>
              <div className={'flex flex-col gap-4 max-w-[70%]'}>
                <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>Выберите вакансию</div>
                <div className={'lg:text-lg text-sm leading-[24px]'}>
                  Укажите должность (например, Data Analyst) или загрузите описание вакансии. AI определит необходмые
                  требования и навыки
                </div>
              </div>
              <Image
                className={'absolute lg:right-0 lg:bottom-3 -right-10 -bottom-2'}
                src={abstract}
                alt={'abstract'}
              />
            </div>
            <div className={'flex border-1 border-main-gray rounded-3xl p-4 relative overflow-hidden'}>
              <div className={'flex flex-col gap-4 max-w-[70%]'}>
                <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>ATS-оптимизация</div>
                <div className={'lg:text-lg text-sm leading-[24px]'}>
                  AI определит, содержит ли резюме ключевые слова из вакансии. Проверит структуру и оценит вероятность
                  отсеивания
                </div>
              </div>
              <Image
                className={'absolute lg:right-0 lg:bottom-3 -bottom-2 -right-2'}
                src={donut}
                alt={'abstract'}
              />
            </div>
            <div className={'flex border-1 border-main-gray rounded-3xl p-4 relative overflow-hidden'}>
              <div className={'flex flex-col gap-4 max-w-[70%]'}>
                <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>Отчет с улучшениями</div>
                <div className={'lg:text-lg text-sm leading-[24px]'}>
                  AI проверит резюме и подскажет, что нужно улучшить. Вы получите оптимизированную версию, которую можно
                  скачать.
                </div>
              </div>
              <Image
                className={'absolute lg:right-0 lg:bottom-3 -right-1 -bottom-2'}
                src={abstract2}
                alt={'abstract'}
              />
            </div>
          </div>
        </section>
        {/* <section
          className={'lg:h-[454px] h-[544px] rounded-b-4xl flex justify-center items-center lg:mt-[140px] mt-18'}
          style={{ background: 'var(--main-gradient)' }}
        >
          <div className={'w-full lg:max-w-[808px] flex flex-col items-center gap-6 text-center'}>
            <div className={'lg:text-xl text-base'}>
              gradiorAI – ваш умный помощник в подготовке к собеседованиям. Тренируйтесь с AI, проходите симуляции,
              улучшайте резюме и получайте офферы быстрее!
            </div>
            <div>
              <UIButton
                text={'ПРОВЕРИТЬ РЕЗЮМЕ'}
                iconAfter={'arrow-top-right'}
                onClick={() => {
                  router.push('/');
                }}
              />
            </div>
          </div>
        </section> */}
      </div>
      <footer className={'lg:h-[300px] bg-main-black flex lg:items-center lg:justify-center mt-25 p-4'}>
        <div className={'flex lg:flex-row flex-col lg:gap-30 gap-12'}>
          <div className={'flex flex-col gap-8'}>
            <div className={'flex'}>
              <CustomIcon
                name={'owl'}
                size={24}
                color={'var(--color-text-disabled)'}
              />
              <div
                className={'ml-2 cursor-pointer text-white text-base'}
                onClick={() => router.push('/')}
              >
                gradiorAI
              </div>
            </div>
            <div className={'grow'} />
            {/* <div className={'flex flex-col gap-3 text-sm font-light text-text-low-white'}>
                <div>Политика конфиденциальности</div>
                <div>Условия использования</div>
              </div> */}
            <div className={'text-sm font-light text-text-low-white'}>2025. Gradior. Все права защищены</div>
          </div>
          <div className={'flex flex-col gap-8'}>
            <div className={'font-medium text-base leading-[24px]'}>ИНСТРУМЕНТЫ</div>
            <div className={'flex flex-col gap-3 text-sm font-light text-text-low-white'}>
              {/* <div className={'cursor-pointer hover:underline hover:text-main-purple'}>Генерация с AI</div> */}
              <div
                className={'cursor-pointer hover:underline hover:text-main-purple'}
                onClick={() => router.push('/interview')}
              >
                Собеседование
              </div>
              <div
                className={'cursor-pointer hover:underline hover:text-main-purple'}
                onClick={() => router.push('/tests')}
              >
                Тестирование
              </div>
              <div
                className={'cursor-pointer hover:underline hover:text-main-purple'}
                onClick={() => router.push('/interview/resume-check')}
              >
                Проверка резюме
              </div>
            </div>
          </div>
          <div className={'flex flex-col gap-8'}>
            <div className={'font-medium text-base leading-[24px]'}>КОНТАКТЫ</div>
            <div className={'flex flex-col gap-3 text-sm font-light text-text-low-white'}>
              <div className={'flex gap-3 items-center'}>
                <Image
                  src={mail}
                  alt={'mail'}
                  width={32}
                  height={32}
                />
                <a
                  href={'mailto: support@gradiorai.ru'}
                  className={'hover:underline hover:text-main-purple'}
                >
                  Email: support@gradior.ru
                </a>
              </div>
              {/* <div className={'flex gap-3 items-center'}>
                <Image
                  src={telegramm}
                  alt={'telegramm'}
                  width={32}
                  height={32}
                />
                <a
                  href={'https://t.me/gradior_support'}
                  className={'hover:underline hover:text-main-purple'}
                >
                  Telegram: @gradior_support
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </footer>
    </AppLayout>
  );
};

export default Home;
