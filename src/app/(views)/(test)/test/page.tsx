'use client';

import React, { useCallback, useEffect, useState } from 'react';
import SettingsBlock from './components/SettingsBlock';
import { ESKILL_LEVEL } from '@/core/interfaces/enums';
import CustomFilterButton from '@/components/ui/filter-button/CustomFilterButton';
import TechComponent from '@/app/(views)/(tests)/tests/components/TechComponent';
import AdminWrapper from '@/components/admin-wrapper/AdminWrapper';
import CustomButton from '@/components/ui/button/CustomButton';
import AddSpecModal from '@/components/specialization-modals/AddSpecModal';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';
import Api from '@/core/api/api';
import { ISpecialization, ITechnology, ITest } from '@/core/interfaces/types';
import errorHandler from '@/core/utils/error/errorHandler';
import AddTechnologyModal from '@/components/technology-modals/AddTechnologyModal';
import AuthConfirmButton from '@/app/(views)/(auth)/components/AuthConfirmButton';
import { RootState } from '@/store';
import { ITestParams } from '@/app/(views)/(tests)/tests/interfaces';
import { shuffleArray } from '@/core/utils/array';
import GeneratePasswordModal from '@/app/(views)/(tests)/tests/components/GeneratePasswordModal';
import GenerateTest from '@/app/(views)/(tests)/tests/components/GenerateTest';

const TestsView = () => {
  const dispatch = useAppDispatch();
  const [specs, setSpecs] = useState<ISpecialization[]>([]);
  const [techs, setTechs] = useState<ITechnology[]>([]);
  const [questionsLevel, setQuestionsLevel] = useState<ESKILL_LEVEL>(ESKILL_LEVEL.JUNIOR);
  const [questionsSpecs, setQuestionsSpecs] = useState<ESKILL_LEVEL[]>([]);
  const [questionsTechs, setQuestionsTechs] = useState<number[]>([]);
  const [openAddSpecModal, setOpenAddSpecModal] = useState(false);
  const [openAddTechModal, setOpenAddTechModal] = useState(false);
  const [tests, setTests] = useState<ITest[]>([]);

  const { user } = useAppSelector((state: RootState) => state.user);

  const [showTest, setShowTest] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

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
      const result = await Api.get<null, ISpecialization[]>('/questions/get-specs');
      setSpecs(result.payload);
    } catch (e: any) {
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
    } catch (e: any) {
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

  const generateTests = async (password?: string) => {
    if (!questionsTechs.length) {
      return;
    }

    const data: ITestParams = {
      password,
      techs: questionsTechs,
      level: questionsLevel,
    };

    try {
      dispatch(setLoading(true));
      const result = await Api.post<ITestParams, { response: { questions: ITest[] }; usage: any }>(
        '/gpt/generate',
        data
      );

      if (result.success) {
        const shuffledTests = result.payload.response.questions.map((question) => ({
          ...question,
          responses: shuffleArray(question.responses),
        }));
        setTests(shuffleArray(shuffledTests));
        setShowTest(true);
      }
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleStart = () => {
    if (user?.admin) {
      generateTests();
    } else {
      setPasswordModal(true);
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
    <div className={'flex flex-col w-full h-full gap-y-8'}>
      <SettingsBlock
        icon={'search-book'}
        title={'Уровень вопросов'}
      >
        <div className={'flex gap-10 flex-wrap mt-9'}>
          {skillOptions.map((level) => (
            <CustomFilterButton
              text={level.text}
              key={level.id}
              selected={questionsLevel === level.id}
              onClick={() => handleSetQuestionsLevel(level.id)}
            />
          ))}
        </div>
      </SettingsBlock>
      <SettingsBlock
        icon={'monitor'}
        title={'Специализация'}
        description={'Здесь вы можете отфильтровать направления подходящие под специализацию '}
        captionAfter={
          <div>
            <AdminWrapper>
              <CustomButton
                small
                text={'Создать специализацию'}
                onClick={() => setOpenAddSpecModal(true)}
              />
            </AdminWrapper>
          </div>
        }
      >
        {specs.length ? (
          <div className={'grid grid-cols-[repeat(auto-fit,minmax(200px,max-content))] gap-5 mt-9'}>
            {specs.map((spec) => (
              <TechComponent
                tech={spec}
                key={spec.id}
                selected={questionsSpecs.includes(spec.id)}
                onClick={() => handleSetQuestionsSpec(spec.id)}
              />
            ))}
          </div>
        ) : (
          <div>Специализации не найдены</div>
        )}
      </SettingsBlock>
      <SettingsBlock
        icon={'hut'}
        title={'Направления'}
        description={'Каждое направление включает в себя набор вопросов'}
        captionAfter={
          <div>
            <AdminWrapper>
              <CustomButton
                small
                text={'Создать направление'}
                onClick={() => setOpenAddTechModal(true)}
              />
            </AdminWrapper>
          </div>
        }
      >
        {techs.length ? (
          <div className={'grid grid-cols-[repeat(auto-fit,minmax(150px,max-content))] gap-5 mt-9'}>
            {techs.map((tech) => (
              <TechComponent
                tech={tech}
                key={tech.id}
                selected={questionsTechs.includes(tech.id)}
                onClick={() => handleSetQuestionsTechs(tech.id)}
              />
            ))}
          </div>
        ) : (
          <div>Специализации не найдены</div>
        )}
      </SettingsBlock>
      <SettingsBlock
        icon={'rocket'}
        title={'Начать'}
        description={'После того как вы определили конфигурацию тестов мы готовы их составить!'}
      >
        <div className={'w-full flex items-center mt-10'}>
          <AuthConfirmButton
            className={'!w-[170px] mx-auto'}
            customBorder
            disabled={!questionsTechs.length}
            size={24}
            icon={'check'}
            text={'Начать'}
            onClick={handleStart}
          />
        </div>
      </SettingsBlock>
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
      <GeneratePasswordModal
        open={passwordModal}
        onClose={() => setPasswordModal(false)}
        generate={generateTests}
      />
    </div>
  );
};

export default TestsView;
