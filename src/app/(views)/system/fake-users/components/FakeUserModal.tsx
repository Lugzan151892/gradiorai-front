import CustomModal from '@/components/ui/modal/CustomModal';
import React, { useEffect, useState } from 'react';
import { IFakeUser } from '@/app/(views)/system/interfaces';
import UIButton from '@/components/ui/button/UIButton';
import UIInput from '@/components/ui/input/UIInput';

interface ISaveQuestionModalProps {
  open?: boolean;
  onClose?: () => void;
  onSave?: (val: IFakeUser) => void;
  user: IFakeUser;
}

const SaveQuestionModal: React.FC<ISaveQuestionModalProps> = ({ open = false, onClose, onSave, user }) => {
  const [editedUser, setEditedUser] = useState(user);
  const [nameError, setNameError] = useState('');
  const [totalRatingError, setTotalRatingError] = useState('');

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleSave = () => {
    if (!editedUser.name) {
      setNameError('Имя пользователя не может быть пустым');
      return;
    }
    if (!editedUser.total_rating) {
      setTotalRatingError('Рейтинг пользователя не может быть пустым');
      return;
    }
    if (editedUser.total_rating < 0) {
      setTotalRatingError('Рейтинг пользователя не может быть отрицательным');
      return;
    }
    if (editedUser.total_rating > 6000) {
      setTotalRatingError('Рейтинг пользователя не может быть больше 6000');
      return;
    }
    onSave?.(editedUser);
  };

  return (
    <CustomModal
      open={open}
      caption={user.id ? 'Редактирование фейкового пользователя' : 'Добавление фейкового пользователя'}
      onClose={onClose}
    >
      <div className={'m-6'}>
        <div className={'mb-4'}>
          <UIInput
            className={'mb-4'}
            label={'Имя пользователя'}
            value={editedUser.name}
            error={nameError}
            onInput={(val) => {
              setNameError('');
              setEditedUser({ ...editedUser, name: val });
            }}
          />
          <UIInput
            label={'Рейтинг пользователя'}
            value={editedUser.total_rating}
            type={'number'}
            error={totalRatingError}
            onInput={(val) => {
              setTotalRatingError('');
              setEditedUser({ ...editedUser, total_rating: Number(val) });
            }}
          />
        </div>

        <div className={'flex'}>
          <UIButton
            className={'lg:ml-auto mx-auto'}
            text={'Сохранить фейкового пользователя'}
            onClick={handleSave}
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default SaveQuestionModal;
