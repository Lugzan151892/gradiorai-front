'use client';
import UIButton from '@/components/ui/button/UIButton';
import { useRouter } from 'next/navigation';
import React from 'react';
import AppLayout from '@/components/app-layout/AppLayout';
import CardItem from '@/components/main-page/card-item/CardItem';
import CardWithImage from '@/components/main-page/card-with-image/CardWithImage';
import robot from '@/components/main-page/assets/robot.png';
import Image from 'next/image';
import abstract from '@/components/main-page/assets/abstract.svg';
import abstract2 from '@/components/main-page/assets/abstract2.svg';
import butterfly from '@/components/main-page/assets/butterfly.svg';
import donut from '@/components/main-page/assets/donut.svg';
import mail from '@/components/main-page/assets/mail.svg';
import telegramm from '@/components/main-page/assets/telegramm.svg';
import CustomIcon from '@/components/ui/icon/CustomIcon';

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
                  router.push('/tests');
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
        <section
          className={'h-full sm:h-[454px] rounded-b-4xl flex justify-center items-center mt-[140px]'}
          style={{ background: 'var(--main-gradient)' }}
        >
          <div className={'w-full sm:max-w-[808px] flex flex-col gap-6'}>
            <div className={'text-5xl leading-[100%] font-bold'}>Генерация с AI </div>
            <div className={'text-xl'}>
              Превратите свой опыт в убедительные ответы с помощью нашего интеллектуального помощника. Просто укажите
              параметры – и получите готовые варианты ответов, которые впечатлят любого работодателя
            </div>
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
          <div> tut primer</div>
        </section>
        <section className={'flex flex-col mt-20 gap-19'}>
          <div className={'text-2xl font-semibold text-center'}>Преимущества нашего AI-генератора</div>
          <div className={'flex gap-4 flex-wrap'}>
            <CardWithImage
              className={'w-[49%]'}
              title={'Режим улучшения – доработка ваших черновиков'}
              text={
                'Загрузите свой текст и получите: оптимизацию формулировок, добавление профессиональных терминов и исправление стилистики'
              }
              image={'arm'}
            />
            <CardWithImage
              className={'w-[49%]'}
              title={'Отраслевые шаблоны для 25+ профессий'}
              text={'Готовые шаблоны с профессиональной лексикой, включая редкие специализации IT'}
              image={'world'}
            />
            <CardWithImage
              className={'w-[49%]'}
              title={'Умная адаптация под уровень позиции'}
              text={'Наш ИИ анализирует требования вакансии и автоматически подстраивает ответы под нужный уровень'}
              image={'romb'}
            />
            <CardWithImage
              className={'w-[49%]'}
              title={'Генерация вопросов работодателю'}
              text={'10+ умных вопросов под вашу сферу, включая редкие специализации'}
              image={'question'}
            />
          </div>
        </section>
        <section
          className={'h-full sm:h-[454px] rounded-b-4xl flex justify-center items-center mt-[140px]'}
          style={{ background: 'var(--main-gradient)' }}
        >
          <div className={'w-full sm:max-w-[808px] flex flex-col gap-6'}>
            <div className={'text-5xl leading-[100%] font-bold'}>Собеседование</div>
            <div className={'text-xl'}>
              Текст-чат, как в ChatGPT, но с фокусом на реалистичных сценариях собеседований. Чат-бот имитирует диалог с
              рекрутером или техническим специалистом с мгновенной обратной связью
            </div>
            <div>
              <UIButton
                text={'ПРОЙТИ СОБЕСЕДОВАНИЕ'}
                iconAfter={'arrow-top-right'}
                onClick={() => {
                  router.push('/');
                }}
              />
            </div>
          </div>
          <div> tut primer</div>
        </section>
        <section className={'flex flex-col mt-20 gap-19'}>
          <div className={'text-2xl font-semibold text-center'}>
            Почему это работает лучше, чем самостоятельная подготовка?
          </div>
          <div className={'grid grid-cols-[40%_1fr] grid-rows-2 gap-6'}>
            <div className={'col-start-1 col-end-2 row-start-1 row-end-3 bg-main-black rounded-3xl p-6 relative'}>
              <div className={'flex flex-col gap-4'}>
                <div className={'text-xl font-semibold leading-[100%]'}>
                  AI не просто слушает — он понимает контекст
                </div>
                <div className={'max-w-[254px] text-lg leading-[24px]'}>
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
              <div className={'text-xl font-semibold leading-[100%]'}>
                Реалистичные условия без стресса реального отказа
              </div>
              <div className={'text-lg leading-[24px]'}>
                Адаптивная сложность: если вы справляетесь, AI усложняет вопросы (как настоящий интервьюер). Провокации:
                симуляция неудобных моментов.
              </div>
            </div>
            <div
              className={
                'col-start-2 col-end-3 row-start-2 row-end-3 flex flex-col gap-4 bg-main-black rounded-3xl p-6'
              }
            >
              <div className={'text-xl font-semibold leading-[100%]'}>Экономия времени за счёт точного фокуса</div>
              <div className={'text-lg leading-[24px]'}>
                Концентрация на важном: вместо просмотра 10 видео на YouTube только релевантные знания. Мгновенный
                фидбек: не нужно ждать проверки — оценка и советы появляются сразу.
              </div>
            </div>
          </div>
        </section>
        <section
          className={'h-full sm:h-[454px] rounded-b-4xl flex justify-center items-center mt-[140px]'}
          style={{ background: 'var(--main-gradient)' }}
        >
          <div className={'w-full sm:max-w-[808px] flex flex-col gap-6'}>
            <div className={'text-5xl leading-[100%] font-bold'}>Тестирование</div>
            <div className={'text-xl'}>
              Прежде чем идти на интервью, узнайте свои сильные и слабые стороны. Наши тесты помогут вам объективно
              оценить уровень подготовки и закрыть пробелы
            </div>
            <div>
              <UIButton
                text={'НАЧАТЬ ТЕСТ'}
                iconAfter={'arrow-top-right'}
                onClick={() => {
                  router.push('/');
                }}
              />
            </div>
          </div>
          <div> tut primer</div>
        </section>
        <section className={'mt-20 flex items-center h-full'}>
          <div className={'flex flex-col p-6 gap-4 border-1 border-main-gray rounded-3xl w-1/5 min-h-[242px]'}>
            <div className={'text-xl font-semibold leading-[100%]'}>Выберите уровень</div>
            <div className={'text-lg leading-[24px]'}>
              Начинающий (Junior), Опытный (Middle) или Экспертный (Senior)
            </div>
          </div>
          <div className={'border-1 border-main-gray border-dashed w-1/15 h-0'} />
          <div className={'flex flex-col p-6 gap-4 border-1 border-main-gray rounded-3xl w-1/5 min-h-[242px]'}>
            <div className={'text-xl font-semibold leading-[100%]'}>Настройте специализацию</div>
            <div className={'text-lg leading-[24px]'}>
              15+ технических специализаций (IT, дизайн, продуктовый менеджмент)
            </div>
          </div>
          <div className={'border-1 border-main-gray border-dashed w-1/15 h-0'} />
          <div className={'flex flex-col p-6 gap-4 border-1 border-main-gray rounded-3xl w-1/5 min-h-[242px]'}>
            <div className={'text-xl font-semibold leading-[100%]'}>Определите направление</div>
            <div className={'text-lg leading-[24px]'}>
              Выберите направление в вашей специализации для эффективного обучения
            </div>
          </div>
          <div className={'border-1 border-main-gray border-dashed w-1/15 h-0'} />
          <div className={'flex flex-col p-6 gap-4 border-1 border-main-gray rounded-3xl w-1/5 min-h-[242px]'}>
            <div className={'text-xl font-semibold leading-[100%]'}>Пройдите тест</div>
            <div className={'text-lg leading-[24px]'}>После настройки AI сгенерирует персонализированный тест</div>
          </div>
        </section>
        <section
          className={'h-full sm:h-[454px] rounded-b-4xl flex justify-center items-center mt-[140px]'}
          style={{ background: 'var(--main-gradient)' }}
        >
          <div className={'w-full sm:max-w-[808px] flex flex-col gap-6'}>
            <div className={'text-5xl leading-[100%] font-bold'}>Проверка резюме</div>
            <div className={'text-xl'}>
              Резюме — это ваша визитная карточка для работодателя. AI проверит документ и предложит рекомендации по
              улучшению
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
          <div> tut primer</div>
        </section>
        <section className={'flex flex-col mt-20 gap-19'}>
          <div className={'text-2xl font-semibold text-center'}>
            Почему это работает лучше, чем самостоятельная подготовка?
          </div>
          <div className={'grid grid-cols-2 grid-rows-[158px_158px] gap-6'}>
            <div className={'flex border-1 border-main-gray rounded-3xl p-4 relative overflow-hidden'}>
              <div className={'flex flex-col gap-4 max-w-[70%]'}>
                <div className={'text-xl font-semibold leading-[100%]'}>Загрузите резюме</div>
                <div className={'text-lg leading-[24px]'}>
                  Поддерживаемые форматы: PDF, DOCX, TXT. Можно вставить текст вручную или загрузить из LinkedIn
                </div>
              </div>
              <Image
                className={'absolute right-0 bottom-0'}
                src={butterfly}
                alt={'abstract'}
              />
            </div>
            <div className={'flex border-1 border-main-gray rounded-3xl p-4 relative overflow-hidden'}>
              <div className={'flex flex-col gap-4 max-w-[70%]'}>
                <div className={'text-xl font-semibold leading-[100%]'}>Выберите вакансию</div>
                <div className={'text-lg leading-[24px]'}>
                  Укажите должность (например, Data Analyst) или загрузите описание вакансии. AI определит необходмые
                  требования и навыки
                </div>
              </div>
              <Image
                className={'absolute right-0 bottom-3'}
                src={abstract}
                alt={'abstract'}
              />
            </div>
            <div className={'flex border-1 border-main-gray rounded-3xl p-4 relative overflow-hidden'}>
              <div className={'flex flex-col gap-4 max-w-[70%]'}>
                <div className={'text-xl font-semibold leading-[100%]'}>ATS-оптимизация</div>
                <div className={'text-lg leading-[24px]'}>
                  AI определит, содержит ли резюме ключевые слова из вакансии. Проверит структуру и оценит вероятность
                  отсеивания
                </div>
              </div>
              <Image
                className={'absolute right-0 bottom-3'}
                src={donut}
                alt={'abstract'}
              />
            </div>
            <div className={'flex border-1 border-main-gray rounded-3xl p-4 relative overflow-hidden'}>
              <div className={'flex flex-col gap-4 max-w-[70%]'}>
                <div className={'text-xl font-semibold leading-[100%]'}>Отчет с улучшениями</div>
                <div className={'text-lg leading-[24px]'}>
                  AI проверит резюме и подскажет, что нужно улучшить. Вы получите оптимизированную версию, которую можно
                  скачать.
                </div>
              </div>
              <Image
                className={'absolute right-0 bottom-3'}
                src={abstract2}
                alt={'abstract'}
              />
            </div>
          </div>
        </section>
        <section
          className={'h-full sm:h-[454px] rounded-b-4xl flex justify-center items-center mt-[140px]'}
          style={{ background: 'var(--main-gradient)' }}
        >
          <div className={'w-full sm:max-w-[808px] flex flex-col items-center gap-6'}>
            <div className={'text-xl'}>
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
        </section>
      </div>
      <footer className={'h-[300px] bg-main-black flex items-center justify-center mt-25'}>
        <div className={'flex gap-30'}>
          <div className={'flex flex-col gap-8'}>
            <div className={'flex'}>
              <CustomIcon
                name={'owl'}
                size={24}
                color={'var(--low-green)'}
              />
              <div
                className={'ml-2 cursor-pointer text-white text-base'}
                onClick={() => router.push('/')}
              >
                gradiorAI
              </div>
            </div>
            <div className={'flex flex-col gap-3 text-sm font-light text-text-low-white'}>
              <div>Политика конфиденциальности</div>
              <div>Условия использования</div>
            </div>
            <div className={'text-sm font-light text-text-low-white'}>2025. Gradior. Все права защищены</div>
          </div>
          <div className={'flex flex-col gap-8'}>
            <div className={'font-medium text-base leading-[24px]'}>ИНСТРУМЕНТЫ</div>
            <div className={'flex flex-col gap-3 text-sm font-light text-text-low-white'}>
              <div className={'cursor-pointer hover:underline hover:text-main-purple'}>Генерация с AI</div>
              <div className={'cursor-pointer hover:underline hover:text-main-purple'}>Собеседование</div>
              <div className={'cursor-pointer hover:underline hover:text-main-purple'}>Тестирование</div>
              <div className={'cursor-pointer hover:underline hover:text-main-purple'}>Проверка резюме</div>
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
                <div>Email: support@gradior.ru</div>
              </div>
              <div className={'flex gap-3 items-center'}>
                <Image
                  src={telegramm}
                  alt={'telegramm'}
                  width={32}
                  height={32}
                />
                <div>Telegram: @gradior_support</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </AppLayout>
  );
};

export default Home;
