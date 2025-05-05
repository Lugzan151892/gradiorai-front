'use client';

import React, { useCallback, useEffect, useState } from 'react';
import SettingsBlock from '@/app/(views)/(tests)/tests/components/SettingsBlock';
import { ESKILL_LEVEL } from '@/core/interfaces/enums';
import CustomFilterButton from '@/components/ui/filter-button/CustomFilterButton';
import AdminWrapper from '@/components/admin-wrapper/AdminWrapper';
import CustomButton from '@/components/ui/button/CustomButton';
import AddSpecModal from '@/components/specialization-modals/AddSpecModal';
import { useAppDispatch } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';
import Api from '@/core/api/api';
import { ISpecialization, ITechnology, ITest, ITestParams } from '@/core/interfaces/types';
import errorHandler from '@/core/utils/error/errorHandler';
import AddTechnologyModal from '@/components/technology-modals/AddTechnologyModal';
import AuthConfirmButton from '@/app/(views)/(auth)/components/AuthConfirmButton';
import { shuffleArray } from '@/core/utils/array';
import GenerateTest from '@/app/(views)/(tests)/tests/components/GenerateTest';
import TechComponent from '@/components/tech-component/TechComponent';
import { useBreakpoint } from '@/hooks/useBreakpoints';
import InfoModal from '@/components/ui/modal/InfoModal';
import CustomIcon from '@/components/ui/icon/CustomIcon';
import { useRouter } from 'next/navigation';
import GenerateModal from '@/features/loading/GenerateModal';

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

  const { isMobile } = useBreakpoint();

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

  const generateTests = async () => {
    if (!questionsTechs.length) {
      return;
    }

    const data: ITestParams = {
      techs: questionsTechs,
      level: questionsLevel,
    };

    try {
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
        setShowTest(true);
      } else {
        if (result.payload.type === 'generate') {
          setUnauthGenerateModal(true);
        } else {
          throw new Error(result.payload.message);
        }
      }
    } catch (e: any) {
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
    <div className={'flex flex-col w-[1069px] max-w-full h-full gap-y-8 pb-4 mx-auto'}>
      <SettingsBlock
        icon={'search-book'}
        title={'Уровень вопросов'}
      >
        <div
          className={
            'grid mobile:grid-cols-[repeat(auto-fit,minmax(88px,max-content))] desktop:grid-cols-[repeat(auto-fit,minmax(125px,max-content))] desktop:gap-5 mobile:gap-2 desktop:mt-9 mobile:mt-5 mobile:justify-center'
          }
        >
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
        description={`Здесь вы можете отфильтровать направления${isMobile ? '' : ' подходящие под специализацию'}`}
      >
        {specs.length ? (
          <div
            className={
              'grid grid-cols-[repeat(auto-fit,minmax(160px,max-content))] desktop:gap-x-5 desktop:gap-y-2 mobile:gap-2 desktop:mt-6 mobile:mt-3 mobile:justify-center'
            }
          >
            {specs.map((spec) => (
              <TechComponent
                tech={spec}
                small
                key={spec.id}
                selected={questionsSpecs.includes(spec.id)}
                onClick={() => handleSetQuestionsSpec(spec.id)}
              />
            ))}
          </div>
        ) : (
          <div>Специализации не найдены</div>
        )}
        <div className={'mx-auto w-max mt-4'}>
          <AdminWrapper>
            <CustomButton
              small
              text={'Создать специализацию'}
              onClick={() => setOpenAddSpecModal(true)}
            />
          </AdminWrapper>
        </div>
      </SettingsBlock>
      <SettingsBlock
        icon={'hat'}
        title={'Направления'}
        description={`${isMobile ? 'Направление' : 'Каждое направление'} включает в себя набор вопросов`}
      >
        {techs.length ? (
          <div
            className={
              'grid grid-cols-[repeat(auto-fit,minmax(160px,max-content))] desktop:gap-x-5 desktop:gap-y-2 mobile:gap-2 desktop:mt-6 mobile:mt-3 mobile:justify-center'
            }
          >
            {techs.map((tech) => (
              <TechComponent
                tech={tech}
                key={tech.id}
                small
                selected={questionsTechs.includes(tech.id)}
                onClick={() => handleSetQuestionsTechs(tech.id)}
              />
            ))}
          </div>
        ) : (
          <div>Специализации не найдены</div>
        )}
        <div className={'mx-auto w-max mt-4'}>
          <AdminWrapper>
            <CustomButton
              small
              text={'Создать направление'}
              onClick={() => setOpenAddTechModal(true)}
            />
          </AdminWrapper>
        </div>
      </SettingsBlock>
      <div className={'flex-grow'} />
      <div className={'w-full flex items-center mt-2 pb-2'}>
        <AuthConfirmButton
          className={'!w-[170px] mx-auto'}
          customBorder
          disabled={!questionsTechs.length}
          size={24}
          icon={'check'}
          text={'Начать'}
          onClick={generateTests}
        />
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
        text={'Для продолжения, пожалуйста, авторизуйтесь.'}
      >
        <CustomButton
          className={'!rounded-10 !px-3 !py-2 text-xl h-max mx-auto '}
          color={'low-green'}
          onClick={handleLogin}
        >
          <div className={'flex'}>
            <CustomIcon
              className={'mr-6'}
              name={'user-login'}
              size={25}
              color={'var(--main-white)'}
            />
            <div className={'mr-4'}>Вход</div>
          </div>
        </CustomButton>
      </InfoModal>
      <GenerateModal
        text={'Тест генерируется, пожалуйста подождите.'}
        opened={generateModal}
      />
    </div>
  );
};

export default TestsView;
