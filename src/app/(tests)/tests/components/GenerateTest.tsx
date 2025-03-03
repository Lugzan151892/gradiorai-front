import React, { useState } from 'react';
import AnswerComponent from './AnswerComponent';
import CustomButton from '@/components/ui/button/CustomButton';
import { useRouter } from 'next/navigation';
import { ITest } from '../interfaces';

const GenerateTest: React.FC<{
  tests: ITest[];
}> = ({ tests }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [userChoise, setUserChoise] = useState<number>();
  const [userResult, setUserResult] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const router = useRouter();

  const handleSetUserChoise = (answer: {
    answer: string;
    correct: boolean;
    id: number;
  }) => {
    setUserChoise(answer.id);
    if (answer.correct) {
      setUserResult(userResult + 1);
    }
  };

  const handleSetQuestion = () => {
    if (currentQuestion === tests.length) {
      setShowResults(true);
    } else {
      setUserChoise(undefined);
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  const goHome = () => {
    router.push('/');
  };

  const goToTests = () => {
    router.push('/tests');
  };

  if (showResults) {
    return (
      <div className={'h-full flex flex-grow w-full'}>
        <div
          className={
            'my-7 mx-3 rounded-lg bg-gray w-full p-4 flex flex-col items-center'
          }
        >
          <div className={'text-4xl mb-4'}>Ваш результат:</div>
          <div className={'text-4xl mb-4'}>
            {`Вы ответили правильно на ${userResult} из ${tests.length} вопросов!`}
          </div>
          <div className={'text-4xl'}>
            {`У Вас ${Math.round((100 / tests.length) * userResult)}% правильных ответов!`}
          </div>
          <div className={'mt-auto w-full flex'}>
            <CustomButton
              className={'ml-auto'}
              text={'На главную'}
              onClick={goHome}
            />
            <CustomButton
              className={'ml-3'}
              text={'Новый тест'}
              onClick={goToTests}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={'h-full flex flex-grow w-full'}>
      <div className={'my-7 mx-3 rounded-lg bg-gray w-full p-4 flex flex-col'}>
        <div className={'flex gap-4'}>
          <div
            className={
              'h-24 w-24 bg-aqua rounded flex items-center justify-center text-xl text-text-secondary'
            }
          >
            {`${currentQuestion} / ${tests.length}`}
          </div>
          <div
            className={
              'w-full flex items-center bg-white rounded text-black p-3 text-2xl'
            }
          >
            {tests[currentQuestion - 1].question}
          </div>
        </div>
        <div className={'flex flex-col mt-3 gap-3'}>
          {tests[currentQuestion - 1].responses.map((answer) => (
            <AnswerComponent
              key={answer.id}
              answer={answer}
              disabled={!!userChoise && userChoise !== answer.id}
              userChoise={userChoise}
              onClick={() => handleSetUserChoise(answer)}
            />
          ))}
        </div>
        <div className={'w-full mt-auto flex'}>
          <CustomButton
            className={'ml-auto'}
            text={currentQuestion === tests.length ? 'Завершить' : 'Продолжить'}
            disabled={!userChoise}
            onClick={handleSetQuestion}
          />
        </div>
      </div>
    </div>
  );
};

export default GenerateTest;
