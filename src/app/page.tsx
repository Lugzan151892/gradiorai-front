'use client';
import UIButton from '@/components/ui/button/UIButton';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import AppLayout from '@/components/app-layout/AppLayout';
import CardItem from '@/components/main-page/card-item/CardItem';
import robot from '@/components/main-page/assets/robot.png';
import Image from 'next/image';
import abstract2 from '@/components/main-page/assets/abstract2.svg';
import butterfly from '@/components/main-page/assets/butterfly.svg';
import donut from '@/components/main-page/assets/donut.svg';
import mail from '@/components/main-page/assets/mail.svg';
import chatExample from '@/components/main-page/assets/chat-example.png';
import testExample from '@/components/main-page/assets/test-example.png';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { RootState } from '@/store';
import { getRandomElement } from '@/core/utils/array';
import logoTransparentFull from '@/assets/icons/gradior_transparent_full.png';
import AboutBlock from '@/components/main-page/about-block/AboutBlock';
import errorHandler from '@/core/utils/error/errorHandler';
import Api from '@/core/api/api';
import { setLoading } from '@/features/loading/loadingSlice';
import { getPublicFileLink } from '@/core/utils/files';

const Home = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state: RootState) => state.user);

  const [mainButton, setMainButton] = useState({
    id: 1,
    text: 'ПРОЙТИ ТЕСТИРОВАНИЕ',
    onClick: () => router.push('/tests'),
    unauth: true,
  });

  const [privatePolicy, setPrivatePolicy] = useState<any>(null);
  const [personalTerms, setPersonalTerms] = useState<any>(null);

  const loadSystemFiles = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const privatePolicyFile = await Api.getSilent<undefined, any>('/system/files/privacy_policy');
      setPrivatePolicy(privatePolicyFile.payload);
      const personalTermsFile = await Api.getSilent<undefined, any[]>('/system/files/personal_terms');
      setPersonalTerms(personalTermsFile.payload);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    loadSystemFiles();
  }, [loadSystemFiles]);

  useEffect(() => {
    const buttons = [
      {
        id: 1,
        text: 'ПРОЙТИ ТЕСТИРОВАНИЕ',
        onClick: () => router.push('/tests'),
        unauth: true,
      },
      {
        id: 2,
        text: 'ПРОЙТИ СОБЕСЕДОВАНИЕ',
        onClick: () => router.push('/interview'),
        unauth: false,
      },
      {
        id: 3,
        text: 'ПРОВЕРИТЬ РЕЗЮМЕ',
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
      <div id={'home'} />
      <div className={'lg:mt-6 w-full max-w-[1440px] mx-auto'}>
        <section
          className={'lg:h-[758px] h-[544px] rounded-b-4xl flex flex-col justify-center items-center px-4'}
          style={{ background: 'var(--main-gradient)' }}
        >
          <div className={'max-w-full lg:max-w-[1100px] flex flex-col gap-6 text-center'}>
            <div className={'lg:text-[64px] text-[40px] leading-[100%] font-bold'}>Подготовка к собеседованию с AI</div>
            <div className={'lg:text-3xl text-base'}>Искусственный интеллект, который улучшает твои знания</div>
            <div className={'lg:text-lg text-base'}>
              Пройди собеседование с актуальными вопросами, получи теоретические знания в разных направлениях, оцени
              свое резюме. Наши инструменты дадут тебе преимущество перед другими кандидатами.
            </div>
            <div className={'mt-8'}>
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
            Наши инструменты помогут Вам пройти любое собеседование с помощью персонализированных симуляций и обратной
            связи в реальном времени
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
                additional={'73% соискателей повторяют одни и те же ошибки на разных собеседованиях.'}
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
                  Глубокая семантическая обработка — алгоритм оценивает, насколько ваш ответ соответствует
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
                Адаптивная сложность, если вы справляетесь, AI усложняет вопросы (как настоящий интервьюер).
                Реалистичная симуляция неудобных моментов.
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
                Концентрация на важном, вместо просмотра 10 видео на YouTube только релевантные знания. Мгновенный
                фидбек, не нужно ждать проверки — оценка и советы появляются сразу.
              </div>
            </div>
          </div>
          <div
            className={'mb-20'}
            id={'about'}
          />
        </section>
        <section className={'lg:pt-[80px] pt-18 px-4'}>
          <div className={'text-base text-text-disabled text-center font-bold mb-1 tracking-wide'}>О нас</div>
          <div className={'text-4xl font-bold mb-6 tracking-wide text-center'}>Подробнее про gradiorAI</div>
          <div className={'flex flex-wrap gap-6'}>
            <div className={'p-6 border border-main-gray rounded-3xl w-full'}>
              <div className={'text-xl font-bold'}>Почему нам доверяют подготовку к собеседованиям</div>
              <div className={'mt-4 lg:text-lg text-sm'}>
                Gradior AI помогает уверенно проходить технические интервью, используя силу ИИ. Мы создаем инструменты,
                которые учат на практике, анализируют ошибки и превращают их в рост.
              </div>
            </div>
            <div className={'p-6 border border-main-gray rounded-3xl w-full'}>
              <div className={'text-xl font-bold'}>Как все началось</div>
              <div className={'mt-4 lg:text-lg text-sm'}>
                Gradior AI — команда разработчиков, дизайнеров и карьерных экспертов. Мы сами сталкивались с трудными
                интервью, паникой и ощущением «я не готов». Поэтому мы объединились, чтобы создать сервис, который
                тренирует тебя как личный ментор. Без воды. Только практика.
              </div>
            </div>
          </div>
          <div className={'flex mt-10 gap-6 lg:flex-nowrap flex-wrap'}>
            <div className={'flex gap-6 w-full'}>
              <div
                className={'p-6 border border-main-gray rounded-3xl w-full min-h-[180px] flex flex-col justify-between'}
              >
                <div className={'text-4xl font-bold text-main-purple'}>87%</div>
                <div className={'lg:text-sm text-xs'}>
                  пользователей чувствуют себя увереннее на реальных собеседованиях
                </div>
              </div>
              <div
                className={'p-6 border border-main-gray rounded-3xl w-full min-h-[180px] flex flex-col justify-between'}
              >
                <div className={'text-4xl font-bold text-main-purple'}>+24%</div>
                <div className={'lg:text-sm text-xs'}>рост шансов пройти отбор после использования Gradior AI</div>
              </div>
            </div>
            <div className={'flex gap-6 w-full'}>
              <div
                className={'p-6 border border-main-gray rounded-3xl w-full min-h-[180px] flex flex-col justify-between'}
              >
                <div className={'text-4xl font-bold text-main-purple'}>&gt; 5000</div>
                <div className={'lg:text-sm text-xs'}>смоделированных собеседований</div>
              </div>
              <div
                className={'p-6 border border-main-gray rounded-3xl w-full min-h-[180px] flex flex-col justify-between'}
              >
                <div className={'text-4xl font-bold text-main-purple'}>до 5х</div>
                <div className={'lg:text-sm text-xs'}>ускорения подготовки по сравнению с самостоятельной работой</div>
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
              src={testExample}
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
            src={testExample}
            alt={'chat'}
          />
        </section>
        <section className={'lg:mt-20 mt-18 flex lg:flex-row flex-col items-center h-full px-4'}>
          <div
            className={'w-full flex flex-col p-6 gap-4 border-1 border-main-gray rounded-3xl w-1/5 lg:min-h-[242px]'}
          >
            <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>Выберите уровень</div>
            <div className={'lg:text-lg text-sm leading-[24px] flex flex-col gap-1'}>
              <span>Начинающий (Junior)</span>
              <span>Опытный (Middle)</span>
              <span>Экспертный (Senior)</span>
            </div>
          </div>
          <div className={'border-1 border-main-gray border-dashed lg:w-1/15 lg:h-0 h-8 w-0'} />
          <div
            className={'w-full flex flex-col p-6 gap-4 border-1 border-main-gray rounded-3xl w-1/5 lg:min-h-[242px]'}
          >
            <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>Настройте специализацию</div>
            <div className={'lg:text-lg text-sm leading-[24px]'}>
              15+ технических специализаций для IT, дизайн, продуктовый менеджмент, Front, Back, QA и других
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
              После настройки конфигурации AI сгенерирует персонализированный тест
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
                <div className={'lg:text-lg text-sm leading-[24px]'}>Поддерживаемые форматы: PDF, DOCX.</div>
              </div>
              <Image
                className={'absolute lg:right-0 lg:bottom-0 -right-15'}
                src={butterfly}
                alt={'abstract'}
              />
            </div>
            <div className={'flex border-1 border-main-gray rounded-3xl p-4 relative overflow-hidden'}>
              <div className={'flex flex-col gap-4 max-w-[70%]'}>
                <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>Отчет с улучшениями</div>
                <div className={'lg:text-lg text-sm leading-[24px]'}>
                  AI проверит резюме и подскажет, что нужно улучшить.
                </div>
              </div>
              <Image
                className={'absolute lg:right-0 lg:bottom-3 -right-1 -bottom-2'}
                src={abstract2}
                alt={'abstract'}
              />
            </div>
            <div className={'flex border-1 border-main-gray rounded-3xl p-4 relative overflow-hidden col-span-full'}>
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
          </div>
        </section>
        <section
          className={'lg:h-[454px] h-[544px] rounded-b-4xl flex justify-center items-center lg:mt-[140px] mt-18'}
          style={{ background: 'var(--main-gradient)' }}
        >
          <div className={'w-full lg:max-w-[808px] flex flex-col gap-6 text-center'}>
            <div className={'lg:text-5xl text-4xl leading-[100%] font-bold'}>Создание резюме</div>
            <div className={'lg:text-xl text-base'}>
              Если у вас нет резюме, мы создадим текст для него на основе предоставленных данных
            </div>
            <div>
              <UIButton
                text={'СОЗДАТЬ РЕЗЮМЕ'}
                iconAfter={'arrow-top-right'}
                onClick={() => {
                  router.push('/interview/resume-create');
                }}
              />
            </div>
            <div
              className={'mt-10'}
              id={'faq'}
            />
          </div>
        </section>
        <section className={'lg:pt-[80px] pt-18 px-4'}>
          <div className={'text-base text-text-disabled text-center font-bold mb-1 tracking-wide'}>FAQ</div>
          <div className={'text-4xl font-bold mb-6 tracking-wide text-center'}>Часто задаваемые вопросы</div>
          <div className={'flex flex-col gap-4'}>
            <AboutBlock
              title={'Что представляет собой ваша платформа?'}
              content={
                'Наша платформа помогает подготовиться к собеседованиям с помощью онлайн-собеседований и онлайн-тестов, основанных на AI, делает анализ резюме с рекомендациями по улучшению.'
              }
            />
            <AboutBlock
              title={'Какие направления и профессии доступны для подготовки?'}
              content={
                'Мы предлагаем подготовку по IT специальностям, Frontend, Backend, менеджменту, и другим востребованным направлениям. Список регулярно обновляется.'
              }
            />
            <AboutBlock
              title={'Как работает проверка резюме?'}
              content={
                'Вы загружаете свое резюме в систему, после чего получаете подробный анализ с рекомендациями по структуре, стилю, ключевым словам и сильным/слабым сторонам.'
              }
            />
            <AboutBlock
              title={'Подходит ли платформа новичкам без опыта работы?'}
              content={
                'Да, у нас есть отдельные блоки вопросов и подготовка для тех, кто только начинает карьеру, с разбором базовых вопросов.'
              }
            />
            <AboutBlock
              title={'Ваша платформа бесплатна?'}
              content={'Да, все предоставляемые нами инструменты абсолютно бесплатны.'}
            />
          </div>
        </section>
      </div>
      <footer className={'lg:h-[300px] bg-main-black flex lg:items-center lg:justify-center mt-25 p-4'}>
        <div className={'flex lg:flex-row flex-col lg:gap-30 gap-12'}>
          <div className={'flex flex-col gap-8'}>
            <div className={'flex items-center'}>
              <Image
                src={logoTransparentFull}
                alt={'gradiorai'}
                height={32}
                width={32}
              />
              <div
                className={'ml-2 cursor-pointer text-white text-base'}
                onClick={() => router.push('/')}
              >
                gradiorAI
              </div>
            </div>
            <div className={'grow'} />
            {privatePolicy && personalTerms && (
              <div className={'flex flex-col gap-3 text-sm font-light text-text-low-white'}>
                <a
                  className={'cursor-pointer hover:underline hover:text-main-purple'}
                  target={'_blank'}
                  href={getPublicFileLink(personalTerms?.path || '')}
                  rel={'noreferrer'}
                >
                  Условия использования
                </a>
                <a
                  className={'cursor-pointer hover:underline hover:text-main-purple'}
                  target={'_blank'}
                  href={getPublicFileLink(privatePolicy?.path || '')}
                  rel={'noreferrer'}
                >
                  Политика конфиденциальности
                </a>
              </div>
            )}
            <div className={'text-sm font-light text-text-low-white'}>2025. Gradior. Все права защищены</div>
          </div>
          <div className={'flex flex-col gap-8'}>
            <div className={'font-medium text-base leading-[24px]'}>ИНСТРУМЕНТЫ</div>
            <div className={'flex flex-col gap-3 text-sm font-light text-text-low-white'}>
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
              <div
                className={'cursor-pointer hover:underline hover:text-main-purple'}
                onClick={() => router.push('/interview/resume-create')}
              >
                Создание резюме
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
