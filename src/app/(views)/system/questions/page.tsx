'use client';

import CustomButton from '@/components/ui/button/CustomButton';
import Api from '@/core/api/api';
import { ITechnology, ITest } from '@/core/interfaces/types';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import React, { useCallback, useEffect, useState } from 'react';
import SaveQuestionModal from '@/app/(views)/(tests)/tests/components/SaveQuestionModal';

interface IFullQuestion extends ITest {
  level: number;
  technologies?: ITechnology[];
}

const SystemQuestions = () => {
  const dispatch = useAppDispatch();
  const [withoutSpecs, setWithoutSpecs] = useState(true);
  const [onlyMine, setOnlyMine] = useState(false);
  const [questions, setQuestions] = useState<IFullQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<IFullQuestion | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const openQuestionModal = (question: IFullQuestion) => {
    setCurrentQuestion(question);
    setOpenEditModal(true);
  };

  const loadQuestions = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<any, IFullQuestion[]>('/questions/questions-list', {
        only_mine: onlyMine,
        only_without_specs: withoutSpecs,
      });

      setQuestions(result.payload);
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, onlyMine, withoutSpecs]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);
  return (
    <div className={'w-full'}>
      <div className={'flex w-full items-center justify-center px-4 py-2'}>
        <CustomButton
          className={'mr-2'}
          small
          selected={withoutSpecs}
          text={'Вопросы без направлений'}
          onClick={() => {
            setWithoutSpecs(!withoutSpecs);
          }}
        />
        <CustomButton
          small
          selected={onlyMine}
          text={'Добавленные мной'}
          onClick={() => {
            setOnlyMine(!onlyMine);
          }}
        />
      </div>
      <div>Вопросы:</div>
      <div className={'flex flex-col gap-0.5 px-4'}>
        {questions.map((question) => (
          <div
            key={question.id}
            className={'flex border-1'}
          >
            <div className={'w-full'}>
              <div>{question.question}</div>
              <div className={'flex justify-between'}>
                {question.responses.map((answer, iAnswer) => (
                  <div key={iAnswer}>{`${iAnswer + 1}. ${answer.answer}`}</div>
                ))}
              </div>
            </div>
            <div>
              <CustomButton
                small
                text={'Изменить'}
                onClick={() => openQuestionModal(question)}
              />
            </div>
          </div>
        ))}
      </div>
      {currentQuestion && (
        <SaveQuestionModal
          level={currentQuestion.level}
          question={currentQuestion}
          isExistedQuestion
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
        />
      )}
    </div>
  );
};

export default SystemQuestions;
