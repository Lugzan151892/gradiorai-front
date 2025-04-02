import TechComponent from '@/app/(views)/(tests)/tests/components/TechComponent';
import CustomButton from '@/components/ui/button/CustomButton';
import CustomInput from '@/components/ui/input/CustomInput';
import CustomModal from '@/components/ui/modal/CustomModal';
import Api from '@/core/api/api';
import { ETEST_SPEC } from '@/core/interfaces/enums';
import { ISpecialization } from '@/core/interfaces/types';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import { openModal } from '@/store/tech/techSlice';
import React, { useCallback, useEffect, useState } from 'react';

interface IAddTechModalProps {
  spec?: ETEST_SPEC;
  open?: boolean;
  onClose?: () => void;
}

const AddTechnologyModal: React.FC<IAddTechModalProps> = ({ open = false, onClose }) => {
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

  const loadSpecs = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<null, ISpecialization[]>('/questions/get-specs');
      setSpecs(result.payload);
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const handleSetSelectedSpecs = (val: number) => {
    if (selectedSpecs.includes(val)) {
      setSelectedSpecs([...selectedSpecs.filter((el) => el !== val)]);
    } else {
      setSelectedSpecs([...selectedSpecs, val]);
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
        desciption: techDescr,
        specs: selectedSpecs,
      });

      closeModal();
      dispatch(
        openModal({
          text: `Технология ${techName} успешно добавлена.`,
          type: 'success',
        })
      );
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (open) {
      loadSpecs();
    }
  }, [loadSpecs, open]);

  return (
    <CustomModal
      open={open}
      caption={'Создать направление'}
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
          <div>Список тенологий</div>
          <div className={'flex gap-5 mt-2'}>
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
              <div>Технологии не найдены</div>
            )}
          </div>
        </div>
        <div className={'flex'}>
          <CustomButton
            className={'ml-auto'}
            text={'Сохранить'}
            onClick={saveTech}
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default AddTechnologyModal;
