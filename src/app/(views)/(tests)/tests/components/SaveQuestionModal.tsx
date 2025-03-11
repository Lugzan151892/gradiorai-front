import CustomButton from '@/components/ui/button/CustomButton';
import CustomModal from '@/components/ui/modal/CustomModal';
import React, { useEffect, useState } from 'react';
import { ITech, ITest } from '../interfaces';
import TechComponent from './TechComponent';
import Api from '@/core/api/api';
import { useAppDispatch } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';
import errorHandler from '@/core/utils/error/errorHandler';
import { openModal } from '@/store/tech/techSlice';
import AddTechModal from './AddTechModal';

interface ISaveQuestionModalProps {
  open?: boolean;
  onClose?: () => void;
  spec: number;
  question: ITest;
  level: number;
}

const SaveQuestionModal: React.FC<ISaveQuestionModalProps> = ({
  open = false,
  onClose,
  spec,
  question,
  level,
}) => {
  const [techs, setTechs] = useState<ITech[]>([]);
  const [selectedTechs, setSelectedTechs] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const [addTechModal, setAddTechModal] = useState(false);

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

    try {
      dispatch(setLoading(true));
      await Api.post('/questions/save', {
        ...question,
        level,
        type: spec,
        techs: selectedTechs,
      });

      dispatch(
        openModal({ type: 'success', text: 'Вопрос успешно сохранен!' })
      );

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
    if (!spec) {
      return;
    }

    try {
      dispatch(setLoading(true));
      const result = await Api.get<{ spec: number }, { techs: ITech[] }>(
        '/questions/get-techs',
        { spec }
      );

      if (result.payload) {
        setTechs(result.payload.techs);
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
  }, []);

  return (
    <CustomModal
      open={open}
      caption={'Выбрать направления вопроса'}
      onClose={onClose}
    >
      <div>
        {techs.map((el) => (
          <TechComponent
            className={'mt-2'}
            key={el.id}
            tech={el}
            selected={selectedTechs.includes(el.id)}
            onClick={() => changeTechs(el.id)}
          />
        ))}

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
            className={'ml-auto'}
            text={'Сохранить'}
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
