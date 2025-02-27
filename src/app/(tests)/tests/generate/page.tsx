'use client';

import { useMemo, useState } from 'react';
import GenerateStep from './components/GenerateStep';
import { ETEST_STEPS } from './interfaces';
import CustomButton from '@/components/ui/button/CustomButton';
import { useRouter } from 'next/navigation';
import TestsPrepareLayout from '../components/TestsPrepareLayout';

const TestsGenerate = () => {
  const [step, setStep] = useState(ETEST_STEPS.FIRST);
  const [spec, setSpec] = useState<number>();
  const [level, setLevel] = useState<number>();
  const [questionsAmount, setQuestionsAmount] = useState<number>();
  const router = useRouter();

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

  const changeStep = (direction: 'back'|'forward' = 'forward') => {
    if (direction === 'forward') {
      if (step !== ETEST_STEPS.THIRD) {
        setStep(step + 1);
      } else {
        router.push('/tests/generate');
      }
    } else {
      if (step !== ETEST_STEPS.FIRST) {
        setStep(step - 1);
      } else {
        router.push('/tests');
      }
    }
  }

  let stepMarkup = null;
  if (step === ETEST_STEPS.FIRST) {
    stepMarkup = (
      <GenerateStep
        title="Первый Шаг"
        description="Выберите специализацию"
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
        title="Второй Шаг"
        description="Выберите уровень вопросов"
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
        title="Третий Шаг"
        description="Выберите количество вопросов"
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
      <div className='flex flex-col h-full'>
        {stepMarkup}
        <div className='mt-auto ml-auto'>
          <CustomButton small text='Назад' onClick={() => changeStep('back')} />
          <CustomButton className='ml-2' small text={step === ETEST_STEPS.THIRD ? 'Завершить' : 'Продолжить'} disabled={checkNextStep} onClick={() => changeStep()} />
        </div>
      </div>
    </TestsPrepareLayout>
  );
};

export default TestsGenerate;
