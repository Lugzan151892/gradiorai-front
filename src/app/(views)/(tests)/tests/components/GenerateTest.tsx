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
import { cn } from '@/lib/utils';

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
  const [reviewSent, setReviewSent] = useState(false);
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
      return;
    }

    try {
      dispatch(setLoading(true));
      await Api.post('/user/user-review', {
        comment,
        rating: userRating,
      });
      setReviewSent(true);
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
      <section className={'mt-6 w-full max-w-[1440px] lg:mx-auto h-full mx-4'}>
        <div className={'lg:text-5xl text-4xl leading-[100%] font-bold text-center mb-6'}>Результат тестирования</div>
        <div className={'max-w-[685px] mx-auto flex flex-col relative px-4'}>
          <div className={'flex flex-col'}>
            <ProgressBar
              score={userResult}
              maxScore={tests.length}
            />
            <UIButton
              className={'mx-auto mt-8'}
              text={'ПОПРОБОВАТЬ СНОВА'}
              onClick={goToTests}
            />
          </div>
        </div>
        <div className={'bg-main-black rounded-3xl flex justify-center p-8 mx-4 mt-10 mb-8'}>
          <div className={'flex flex-col gap-6 items-center text-center max-w-[1200px] w-full'}>
            <div className={'lg:text-xl text-base'}>Пожалуйста, оцените тестирование</div>
            <div
              className={'flex gap-7 mt-2'}
              onMouseLeave={() => setUserHover(0)}
            >
              {stars.map((star) => (
                <CustomIcon
                  key={star}
                  className={cn('cursor-pointer', reviewSent && 'pointer-events-none')}
                  name={userHover >= star || userRating >= star ? 'star-transparent' : 'star'}
                  size={44}
                  color={userHover >= star || userRating >= star ? 'var(--main-purple)' : 'transparent'}
                  onMouseEnter={() => setUserHover(star)}
                  onClick={() => setUserRating(star)}
                />
              ))}
            </div>
            <UITextarea
              label={'Оставьте отзыв'}
              placeholder={'Расскажите о своих впечатлениях'}
              value={comment}
              rows={isMobile ? 3 : 4}
              onInput={setComment}
              disabled={reviewSent}
            />
            <UIButton
              text={'ОТПРАВИТЬ ОТЗЫВ'}
              iconAfter={'arrow-top-right'}
              disabled={(!userRating && !comment) || reviewSent}
              onClick={handleReview}
            />
          </div>
        </div>
      </section>
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
