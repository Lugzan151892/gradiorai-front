import React, { useState } from 'react';
import UIButton from '@/components/ui/button/UIButton';
import AdminWrapper from '@/components/admin-wrapper/AdminWrapper';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import Api from '@/core/api/api';
import { ITest } from '@/core/interfaces/types';
import AnswerComponent from '@/app/(views)/(tests)/tests/components/AnswerComponent';
import SaveQuestionModal from '@/components/save-question-modal/SaveQuestionModal';
import ProgressBar from '@/components/ui/progress-bar/ProgressBar';
import UITextarea from '@/components/ui/textarea/UITextarea';
import CustomIcon from '@/components/ui/icon/CustomIcon';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useBreakpoint } from '@/hooks/useBreakpoints';

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
  const [disableSave, setDisableSave] = useState(false);
  const [saveQuestionModal, setSaveQuestionModal] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.user);

  const { isMobile } = useBreakpoint();

  const dispatch = useAppDispatch();

  const [userHover, setUserHover] = useState(0);
  const [comment, setComment] = useState('');
  const [userRating, setUserRating] = useState(0);

  const stars = [1, 2, 3, 4, 5];

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

  const goToTests = () => {
    onReset();
  };

  const handleReview = async () => {
    if (!userRating && !comment) {
      goToTests();
      return;
    }

    try {
      dispatch(setLoading(true));
      await Api.post('/user/user-review', {
        comment,
        rating: userRating,
      });

      goToTests();
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const saveQuestion = () => {
    setSaveQuestionModal(true);
  };

  if (showResults) {
    return (
      <div className={'h-full flex grow w-full'}>
        <div
          className={
            'desktop:my-8 mobile:my-4 bg-bg-transparent-25 desktop:mx-3 rounded-lg w-full p-4 flex flex-col items-center'
          }
        >
          <div className={'desktop:text-6xl mobile:text-4xl mobile:mb-4 desktop:mb-10'}>Ваш результат</div>
          <ProgressBar
            score={userResult}
            maxScore={tests.length}
          />
          <div className={'flex flex-col max-w-lg w-full desktop:mt-10 mobile:mt-7'}>
            <div>
              <div className={'desktop:text-xl mobile:text-base'}>Оцените тестирование</div>
              <div
                className={'flex gap-7 mt-2'}
                onMouseLeave={() => setUserHover(0)}
              >
                {stars.map((star) => (
                  <CustomIcon
                    key={star}
                    className={'cursor-pointer'}
                    name={'star'}
                    size={79}
                    color={userHover >= star || userRating >= star ? 'var(--low-green)' : 'var(--main-white)'}
                    onMouseEnter={() => setUserHover(star)}
                    onClick={() => setUserRating(star)}
                  />
                ))}
              </div>
            </div>
            <div className={'desktop:mt-10 mobile:mt-5'}>
              <div className={'desktop:text-xl mobile:text-base mb-2'}>Отзыв</div>
              <UITextarea
                value={comment}
                rows={isMobile ? 3 : 4}
                onInput={setComment}
              />
            </div>
          </div>
          <div className={'grow'} />
          <div className={'mt-4 w-full flex'}>
            <UIButton
              className={'w-[180px]! desktop:ml-auto mobile:mx-auto h-max self-end '}
              text={'Еще раз'}
              onClick={handleReview}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={'mt-14 w-full max-w-[685px] mx-auto h-full'}>
      <div className={'bg-main-black p-6 rounded-3xl'}>
        <div className={'text-xl font-semibold text-center mb-8'}>{`${currentQuestion} / ${tests.length}`}</div>
        <div className={'text-xl font-semibold text-center mb-4'}>{tests[currentQuestion - 1].question}</div>
        <div className={'flex flex-col gap-3'}>
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
      </div>
      <div className={'w-max mx-auto my-8 flex flex-col items-center'}>
        <AdminWrapper className={'mb-3'}>
          <UIButton
            disabled={!!tests[currentQuestion - 1].id || disableSave}
            text={'Сохранить вопрос'}
            onClick={saveQuestion}
          />
        </AdminWrapper>
        <UIButton
          text={currentQuestion === tests.length ? 'Завершить' : 'Далее'}
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
    </section>
  );
};

export default GenerateTest;
