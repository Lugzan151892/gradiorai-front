import CustomButton from '@/components/ui/button/CustomButton';
import CustomInput from '@/components/ui/input/CustomInput';
import CustomModal from '@/components/ui/modal/CustomModal';
import Api from '@/core/api/api';
import { ISpecialization, ITechnology } from '@/core/interfaces/types';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import { openModal } from '@/store/tech/techSlice';
import React, { useEffect, useState } from 'react';
import TechComponent from '../tech-component/TechComponent';

interface IAddTechnologyModalProps {
  type?: 'create';
  open?: boolean;
  onClose?: () => void;
}

interface IEditTechnologyModalProps extends Omit<IAddTechnologyModalProps, 'type'> {
  type: 'edit';
  technology: ITechnology;
}

type TModalProps = IAddTechnologyModalProps | IEditTechnologyModalProps;

function isEditModalProps(props: TModalProps): props is IEditTechnologyModalProps {
  return props.type === 'edit';
}

const AddTechnologyModal: React.FC<TModalProps> = (props) => {
  const { open, onClose } = props;

  const isEdit = isEditModalProps(props);

  const [techName, setTechName] = useState('');
  const [techDescr, setTechDescr] = useState('');
  const [specs, setSpecs] = useState<ISpecialization[]>([]);
  const [selectedSpecs, setSelectedSpecs] = useState<number[]>([]);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    setTechName('');
    setTechDescr('');
    setSelectedSpecs([]);
    if (onClose) {
      onClose();
    }
  };

  const handleSetSelectedSpecs = (val: number) => {
    if (selectedSpecs.includes(val)) {
      setSelectedSpecs([...selectedSpecs.filter((el) => el !== val)]);
    } else {
      setSelectedSpecs([...selectedSpecs, val]);
    }
  };

  const editTech = async () => {
    if (!techName || !isEdit) {
      return;
    }

    try {
      dispatch(setLoading(true));
      await Api.post('/questions/edit-tech', {
        id: props.technology.id,
        name: techName,
        description: techDescr || '',
        specs: selectedSpecs,
      });

      closeModal();
      dispatch(
        openModal({
          text: `Направление ${techName} успешно обновлено.`,
          type: 'success',
        })
      );
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const saveTech = async () => {
    if (!techName) {
      return;
    }

    try {
      dispatch(setLoading(true));
      await Api.post('/questions/add-tech', {
        name: techName,
        description: techDescr,
        specs: selectedSpecs,
      });

      closeModal();
      dispatch(
        openModal({
          text: `Направление ${techName} успешно добавлено.`,
          type: 'success',
        })
      );
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSaveOrEdit = () => {
    if (isEdit) {
      editTech();
    } else {
      saveTech();
    }
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    if (isEditModalProps(props)) {
      setTechName(props.technology.name);
      setTechDescr(props.technology.description || '');
    }

    const loadSpecs = async () => {
      try {
        dispatch(setLoading(true));
        const result = await Api.get<null, ISpecialization[]>('/questions/get-specs');
        setSpecs(result.payload);

        if (isEditModalProps(props)) {
          setSelectedSpecs(props.technology.specialization.map((el) => el.id));
        }
      } catch (e: any) {
        errorHandler(e, dispatch);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadSpecs();
  }, [open, dispatch, props]);

  return (
    <CustomModal
      open={open}
      caption={isEdit ? 'Изменить направление' : 'Создать направление'}
      onClose={closeModal}
    >
      <div className={'p-6'}>
        <CustomInput
          className={'mb-10'}
          label={'Название направления'}
          value={techName}
          onInput={setTechName}
        />
        <CustomInput
          className={'mb-10'}
          label={'Описание направления'}
          value={techDescr}
          onInput={setTechDescr}
        />
        <div>
          <div>Список специализаций</div>
          <div className={'flex flex-wrap gap-5 mt-2 max-h-[300px] overflow-auto'}>
            {specs.length ? (
              specs.map((spec) => (
                <TechComponent
                  tech={spec}
                  key={spec.id}
                  selected={selectedSpecs.includes(spec.id)}
                  onClick={() => handleSetSelectedSpecs(spec.id)}
                />
              ))
            ) : (
              <div>Специализации не найдены</div>
            )}
          </div>
        </div>
        <div className={'flex'}>
          <CustomButton
            className={'ml-auto'}
            text={'Сохранить'}
            onClick={handleSaveOrEdit}
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default AddTechnologyModal;
