'use client';

import React, { useMemo, useState } from 'react';
import GenerateStep from '@/app/(tests)/tests/generate/components/GenerateStep';
import { ETEST_STEPS } from '@/app/(tests)/tests/generate/interfaces';
import CustomButton from '@/components/ui/button/CustomButton';
import { useRouter } from 'next/navigation';
import TestsPrepareLayout from '@/app/(tests)/tests/components/TestsPrepareLayout';
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
import mockedTests from '@/core/mock/tests';

const TestsGenerate = () => {
  const [step, setStep] = useState(ETEST_STEPS.FIRST);
  const [spec, setSpec] = useState<number>();
  const [level, setLevel] = useState<number>();
  const [questionsAmount, setQuestionsAmount] = useState<number>();
  const router = useRouter();
  const [password, setPassword] = useState('');

  const [passwordModal, setPasswordModal] = useState(false);

  const handleSetPassword = (e: string) => {
    console.log(e);

    setPassword(e);
  };

  const checkNextStep = useMemo(() => {
    if (step === ETEST_STEPS.FIRST) {
      return !spec;
    }
    if (step === ETEST_STEPS.SECOND) {
      return !level;
    }
    if (step === ETEST_STEPS.THIRD) {
      return !questionsAmount;
    }
  }, [step, spec, level, questionsAmount]);

  const changeStep = (direction: 'back' | 'forward' = 'forward') => {
    if (direction === 'forward') {
      if (step !== ETEST_STEPS.THIRD) {
        setStep(step + 1);
      } else {
        setPasswordModal(true);
      }
    } else {
      if (step !== ETEST_STEPS.FIRST) {
        setStep(step - 1);
      } else {
        router.push('/tests');
      }
    }
  };

  const generateTests = async () => {
    const data = {
      password,
      amount: questionsAmount,
      level,
      spec,
    };

    const result = await Api.post('/gpt/generate', data);

    console.log(result);
  };

  if (true) {
    return <GenerateTest tests={mockedTests.questions} />;
  }

  let stepMarkup = null;
  if (step === ETEST_STEPS.FIRST) {
    stepMarkup = (
      <GenerateStep
        title={'Первый Шаг'}
        description={'Выберите специализацию'}
        options={[
          {
            id: 1,
            text: 'Front',
          },
          {
            id: 2,
            text: 'Back',
          },
          {
            id: 3,
            text: 'QA',
          },
        ]}
        value={spec}
        onClick={setSpec}
      />
    );
  }

  if (step === ETEST_STEPS.SECOND) {
    stepMarkup = (
      <GenerateStep
        title={'Второй Шаг'}
        description={'Выберите уровень вопросов'}
        options={[
          {
            id: 1,
            text: 'Junior',
          },
          {
            id: 2,
            text: 'Middle',
          },
          {
            id: 3,
            text: 'Senior',
          },
        ]}
        value={level}
        onClick={setLevel}
      />
    );
  }

  if (step === ETEST_STEPS.THIRD) {
    stepMarkup = (
      <GenerateStep
        title={'Третий Шаг'}
        description={'Выберите количество вопросов'}
        options={[
          {
            id: 1,
            text: '3',
          },
          {
            id: 2,
            text: '5',
          },
          {
            id: 3,
            text: '10',
          },
        ]}
        value={questionsAmount}
        onClick={setQuestionsAmount}
      />
    );
  }

  return (
    <TestsPrepareLayout>
      <div className={'flex flex-col h-full'}>
        {stepMarkup}
        <div className={'mt-auto ml-auto'}>
          <CustomButton
            small
            text={'Назад'}
            onClick={() => changeStep('back')}
          />
          <CustomButton
            className={'ml-2'}
            small
            text={step === ETEST_STEPS.THIRD ? 'Завершить' : 'Продолжить'}
            disabled={checkNextStep}
            onClick={() => changeStep()}
          />
        </div>
      </div>
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
