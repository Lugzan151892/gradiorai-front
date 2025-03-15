'use client';

import React, { useMemo, useState } from 'react';
import GenerateStep from '@/app/(views)/(tests)/tests/components/GenerateStep';
import { ETEST_STEPS, ITech, ITest, ITestParams } from '@/app/(views)/(tests)/tests/interfaces';
import CustomButton from '@/components/ui/button/CustomButton';
import { useRouter } from 'next/navigation';
import TestsPrepareLayout from '@/app/(views)/(tests)/tests/components/TestsPrepareLayout';
import Api from '@/core/api/api';
import GenerateTest from './components/GenerateTest';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';
import { ESKILL_LEVEL, ETEST_SPEC } from '@/core/interfaces/enums';
import { RootState } from '@/store';
import { shuffleArray } from '@/core/utils/array';
import errorHandler from '@/core/utils/error/errorHandler';
import AddTechModal from './components/AddTechModal';
import TechComponent from './components/TechComponent';
import GeneratePasswordModal from './components/GeneratePasswordModal';
import AdminWrapper from '@/components/admin-wrapper/AdminWrapper';

interface ITechWithAmount extends ITech {
  _count: {
    questions: number;
  };
}

const TestsGenerate = () => {
  const [step, setStep] = useState(ETEST_STEPS.FIRST);
  const [spec, setSpec] = useState<ETEST_SPEC>();
  const [level, setLevel] = useState<ESKILL_LEVEL>();
  const router = useRouter();
  const [techs, setTechs] = useState<ITechWithAmount[]>([]);
  const [selectedTechs, setSelectedTechs] = useState<number[]>([]);
  const [passwordModal, setPasswordModal] = useState(false);
  const [addTechModal, setAddTechModal] = useState(false);
  const [questionsAmount, setQuestionsAmount] = useState(0);

  const dispatch = useAppDispatch();
  const [tests, setTests] = useState<ITest[]>([]);
  const { user } = useAppSelector((state: RootState) => state.user);

  const resetState = () => {
    setStep(ETEST_STEPS.FIRST);
    setSpec(undefined);
    setLevel(undefined);
    setTechs([]);
    setSelectedTechs([]);
    setTests([]);
  };

  const loadTechs = async () => {
    if (!spec) {
      return;
    }

    try {
      dispatch(setLoading(true));
      const result = await Api.get<{ spec: number }, { techs: ITechWithAmount[]; questions_amount: number }>(
        '/questions/get-techs',
        { spec }
      );

      if (result.payload) {
        setTechs(result.payload.techs);
        setQuestionsAmount(result.payload.questions_amount);
      }
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const checkNextStep = useMemo(() => {
    if (step === ETEST_STEPS.FIRST) {
      return !spec;
    }
    if (step === ETEST_STEPS.SECOND) {
      return !level;
    }
    if (step === ETEST_STEPS.THIRD) {
      return !selectedTechs.length;
    }
  }, [step, spec, level, selectedTechs]);

  const goForward = async () => {
    if (step === ETEST_STEPS.FIRST) {
      setStep(step + 1);
      return;
    }

    if (step === ETEST_STEPS.SECOND) {
      await loadTechs();
      setStep(step + 1);
      return;
    }

    if (step === ETEST_STEPS.THIRD) {
      if (user?.admin) {
        generateTests();
      } else {
        setPasswordModal(true);
      }
    }
  };

  const goBack = async () => {
    if (step === ETEST_STEPS.FIRST) {
      router.push('/');
      return;
    }

    if (step === ETEST_STEPS.SECOND) {
      setStep(step - 1);
      return;
    }

    if (step === ETEST_STEPS.THIRD) {
      setSelectedTechs([]);
      setTechs([]);
      setStep(step - 1);
      return;
    }
  };

  const changeTechs = (techId: number) => {
    if (selectedTechs.includes(techId)) {
      setSelectedTechs(selectedTechs.filter((el) => el !== techId));
    } else {
      setSelectedTechs([...selectedTechs, techId]);
    }
  };

  const closeSaveTechModal = async () => {
    try {
      dispatch(setLoading(true));
      await loadTechs();
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
      setAddTechModal(false);
    }
  };

  const generateTests = async (password?: string) => {
    if (!selectedTechs.length || !level || !spec) {
      return;
    }

    const data: ITestParams = {
      password,
      techs: selectedTechs,
      level,
      spec,
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
        setStep(ETEST_STEPS.TEST);
      }
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const actionsMarkup = (
    <div className={'mt-auto ml-auto flex w-full justify-between'}>
      <CustomButton
        text={'Назад'}
        type={'back'}
        onClick={goBack}
      />
      <CustomButton
        className={'ml-2'}
        type={step === ETEST_STEPS.THIRD ? 'success' : 'forward'}
        text={'Начать'}
        disabled={checkNextStep}
        onClick={goForward}
      />
    </div>
  );

  if (step === ETEST_STEPS.TEST && level && spec) {
    return (
      <GenerateTest
        techs={selectedTechs}
        level={level}
        spec={spec}
        tests={tests}
        onReset={resetState}
      />
    );
  }

  let stepMarkup = null;
  if (step === ETEST_STEPS.FIRST) {
    stepMarkup = (
      <GenerateStep
        step={1}
        description={'Выберите специализацию'}
        options={[
          {
            id: ETEST_SPEC.FRONT,
            text: 'Front',
          },
          {
            id: ETEST_SPEC.BACK,
            text: 'Back',
          },
          {
            id: ETEST_SPEC.QA,
            text: 'QA',
          },
        ]}
        value={spec}
        actions={actionsMarkup}
        onClick={setSpec}
      />
    );
  }

  if (step === ETEST_STEPS.SECOND) {
    stepMarkup = (
      <GenerateStep
        step={2}
        description={'Выберите уровень вопросов'}
        options={[
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
        ]}
        value={level}
        actions={actionsMarkup}
        onClick={setLevel}
      />
    );
  }

  if (step === ETEST_STEPS.THIRD) {
    stepMarkup = (
      <GenerateStep
        step={3}
        description={'Выберите направления'}
        actions={actionsMarkup}
      >
        <div className={'flex flex-col items-center'}>
          <AdminWrapper className={'w-[max-content]'}>
            <div className={'font-semibold text-center mb-3 mr-5'}>
              Общее количество вопросов в базе: {questionsAmount}
            </div>
          </AdminWrapper>
          {techs.length ? (
            <div className={'grid grid-cols-[50%_50%] w-full justify-between gap-y-2 gap-x-2 px-10'}>
              {techs.map((el) => (
                <TechComponent
                  key={el.id}
                  tech={el}
                  selected={selectedTechs.includes(el.id)}
                  onClick={() => changeTechs(el.id)}
                >
                  <AdminWrapper className={'ml-auto'}>
                    <div className={'ml-2 mr-5 font-semibold'}>{el._count.questions || 0}</div>
                  </AdminWrapper>
                </TechComponent>
              ))}
            </div>
          ) : (
            <div>
              <div className={'text-3xl text-error'}>Направления не найдены!</div>
            </div>
          )}
        </div>
        {user?.admin ? (
          <div className={'w-full flex mt-6'}>
            <CustomButton
              className={'mx-auto'}
              text={'Добавить направления'}
              onClick={() => setAddTechModal(true)}
            />
          </div>
        ) : null}
      </GenerateStep>
    );
  }

  return (
    <TestsPrepareLayout>
      <div className={'flex flex-col h-full'}>{stepMarkup}</div>
      <AddTechModal
        spec={spec}
        open={addTechModal}
        onClose={closeSaveTechModal}
      />
      <GeneratePasswordModal
        open={passwordModal}
        onClose={() => setPasswordModal(false)}
        saveTech={generateTests}
      />
    </TestsPrepareLayout>
  );
};

export default TestsGenerate;
