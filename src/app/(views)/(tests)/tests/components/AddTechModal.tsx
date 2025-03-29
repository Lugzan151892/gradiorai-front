import CustomButton from '@/components/ui/button/CustomButton';
import CustomInput from '@/components/ui/input/CustomInput';
import CustomModal from '@/components/ui/modal/CustomModal';
import Api from '@/core/api/api';
import { ETEST_SPEC } from '@/core/interfaces/enums';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import { openModal } from '@/store/tech/techSlice';
import React, { useState } from 'react';

interface IAddTechModalProps {
  spec?: ETEST_SPEC;
  open?: boolean;
  onClose?: () => void;
}

const AddTechModal: React.FC<IAddTechModalProps> = ({ open = false, onClose }) => {
  const [tech, setTech] = useState('');
  const dispatch = useAppDispatch();

  const closeModal = () => {
    setTech('');
    if (onClose) {
      onClose();
    }
  };

  const saveTech = async () => {
    if (!tech) {
      return;
    }

    try {
      dispatch(setLoading(true));
      await Api.post('/questions/add-tech', {
        name: tech,
      });

      closeModal();
      dispatch(
        openModal({
          text: `Технология ${tech} успешно добавлена.`,
          type: 'success',
        })
      );
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
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
          value={tech}
          onInput={setTech}
        />
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

export default AddTechModal;
