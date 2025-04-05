import TechComponent from '@/app/(views)/(tests)/tests/components/TechComponent';
import CustomButton from '@/components/ui/button/CustomButton';
import CustomInput from '@/components/ui/input/CustomInput';
import CustomModal from '@/components/ui/modal/CustomModal';
import Api from '@/core/api/api';
import { ETEST_SPEC } from '@/core/interfaces/enums';
import { ITechnology } from '@/core/interfaces/types';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import { openModal } from '@/store/tech/techSlice';
import React, { useCallback, useEffect, useState } from 'react';

interface IAddSpecModalProps {
  spec?: ETEST_SPEC;
  open?: boolean;
  onClose?: () => void;
}

const AddSpecModal: React.FC<IAddSpecModalProps> = ({ open = false, onClose }) => {
  const [specName, setSpecName] = useState('');
  const [techs, setTechs] = useState<ITechnology[]>([]);
  const [selectedTechs, setSelectedTechs] = useState<number[]>([]);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    setSpecName('');
    if (onClose) {
      onClose();
    }
  };

  const loadTechs = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<null, { techs: ITechnology[]; questions_amount: number }>('/questions/get-techs');
      setTechs(result.payload.techs);
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const saveSpec = async () => {
    if (!specName) {
      return;
    }

    try {
      dispatch(setLoading(true));
      await Api.post('/questions/add-spec', {
        name: specName,
        techs: selectedTechs,
      });

      closeModal();
      dispatch(
        openModal({
          text: `Специализация ${specName} успешно добавлена.`,
          type: 'success',
        })
      );
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSetSelectedTechs = (val: number) => {
    if (selectedTechs.includes(val)) {
      setSelectedTechs([...selectedTechs.filter((el) => el !== val)]);
    } else {
      setSelectedTechs([...selectedTechs, val]);
    }
  };

  useEffect(() => {
    if (open) {
      loadTechs();
    }
  }, [loadTechs, open]);
  return (
    <CustomModal
      open={open}
      caption={'Создать специализацию'}
      onClose={closeModal}
    >
      <div className={'p-6'}>
        <CustomInput
          className={'mb-10'}
          label={'Название специализации'}
          value={specName}
          onInput={setSpecName}
        />
        <div>
          <div>Список тенологий</div>
          <div className={'flex gap-5 flex-wrap mt-2'}>
            {techs.length ? (
              techs.map((tech) => (
                <TechComponent
                  tech={tech}
                  key={tech.id}
                  selected={selectedTechs.includes(tech.id)}
                  onClick={() => handleSetSelectedTechs(tech.id)}
                />
              ))
            ) : (
              <div>Технологии не найдены</div>
            )}
          </div>
        </div>
        <div className={'flex'}>
          <CustomButton
            className={'ml-auto'}
            text={'Сохранить'}
            onClick={saveSpec}
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default AddSpecModal;
