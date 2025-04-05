import React, { useState } from 'react';
import CustomButton from '@/components/ui/button/CustomButton';
import { useRouter } from 'next/navigation';
import AdminWrapper from '@/components/admin-wrapper/AdminWrapper';
import { RootState } from '@/store';
import { useAppSelector } from '@/hooks/redux';
import Api from '@/core/api/api';
import { ITest } from '@/core/interfaces/types';
import AnswerComponent from '@/app/(views)/(tests)/tests/components/AnswerComponent';
import SaveQuestionModal from '@/components/save-question-modal/SaveQuestionModal';

const GenerateTest: React.FC<{
  tests: ITest[];
  level: number;
  techs: Array<number>;
  onReset: () => void;
}> = ({ tests, level, techs, onReset }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [userChoise, setUserChoise] = useState<number>();
  const [userResult, setUserResult] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const router = useRouter();
  const [disableSave, setDisableSave] = useState(false);
  const [saveQuestionModal, setSaveQuestionModal] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.user);

  const handleSetUserChoise = async (answer: { answer: string; correct: boolean; id: number }) => {
    if (user?.id && !!tests[currentQuestion - 1].id && answer.correct) {
      await Api.postSilent('/questions/update-progress', { question_id: tests[currentQuestion - 1].id });
    }

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
      setDisableSave(false);
    }
  };
  const goHome = () => {
    router.push('/');
  };

  const goToTests = () => {
    onReset();
  };

  const saveQuestion = () => {
    setSaveQuestionModal(true);
  };

  if (showResults) {
    return (
      <div className={'h-full flex flex-grow w-full'}>
        <div className={'my-7 mx-3 rounded-lg bg-gray w-full p-4 flex flex-col items-center'}>
          <div className={'text-4xl mb-4'}>Ваш результат:</div>
          <div className={'text-4xl mb-4'}>{`Вы ответили правильно на ${userResult} из ${tests.length} вопросов!`}</div>
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
    <div className={'h-full flex flex-grow w-full overflow-auto'}>
      <div className={'my-7 mx-3 rounded-lg bg-gray w-full p-4 flex flex-col'}>
        <div className={'flex gap-4'}>
          <div className={'h-24 w-24 bg-aqua rounded flex items-center justify-center text-xl text-text-secondary'}>
            {`${currentQuestion} / ${tests.length}`}
          </div>
          <div className={'w-full flex items-center bg-white rounded text-black p-3 desktop:text-2xl mobile:text-base'}>
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
          <AdminWrapper>
            <CustomButton
              className={'desktop:hidden'}
              small
              disabled={!!tests[currentQuestion - 1].id || disableSave}
              text={'Сохранить вопрос'}
              onClick={saveQuestion}
            />
            <CustomButton
              className={'mobile:hidden'}
              disabled={!!tests[currentQuestion - 1].id || disableSave}
              text={'Сохранить вопрос'}
              onClick={saveQuestion}
            />
          </AdminWrapper>
          <CustomButton
            className={'ml-auto desktop:hidden'}
            small
            text={currentQuestion === tests.length ? 'Завершить' : 'Продолжить'}
            disabled={!userChoise}
            onClick={handleSetQuestion}
          />
          <CustomButton
            className={'ml-auto mobile:hidden'}
            text={currentQuestion === tests.length ? 'Завершить' : 'Продолжить'}
            disabled={!userChoise}
            onClick={handleSetQuestion}
          />
        </div>
        <SaveQuestionModal
          techs={techs}
          level={level}
          question={tests[currentQuestion - 1]}
          open={saveQuestionModal}
          onClose={() => setSaveQuestionModal(false)}
        />
      </div>
    </div>
  );
};

export default GenerateTest;
