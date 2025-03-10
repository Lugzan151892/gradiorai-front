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
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
} from '@headlessui/react';
import Api from '@/core/api/api';
import GenerateTest from './components/GenerateTest';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';
import { ESKILL_LEVEL, ETEST_SPEC } from '@/core/interfaces/enums';
import { RootState } from '@/store';
import { shuffleArray } from '@/core/utils/array';
import errorHandler from '@/core/utils/error/errorHandler';
import CustomCheckbox from '@/components/ui/checkbox/CustomCheckbox';
import AddTechModal from './components/AddTechModal';

const TestsGenerate = () => {
  const [step, setStep] = useState(ETEST_STEPS.FIRST);
  const [spec, setSpec] = useState<ETEST_SPEC>();
  const [level, setLevel] = useState<ESKILL_LEVEL>();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [techs, setTechs] = useState<ITech[]>([]);
  const [selectedTechs, setSelectedTechs] = useState<number[]>([]);
  const [passwordModal, setPasswordModal] = useState(false);
  const [addTechModal, setAddTechModal] = useState(false);

  const dispatch = useAppDispatch();
  const [tests, setTests] = useState<ITest[]>([]);
  const { user } = useAppSelector((state: RootState) => state.user);

  const handleSetPassword = (e: string) => {
    setPassword(e);
  };

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

  const changeStep = async (direction: 'back' | 'forward' = 'forward') => {
    // switch (step) {
    //   case ETEST_STEPS.FIRST: {
    //     if ()
    //   }
    //   case ETEST_STEPS.SECOND:
    //   case ETEST_STEPS.THIRD:
    //   case ETEST_STEPS.TEST:
    // }
    if (direction === 'forward') {
      if (step !== ETEST_STEPS.THIRD) {
        if (step === ETEST_STEPS.SECOND) {
          await loadSpecs();
        }
        setStep(step + 1);
      } else {
        if (user?.admin) {
          generateTests();
        } else {
          setPasswordModal(true);
        }
      }
    } else {
      if (step === ETEST_STEPS.THIRD) {
        setSelectedTechs([]);
        setTechs([]);
      }

      if (step !== ETEST_STEPS.FIRST) {
        setStep(step - 1);
      } else {
        router.push('/');
      }
    }
  };

  const changeTechs = (techId: number) => {
    if (selectedTechs.includes(techId)) {
      setSelectedTechs(selectedTechs.filter((el) => el !== techId));
    } else {
      setSelectedTechs([...selectedTechs, techId]);
    }
  };

  const generateTests = async () => {
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
        onClick={() => changeStep('back')}
      />
      <CustomButton
        className={'ml-2'}
        type={step === ETEST_STEPS.THIRD ? 'success' : 'forward'}
        text={'Начать'}
        disabled={checkNextStep}
        onClick={() => changeStep()}
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
              <div
                key={el.id}
                className={
                  'flex px-2 py-[10px] bg-main-blue rounded-lg cursor-pointer text-white'
                }
                onClick={() => changeTechs(el.id)}
              >
                <CustomCheckbox value={selectedTechs.includes(el.id)} />
                <div className={'ml-4 text-xl'}>{el.name}</div>
              </div>
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
        onClose={() => setAddTechModal(false)}
      />
      <Dialog
        open={passwordModal}
        as={'div'}
        className={'relative z-10 focus:outline-none'}
        onClose={() => setPasswordModal(false)}
      >
        <div className={'fixed inset-0 z-10 w-screen overflow-y-auto'}>
          <div className={'flex min-h-full items-center justify-center p-4'}>
            <DialogPanel
              transition
              className={
                'w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'
              }
            >
              <DialogTitle
                as={'h3'}
                className={'text-base/7 font-medium text-white'}
              >
                Введите пароль для генерации
              </DialogTitle>
              <p className={'mt-2 text-sm/6 text-white/50'}>
                Введите временный пароль для генерации теста. Пароль можно
                посмотреть в документации к сервису.
              </p>
              <div className={'w-full max-w-md mt-3'}>
                <Field>
                  <Label className={'text-sm/6 font-medium text-white'}>
                    Пароль
                  </Label>
                  <Input
                    className={
                      'mt-1 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    }
                    value={password}
                    onInput={(val) =>
                      handleSetPassword(
                        (val.target as unknown as { value: string }).value
                      )
                    }
                  />
                </Field>
              </div>
              <div className={'mt-4'}>
                <Button
                  className={
                    'inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700'
                  }
                  onClick={generateTests}
                >
                  Сгенерировать
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </TestsPrepareLayout>
  );
};

export default TestsGenerate;
