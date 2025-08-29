'use client';

import SaveQuestionModal from '@/components/save-question-modal/SaveQuestionModal';
import UIButton from '@/components/ui/button/UIButton';
import Api from '@/core/api/api';
import { ITechnology, ITest } from '@/core/interfaces/types';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import React, { useCallback, useEffect, useState } from 'react';
import UIFilterButton from '@/components/ui/filter-button/UIFilterButton';
import routeChecker from '@/hoc/routeChecker';

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
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const openQuestionModal = (question: IFullQuestion) => {
    setCurrentQuestion(question);
    setOpenEditModal(true);
  };

  const emptyQuestion = {
    question: '',
    responses: [
      {
        answer: '',
        correct: true,
        id: 1,
      },
      {
        answer: '',
        correct: false,
        id: 2,
      },
      {
        answer: '',
        correct: false,
        id: 3,
      },
      {
        answer: '',
        correct: false,
        id: 4,
      },
    ],
    technologies: [],
  };

  const loadQuestions = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<{ only_mine: boolean; only_without_specs: boolean }, IFullQuestion[]>(
        '/questions/questions-list',
        {
          only_mine: onlyMine,
          only_without_specs: withoutSpecs,
        }
      );

      setQuestions(result.payload);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, onlyMine, withoutSpecs]);

  const handleDeleteQuestion = async (questionId?: number) => {
    if (!questionId) {
      return;
    }

    try {
      setLoading(true);
      await Api.delete<{ id: number }, undefined>('/questions/delete', { id: questionId });
      loadQuestions();
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);
  return (
    <div className={'w-full'}>
      <div className={'flex w-full items-center justify-center px-4 py-2'}>
        <UIFilterButton
          className={'mr-2'}
          selected={withoutSpecs}
          text={'Вопросы без направлений'}
          onClick={() => {
            setWithoutSpecs(!withoutSpecs);
          }}
        />
        <UIFilterButton
          selected={onlyMine}
          text={'Добавленные мной'}
          onClick={() => {
            setOnlyMine(!onlyMine);
          }}
        />
        <UIButton
          className={'ml-auto'}
          text={'Добавить новый вопрос'}
          onClick={() => setOpenCreateModal(true)}
        />
      </div>
      <div>Вопросы:</div>
      <div className={'flex flex-col gap-0.5 mx-4 bg-modal'}>
        {questions.map((question) => (
          <div
            key={question.id}
            className={'flex border'}
          >
            <div className={'w-full'}>
              <div>{question.question}</div>
              <div className={'flex justify-between'}>
                {question.responses.map((answer, iAnswer) => (
                  <div key={iAnswer}>{`${iAnswer + 1}. ${answer.answer}`}</div>
                ))}
              </div>
            </div>
            <div className={'flex flex-col gap-1 py-2'}>
              <UIButton
                text={'Изменить'}
                onClick={() => openQuestionModal(question)}
              />
              <UIButton
                text={'Удалить'}
                onClick={() => handleDeleteQuestion(question.id)}
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
          onSave={loadQuestions}
          onClose={() => setOpenEditModal(false)}
        />
      )}
      <SaveQuestionModal
        level={1}
        question={emptyQuestion}
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
    </div>
  );
};

export default routeChecker(SystemQuestions, 'adminOnly');
