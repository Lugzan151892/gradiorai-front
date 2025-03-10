import CustomButton from '@/components/ui/button/CustomButton';
import CustomInput from '@/components/ui/input/CustomInput';
import CustomModal from '@/components/ui/modal/CustomModal';
import { ETEST_SPEC } from '@/core/interfaces/enums';
import React, { useState } from 'react';

interface IAddTechModalProps {
  spec?: ETEST_SPEC;
  open?: boolean;
  onClose?: () => void;
}

const AddTechModal: React.FC<IAddTechModalProps> = ({
  spec,
  open = false,
  onClose,
}) => {
  const [tech, setTech] = useState('');

  const saveTech = () => {
    console.log('saved', spec);

    if (onClose) {
      onClose();
    }
  };
  return (
    <CustomModal
      open={open}
      caption={'Создать направление'}
      onClose={onClose}
    >
      <div>
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
