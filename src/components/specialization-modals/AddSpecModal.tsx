import CustomInput from '@/components/ui/input/CustomInput';
import CustomModal from '@/components/ui/modal/CustomModal';
import Api from '@/core/api/api';
import { ISpecialization, ITechnology } from '@/core/interfaces/types';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import { openModal } from '@/store/tech/techSlice';
import React, { useEffect, useState } from 'react';
import UIButton from '@/components/ui/button/UIButton';
import UIFilterButton from '@/components/ui/filter-button/UIFilterButton';

interface IAddSpecModalProps {
  type?: 'create';
  open?: boolean;
  onClose?: () => void;
}

interface IEditSpecModalProps extends Omit<IAddSpecModalProps, 'type'> {
  type: 'edit';
  specialization: ISpecialization;
}

type TModalProps = IAddSpecModalProps | IEditSpecModalProps;

function isEditModalProps(props: TModalProps): props is IEditSpecModalProps {
  return props.type === 'edit';
}

const AddSpecModal: React.FC<TModalProps> = (props) => {
  const { open = false, onClose } = props;

  const isEdit = isEditModalProps(props);

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
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const editSpec = async () => {
    if (!specName || !isEdit) {
      return;
    }

    try {
      dispatch(setLoading(true));
      await Api.post('/questions/edit-spec', {
        id: props.specialization.id,
        name: specName,
        techs: selectedTechs,
      });

      closeModal();
      dispatch(
        openModal({
          text: `Специализация ${specName} успешно обновлена.`,
          type: 'success',
        })
      );
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSaveOrEdit = () => {
    if (isEdit) {
      editSpec();
    } else {
      saveSpec();
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
    if (!open) {
      return;
    }

    if (isEditModalProps(props)) {
      setSpecName(props.specialization.name);
    }

    const loadTechs = async () => {
      try {
        dispatch(setLoading(true));
        const result = await Api.get<undefined, { techs: ITechnology[]; questions_amount: number }>(
          '/questions/get-techs'
        );
        setTechs(result.payload.techs);
        if (isEditModalProps(props)) {
          setSelectedTechs(props.specialization.technology.map((el) => el.id));
        }
      } catch (e) {
        errorHandler(e, dispatch);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadTechs();
  }, [open, dispatch, props]);
  return (
    <CustomModal
      open={open}
      caption={isEdit ? 'Изменение специализации' : 'Создание специализации'}
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
          <div>Список технологий</div>
          <div className={'flex gap-5 flex-wrap mt-2'}>
            {techs.length ? (
              techs.map((tech) => (
                <UIFilterButton
                  text={tech.name}
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
          <UIButton
            className={'ml-auto'}
            text={'Сохранить'}
            onClick={handleSaveOrEdit}
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default AddSpecModal;
