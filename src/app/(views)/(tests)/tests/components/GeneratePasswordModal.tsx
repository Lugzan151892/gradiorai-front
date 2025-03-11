import CustomButton from '@/components/ui/button/CustomButton';
import CustomInput from '@/components/ui/input/CustomInput';
import CustomModal from '@/components/ui/modal/CustomModal';
import React, { useState } from 'react';

interface IGeneratePasswordModalProps {
  open?: boolean;
  onClose?: () => void;
  saveTech?: (password: string) => void;
}

const GeneratePasswordModal: React.FC<IGeneratePasswordModalProps> = ({
  open = false,
  onClose,
  saveTech,
}) => {
  const [password, setPasword] = useState('');
  return (
    <CustomModal
      open={open}
      caption={'Введите пароль для генерации'}
      onClose={onClose}
    >
      <div>
        <p className={'mt-2 text-sm/6 text-black'}>
          Введите временный пароль для генерации теста. Пароль можно посмотреть
          в документации к сервису.
        </p>
        <CustomInput
          className={'mb-10'}
          label={'Пароль'}
          value={password}
          onInput={setPasword}
        />
        <div className={'flex'}>
          <CustomButton
            className={'ml-auto'}
            text={'Сгенерировать'}
            onClick={saveTech ? () => saveTech(password) : undefined}
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default GeneratePasswordModal;
