import React, { useState } from 'react';
import CustomButton from '@/components/ui/button/CustomButton';
import AdminWrapper from '@/components/admin-wrapper/AdminWrapper';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import Api from '@/core/api/api';
import { ITest } from '@/core/interfaces/types';
import AnswerComponent from '@/app/(views)/(tests)/tests/components/AnswerComponent';
import SaveQuestionModal from '@/components/save-question-modal/SaveQuestionModal';
import AuthConfirmButton from '@/app/(views)/(auth)/components/AuthConfirmButton';
import ProgressBar from '@/components/ui/progress-bar/ProgressBar';
import CustomTextarea from '@/components/ui/textarea/CustomTextarea';
import CustomIcon from '@/components/ui/icon/CustomIcon';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import ScrollContainer from '@/components/ui/scrollarea/CustomScrollarea';

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
    if (!user?.id || (!userRating && !comment)) {
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
    } catch (e: any) {
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
      <div className={'h-full flex flex-grow w-full'}>
        <div className={'my-7 bg-bg-transparent-25 mx-3 rounded-lg w-full p-4 flex flex-col items-center'}>
          <div className={'text-4xl mb-4'}>Ваш результат:</div>
          <ProgressBar
            score={userResult}
            maxScore={tests.length}
          />
          <div className={'flex flex-col max-w-lg w-full mt-10'}>
            <div>
              <div>Оцените тестирование</div>
              <div
                className={'flex gap-2 mt-2'}
                onMouseLeave={() => setUserHover(0)}
              >
                {stars.map((star) => (
                  <CustomIcon
                    key={star}
                    className={'cursor-pointer'}
                    name={'star'}
                    size={96}
                    color={userHover >= star || userRating >= star ? 'var(--low-green)' : 'var(--main-white)'}
                    onMouseEnter={() => setUserHover(star)}
                    onClick={() => setUserRating(star)}
                  />
                ))}
              </div>
            </div>
            <div className={'mt-10'}>
              <div>Отзыв</div>
              <CustomTextarea
                value={comment}
                rows={4}
                onInput={setComment}
              />
            </div>
          </div>
          <div className={'mt-auto w-full flex'}>
            <AuthConfirmButton
              icon={'reload'}
              customBorder
              className={'!w-[180px] ml-auto h-max self-end'}
              size={24}
              text={'Еще раз'}
              onClick={handleReview}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={'h-full flex flex-grow w-full text-white'}>
      <ScrollContainer>
        <div className={'flex flex-grow'}>
          <div className={'my-7 mx-3 bg-bg-transparent-25 rounded-10 w-full p-4 flex flex-col'}>
            <div className={'flex gap-4'}>
              <div className={'h-24 w-24 rounded flex items-center justify-center text-xl border-1 border-white'}>
                {`${currentQuestion} / ${tests.length}`}
              </div>
              <div className={'w-full flex items-center rounded p-3 desktop:text-2xl mobile:text-base'}>
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
              <AuthConfirmButton
                icon={currentQuestion === tests.length ? 'sand-clock' : 'arrow-right'}
                customBorder
                className={'!w-[180px] ml-auto h-max self-end'}
                size={24}
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
          </div>
        </div>
      </ScrollContainer>
    </div>
  );
};

export default GenerateTest;
