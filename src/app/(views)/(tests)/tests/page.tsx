'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { ESKILL_LEVEL } from '@/core/interfaces/enums';
import UIFilterButton from '@/components/ui/filter-button/UIFilterButton';
import AdminWrapper from '@/components/admin-wrapper/AdminWrapper';
import UIButton from '@/components/ui/button/UIButton';
import AddSpecModal from '@/components/specialization-modals/AddSpecModal';
import { useAppDispatch } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';
import Api from '@/core/api/api';
import { ISpecialization, ITechnology, ITest, ITestParams } from '@/core/interfaces/types';
import errorHandler from '@/core/utils/error/errorHandler';
import AddTechnologyModal from '@/components/technology-modals/AddTechnologyModal';
import { shuffleArray } from '@/core/utils/array';
import GenerateTest from '@/app/(views)/(tests)/tests/components/GenerateTest';
import InfoModal from '@/components/ui/modal/InfoModal';
import CustomIcon from '@/components/ui/icon/CustomIcon';
import { useRouter } from 'next/navigation';
import GenerateModal from '@/features/loading/GenerateModal';
import { sleep } from '@/core/utils/common';
import { cn } from '@/lib/utils';
import classes from './styles/animatedBlock.module.css';

const TestsView = () => {
  const dispatch = useAppDispatch();
  const [specs, setSpecs] = useState<ISpecialization[]>([]);
  const [techs, setTechs] = useState<ITechnology[]>([]);
  const [questionsLevel, setQuestionsLevel] = useState<ESKILL_LEVEL>(ESKILL_LEVEL.JUNIOR);
  const [questionsSpecs, setQuestionsSpecs] = useState<ESKILL_LEVEL[]>([]);
  const [questionsTechs, setQuestionsTechs] = useState<number[]>([]);
  const [openAddSpecModal, setOpenAddSpecModal] = useState(false);
  const [openAddTechModal, setOpenAddTechModal] = useState(false);
  const [unauthGenerateModal, setUnauthGenerateModal] = useState(false);
  const [tests, setTests] = useState<ITest[]>([]);
  const router = useRouter();
  const [generateModal, setGenerateModal] = useState(false);

  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false);

  const [showTest, setShowTest] = useState(false);

  const handleSetQuestionsLevel = (val: ESKILL_LEVEL) => {
    setQuestionsLevel(val);
  };

  const handleSetQuestionsSpec = (val: ESKILL_LEVEL) => {
    if (questionsSpecs.includes(val)) {
      setQuestionsSpecs([...questionsSpecs.filter((el) => el !== val)]);
    } else {
      setQuestionsSpecs([...questionsSpecs, val]);
    }

    setQuestionsTechs([]);
  };

  const handleSetQuestionsTechs = (val: number) => {
    if (questionsTechs.includes(val)) {
      setQuestionsTechs([...questionsTechs.filter((el) => el !== val)]);
    } else {
      setQuestionsTechs([...questionsTechs, val]);
    }
  };

  const loadSpecs = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<undefined, ISpecialization[]>('/questions/get-specs');
      setSpecs(result.payload);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const loadTechs = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<{ specs: Array<number> }, { techs: ITechnology[]; questions_amount: number }>(
        '/questions/get-techs',
        questionsSpecs.length
          ? {
              specs: questionsSpecs,
            }
          : undefined
      );
      setTechs(result.payload.techs);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, questionsSpecs]);

  const skillOptions = [
    {
      id: ESKILL_LEVEL.JUNIOR,
      text: 'Junior',
    },
    {
      id: ESKILL_LEVEL.MIDDLE,
      text: 'Middle',
    },
    {
      id: ESKILL_LEVEL.SENIOR,
      text: 'Senior',
    },
  ];

  const generateTests = async () => {
    if (!questionsTechs.length) {
      return;
    }

    const data: ITestParams = {
      techs: questionsTechs,
      level: questionsLevel,
    };

    try {
      const startTime = new Date().getTime();
      setGenerateModal(true);
      const result = await Api.postSilent<ITestParams, { response: { questions: ITest[] }; usage: any }>(
        '/gpt/generate',
        data
      );

      if (result.success) {
        const shuffledTests = result.payload.response.questions.map((question) => ({
          ...question,
          responses: shuffleArray(question.responses),
        }));
        setTests(shuffleArray(shuffledTests));
        const plannedEndTime = startTime + 2000;
        const timeLeft = plannedEndTime - new Date().getTime();

        if (timeLeft > 0) {
          await sleep(timeLeft);
        }

        setShowTest(true);
      } else {
        if (result.payload.type === 'generate') {
          setUnauthGenerateModal(true);
        } else {
          throw new Error(result.payload.message);
        }
      }
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      setGenerateModal(false);
    }
  };

  useEffect(() => {
    loadSpecs();
    loadTechs();
  }, [loadSpecs, loadTechs]);

  const resetState = () => {
    setQuestionsLevel(ESKILL_LEVEL.JUNIOR);
    setQuestionsSpecs([]);
    setQuestionsTechs([]);
    setTests([]);
    setShowTest(false);
  };

  const handleLogin = () => {
    router.push('/login');
  };

  if (showTest) {
    return (
      <GenerateTest
        techs={questionsTechs}
        level={questionsLevel}
        tests={tests}
        onReset={resetState}
      />
    );
  }

  return (
    <section className={'mt-6 w-full max-w-[1440px] mx-auto h-full'}>
      <div
        className={'h-[198px] rounded-b-4xl flex flex-col justify-center items-center mb-6 px-4'}
        style={{ background: 'var(--main-gradient)' }}
      >
        <div className={'w-full lg:max-w-[808px] flex flex-col gap-6 text-center'}>
          <div className={'lg:text-5xl text-4xl leading-[100%] font-bold'}>Тестирование</div>
          <div className={'lg:text-xl text-base'}>
            Тест адаптируется под ваш уровень подготовки. Чем выше уровень — тем глубже и детальнее будут вопросы.
          </div>
        </div>
      </div>
      <div className={'max-w-[685px] mx-auto flex flex-col relative px-4 overflow-hidden'}>
        <div className={'p-6 bg-main-black rounded-3xl flex flex-col gap-4 items-center mb-6 text-center z-2'}>
          <div className={'font-semibold text-xl'}>Уровень вопросов</div>
          <div className={'text-text-disabled'}>
            Сложность вопросов и критерии оценки будут адаптированы под ваш уровень
          </div>
          <div className={'flex gap-3 items-center'}>
            <div className={'flex flex-wrap gap-3 justify-center'}>
              {skillOptions.map((level) => (
                <UIFilterButton
                  text={level.text}
                  key={level.id}
                  selected={questionsLevel === level.id}
                  onClick={() => handleSetQuestionsLevel(level.id)}
                />
              ))}
            </div>
            <div
              className={cn(
                'flex items-center justify-center p-2 border-1 border-main-gray rounded-3xl cursor-pointer hover:bg-main-purple hover:border-main-purple',
                showAdditionalFilters && 'bg-main-purple border-main-purple'
              )}
              onClick={() => setShowAdditionalFilters(!showAdditionalFilters)}
            >
              <CustomIcon
                name={'settings-new'}
                color={'var(--main-white)'}
                size={16}
              />
            </div>
          </div>
        </div>
        <div
          className={cn(
            'mb-6 z-1',
            classes['dynamic-section-wrapper'],
            showAdditionalFilters
              ? classes['dynamic-section-wrapper--open']
              : classes['dynamic-section-wrapper--closed']
          )}
        >
          <div
            className={cn(
              'p-6 bg-main-black rounded-3xl flex flex-col gap-4 items-center text-center',
              classes['dynamic-section']
            )}
          >
            <div className={'font-semibold text-xl'}>Специализация</div>
            <div className={'text-text-disabled'}>
              Здесь вы можете отфильтровать направления подходящие под специализацию
            </div>
            <div className={'flex flex-wrap gap-3 justify-center'}>
              {specs.length ? (
                specs.map((spec) => (
                  <UIFilterButton
                    text={spec.name}
                    key={spec.id}
                    selected={questionsSpecs.includes(spec.id)}
                    onClick={() => handleSetQuestionsSpec(spec.id)}
                  />
                ))
              ) : (
                <div>Специализации не найдены</div>
              )}
            </div>
            <div className={'mx-auto w-max mt-4'}>
              <AdminWrapper>
                <UIButton
                  text={'Создать специализацию'}
                  onClick={() => setOpenAddSpecModal(true)}
                />
              </AdminWrapper>
            </div>
          </div>
        </div>
        <div className={'p-6 bg-main-black rounded-3xl flex flex-col gap-4 items-center text-center mb-6'}>
          <div className={'font-semibold text-xl'}>Направление</div>
          <div className={'text-text-disabled'}>Каждое направление включает в себя набор вопросов</div>
          <div className={'flex flex-wrap gap-3 justify-center'}>
            {techs.length ? (
              techs.map((tech) => (
                <UIFilterButton
                  text={tech.name}
                  key={tech.id}
                  selected={questionsTechs.includes(tech.id)}
                  onClick={() => handleSetQuestionsTechs(tech.id)}
                />
              ))
            ) : (
              <div>Специализации не найдены</div>
            )}
          </div>
          <div className={'mx-auto w-max mt-4'}>
            <AdminWrapper>
              <UIButton
                text={'Создать направление'}
                onClick={() => setOpenAddTechModal(true)}
              />
            </AdminWrapper>
          </div>
        </div>
        <div className={'w-full flex items-center mt-2 mb-6'}>
          <UIButton
            className={'mx-auto lg:w-auto w-full'}
            disabled={!questionsTechs.length}
            text={'НАЧАТЬ ТЕСТИРОВАНИЕ'}
            iconAfter={'arrow-top-right'}
            onClick={generateTests}
          />
        </div>
      </div>
      <AddSpecModal
        open={openAddSpecModal}
        onClose={() => {
          setOpenAddSpecModal(false);
          loadSpecs();
        }}
      />
      <AddTechnologyModal
        open={openAddTechModal}
        onClose={() => {
          setOpenAddTechModal(false);
          loadTechs();
        }}
      />
      <InfoModal
        opened={unauthGenerateModal}
        text={'Неавторизованный доступ к генерации уже использован. Для продолжения, пожалуйста, авторизуйтесь.'}
      >
        <UIButton
          className={'mx-auto mt-3'}
          text={'ВОЙТИ'}
          iconAfter={'arrow-top-right'}
          onClick={handleLogin}
        />
      </InfoModal>
      <GenerateModal
        text={'Тест генерируется, пожалуйста подождите.'}
        opened={generateModal}
      />
    </section>
  );
};

export default TestsView;
