'use client';

import React, { useMemo, useState } from 'react';
import GenerateStep from '@/app/(views)/(tests)/tests/components/GenerateStep';
import {
  ETEST_STEPS,
  ITech,
  ITest,
  ITestParams,
} from '@/app/(views)/(tests)/tests/interfaces';
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

const TestsGenerate = () => {
  const [step, setStep] = useState(ETEST_STEPS.FIRST);
  const [spec, setSpec] = useState<ETEST_SPEC>();
  const [level, setLevel] = useState<ESKILL_LEVEL>();
  const router = useRouter();
  const [techs, setTechs] = useState<ITech[]>([]);
  const [selectedTechs, setSelectedTechs] = useState<number[]>([]);
  const [passwordModal, setPasswordModal] = useState(false);
  const [addTechModal, setAddTechModal] = useState(false);

  const dispatch = useAppDispatch();
  const [tests, setTests] = useState<ITest[]>([]);
  const { user } = useAppSelector((state: RootState) => state.user);

  const loadSpecs = async () => {
    if (!spec) {
      return;
    }

    try {
      dispatch(setLoading(true));
      const result = await Api.get<{ spec: number }, { techs: ITech[] }>(
        '/questions/get-techs',
        { spec }
      );

      if (result.payload) {
        setTechs(result.payload.techs);
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
      await loadSpecs();
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
      await loadSpecs();
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
      const result = await Api.post<
        ITestParams,
        { response: { questions: ITest[] }; usage: any }
      >('/gpt/generate', data);

      if (result.success) {
        const shuffledTests = result.payload.response.questions.map(
          (question) => ({
            ...question,
            responses: shuffleArray(question.responses),
          })
        );
        setTests(shuffledTests);
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
        level={level}
        spec={spec}
        tests={tests}
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
        {techs.length ? (
          <div
            className={
              'grid grid-cols-[max-content_max-content] w-full justify-between gap-y-2 px-10'
            }
          >
            {techs.map((el) => (
              <TechComponent
                key={el.id}
                tech={el}
                selected={selectedTechs.includes(el.id)}
                onClick={() => changeTechs(el.id)}
              />
            ))}
          </div>
        ) : (
          <div>
            <div className={'text-3xl text-error'}>Направления не найдены!</div>
          </div>
        )}
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
