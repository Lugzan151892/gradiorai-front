import CustomModal from '@/components/ui/modal/CustomModal';
import React, { useEffect, useState } from 'react';
import Api from '@/core/api/api';
import { useAppDispatch } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';
import errorHandler from '@/core/utils/error/errorHandler';
import { openModal } from '@/store/tech/techSlice';
import CustomTextarea from '@/components/ui/textarea/CustomTextarea';
import UIInput from '@/components/ui/input/UIInput';
import { ESKILL_LEVEL } from '@/core/interfaces/enums';
import { ITech, ITest } from '@/core/interfaces/types';
import AddTechnologyModal from '@/components/technology-modals/AddTechnologyModal';
import UIFilterButton from '@/components/ui/filter-button/UIFilterButton';
import CustomCheckbox from '@/components/ui/checkbox/CustomCheckbox';
import UIButton from '../ui/button/UIButton';

interface ISaveQuestionModalProps {
  open?: boolean;
  onClose?: () => void;
  onSave?: () => void;
  question: ITest;
  isExistedQuestion?: boolean;
  isEdit?: boolean;
  techs?: Array<number>;
  level: number;
}

const SaveQuestionModal: React.FC<ISaveQuestionModalProps> = ({
  open = false,
  onClose,
  onSave,
  question,
  isExistedQuestion,
  level,
  techs,
}) => {
  const [allTechs, setAllTechs] = useState<ITech[]>([]);
  const [selectedTechs, setSelectedTechs] = useState<number[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const [addTechModal, setAddTechModal] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(question);
  const levels = [
    { id: ESKILL_LEVEL.JUNIOR, name: ESKILL_LEVEL[ESKILL_LEVEL.JUNIOR] },
    { id: ESKILL_LEVEL.MIDDLE, name: ESKILL_LEVEL[ESKILL_LEVEL.MIDDLE] },
    { id: ESKILL_LEVEL.SENIOR, name: ESKILL_LEVEL[ESKILL_LEVEL.SENIOR] },
  ];

  const handleQuestionChange = (value: string) => {
    setEditedQuestion((prev) => ({
      ...prev,
      question: value,
    }));
  };

  const handleResponseChange = (index: number, value: string) => {
    setEditedQuestion((prev) => ({
      ...prev,
      responses: prev.responses.map((resp, i) => (i === index ? { ...resp, answer: value } : resp)),
    }));
  };

  const handleChangeCorrectQuestion = (index: number) => {
    const resultWithoutCorrect = {
      ...editedQuestion,
      responses: editedQuestion.responses.map((el) => ({
        ...el,
        correct: false,
      })),
    };

    setEditedQuestion({
      ...resultWithoutCorrect,
      responses: resultWithoutCorrect.responses.map((response, iResponse) => ({
        ...response,
        correct: iResponse === index,
      })),
    });
  };

  const changeLevels = (levelId: number) => {
    if (isExistedQuestion) {
      setSelectedLevels([levelId]);
      return;
    }
    if (selectedLevels.includes(levelId)) {
      setSelectedLevels(selectedLevels.filter((el) => el !== levelId));
    } else {
      setSelectedLevels([...selectedLevels, levelId]);
    }
  };

  const changeTechs = (techId: number) => {
    if (selectedTechs.includes(techId)) {
      setSelectedTechs(selectedTechs.filter((el) => el !== techId));
    } else {
      setSelectedTechs([...selectedTechs, techId]);
    }
  };

  const closeSaveTechModal = async () => {
    try {
      dispatch(setLoading(true));
      await loadTechs();
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
      setAddTechModal(false);
    }
  };

  const saveQuestion = async () => {
    if (!selectedTechs.length) {
      dispatch(
        openModal({
          text: 'Нужно выбрать хотя бы одну технологию',
          type: 'error',
        })
      );
      return;
    }

    if (!selectedLevels.length) {
      dispatch(
        openModal({
          text: 'Нужно выбрать хотя бы один из уровней',
          type: 'error',
        })
      );
      return;
    }

    try {
      dispatch(setLoading(true));
      await Api.post(isExistedQuestion ? '/questions/edit' : '/questions/save', {
        ...editedQuestion,
        level: selectedLevels,
        techs: selectedTechs,
      });

      dispatch(openModal({ type: 'success', text: 'Вопрос успешно сохранен!' }));

      setSelectedTechs([]);

      if (onSave) {
        onSave();
      }

      if (onClose) {
        onClose();
      }
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const loadTechs = async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<{ spec: number }, { techs: ITech[] }>('/questions/get-techs');

      if (result.payload) {
        setAllTechs(result.payload.techs);
        if (!isExistedQuestion) {
          setSelectedTechs(techs || []);
        }
      }
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    setEditedQuestion(question);
    setSelectedLevels([level]);
    loadTechs();

    if (isExistedQuestion) {
      setSelectedTechs((question.technologies || []).map((el) => el.id));
    } else {
      setSelectedTechs(techs || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <CustomModal
      fullScreen
      open={open}
      caption={'Сохранить вопрос'}
      onClose={onClose}
    >
      <div className={'m-6'}>
        <div>
          <div className={'desktop:text-2xl mobile:text-xl mb-2'}>Изменение вопроса</div>
          <CustomTextarea
            value={editedQuestion.question}
            onInput={(val) => handleQuestionChange(val)}
          />
          {editedQuestion.responses.map((response, iResponse) => (
            <div
              key={response.id}
              className={'mt-2 flex gap-2 items-center'}
            >
              <CustomCheckbox
                selected={response.correct}
                onChange={() => handleChangeCorrectQuestion(iResponse)}
              />
              <div className={'text-nowrap'}>Ответ {iResponse + 1}:</div>
              <UIInput
                success={response.correct}
                value={response.answer}
                onInput={(val) => handleResponseChange(iResponse, val)}
              />
            </div>
          ))}
        </div>
        <div className={'mt-3'}>
          <div className={'desktop:text-2xl mobile:text-xl mb-2 text-center'}>Укажите уровень вопроса:</div>
          <div
            className={
              'grid desktop:grid-flow-col desktop:auto-cols-auto-fit desktop:auto-cols-[minmax(150px,200px)] mobile:grid-cols-1 justify-center w-full gap-y-2 gap-x-2'
            }
          >
            {levels.map((el) => (
              <UIFilterButton
                className={'desktop:mt-2 mobile:mt-1'}
                key={el.id}
                text={el.name}
                selected={selectedLevels.includes(el.id)}
                onClick={() => changeLevels(el.id)}
              />
            ))}
          </div>
        </div>
        <div className={'mt-3'}>
          <div className={'desktop:text-2xl mobile:text-xl mb-2 text-center'}>Укажите направления:</div>
          <div
            className={
              'grid desktop:grid-cols-[repeat(auto-fit,minmax(150px,200px))] mobile:grid-cols-1 justify-center w-full gap-y-2 gap-x-2'
            }
          >
            {allTechs.map((el) => (
              <UIFilterButton
                className={'mt-2'}
                key={el.id}
                text={el.name}
                selected={selectedTechs.includes(el.id)}
                onClick={() => changeTechs(el.id)}
              />
            ))}
          </div>
        </div>

        <div className={'w-full flex mt-6 mb-6'}>
          <UIButton
            className={'mx-auto'}
            text={'Добавить направления'}
            onClick={() => setAddTechModal(true)}
          />
        </div>

        <div className={'flex'}>
          <UIButton
            className={'desktop:ml-auto mobile:mx-auto'}
            text={'Сохранить вопрос'}
            onClick={saveQuestion}
          />
        </div>
      </div>
      <AddTechnologyModal
        open={addTechModal}
        onClose={closeSaveTechModal}
      />
    </CustomModal>
  );
};

export default SaveQuestionModal;
