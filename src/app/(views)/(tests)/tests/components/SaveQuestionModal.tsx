import CustomButton from '@/components/ui/button/CustomButton';
import CustomModal from '@/components/ui/modal/CustomModal';
import React, { useEffect, useState } from 'react';
import { ITech } from '@/app/(views)/(tests)/tests/interfaces';
import TechComponent from '@/app/(views)/(tests)/tests/components/TechComponent';
import Api from '@/core/api/api';
import { useAppDispatch } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';
import errorHandler from '@/core/utils/error/errorHandler';
import { openModal } from '@/store/tech/techSlice';
import AddTechModal from '@/app/(views)/(tests)/tests/components/AddTechModal';
import CustomTextarea from '@/components/ui/textarea/CustomTextarea';
import CustomInput from '@/components/ui/input/CustomInput';
import { ESKILL_LEVEL } from '@/core/interfaces/enums';
import { ITest } from '@/core/interfaces/types';

interface ISaveQuestionModalProps {
  open?: boolean;
  onClose?: () => void;
  spec?: number;
  question: ITest;
  techs?: Array<number>;
  level: number;
}

const SaveQuestionModal: React.FC<ISaveQuestionModalProps> = ({
  open = false,
  onClose,
  spec,
  question,
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

  useEffect(() => {
    setEditedQuestion(question);
    setSelectedLevels([level]);
    setSelectedTechs(techs || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

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

  const changeLevels = (levelId: number) => {
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
    } catch (e: any) {
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
      await Api.post('/questions/save', {
        ...editedQuestion,
        level: selectedLevels,
        type: spec,
        techs: selectedTechs,
      });

      dispatch(openModal({ type: 'success', text: 'Вопрос успешно сохранен!' }));

      setSelectedTechs([]);

      if (onClose) {
        onClose();
      }
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const loadTechs = async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<{ spec: number }, { techs: ITech[] }>(
        '/questions/get-techs',
        spec ? { spec } : undefined
      );

      if (result.payload) {
        setAllTechs(result.payload.techs);
        setSelectedTechs(techs || []);
      }
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    loadTechs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

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
          <div className={'mt-2 flex gap-2 items-center'}>
            <div className={'text-nowrap'}>Ответ 1:</div>
            <CustomInput
              value={editedQuestion.responses[0].answer}
              onInput={(val) => handleResponseChange(0, val)}
            />
          </div>
          <div className={'mt-2 flex gap-2 items-center'}>
            <div className={'text-nowrap'}>Ответ 2:</div>
            <CustomInput
              value={editedQuestion.responses[1].answer}
              onInput={(val) => handleResponseChange(1, val)}
            />
          </div>
          <div className={'mt-2 flex gap-2 items-center'}>
            <div className={'text-nowrap'}>Ответ 3:</div>
            <CustomInput
              value={editedQuestion.responses[2].answer}
              onInput={(val) => handleResponseChange(2, val)}
            />
          </div>
          <div className={'mt-2 flex gap-2 items-center'}>
            <div className={'text-nowrap'}>Ответ 4:</div>
            <CustomInput
              value={editedQuestion.responses[3].answer}
              onInput={(val) => handleResponseChange(3, val)}
            />
          </div>
        </div>
        <div className={'mt-3'}>
          <div className={'desktop:text-2xl mobile:text-xl mb-2 text-center'}>Укажите уровень вопроса:</div>
          <div
            className={
              'grid desktop:grid-flow-col desktop:auto-cols-auto-fit desktop:auto-cols-[minmax(150px,200px)] mobile:grid-cols-1 justify-center w-full gap-y-2 gap-x-2'
            }
          >
            {levels.map((el) => (
              <TechComponent
                className={'desktop:mt-2 mobile:mt-1'}
                key={el.id}
                tech={el}
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
              'grid desktop:grid-flow-col desktop:auto-cols-auto-fit desktop:auto-cols-[minmax(150px,200px)] mobile:grid-cols-1 justify-center w-full gap-y-2 gap-x-2'
            }
          >
            {allTechs.map((el) => (
              <TechComponent
                className={'mt-2'}
                key={el.id}
                tech={el}
                selected={selectedTechs.includes(el.id)}
                onClick={() => changeTechs(el.id)}
              />
            ))}
          </div>
        </div>

        <div className={'w-full flex mt-6 mb-6'}>
          <CustomButton
            small
            type={'success'}
            className={'mx-auto'}
            text={'Добавить направления'}
            onClick={() => setAddTechModal(true)}
          />
        </div>

        <div className={'flex'}>
          <CustomButton
            className={'desktop:ml-auto mobile:mx-auto'}
            text={'Сохранить вопрос'}
            onClick={saveQuestion}
          />
        </div>
      </div>
      <AddTechModal
        spec={spec}
        open={addTechModal}
        onClose={closeSaveTechModal}
      />
    </CustomModal>
  );
};

export default SaveQuestionModal;
