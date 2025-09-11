import CustomModal from '@/components/ui/modal/CustomModal';
import React, { useEffect, useState } from 'react';
import { ACHIEVEMENT_TRIGGER, ACHIEVEMENT_TYPE, IAchievement, IFile } from '@/core/interfaces/types';
import UIButton from '@/components/ui/button/UIButton';
import UIInput from '@/components/ui/input/UIInput';
import UISelect from '@/components/ui/select/UISelect';
import UILabel from '@/components/ui/label/UILabel';
import { openModal } from '@/store/tech/techSlice';
import { useAppDispatch } from '@/hooks/redux';
import FileDropzone from '@/components/ui/file-dropzone/FileDropzone';
import { ScrollArea } from '@/components/ui/scroll-area/ScrollArea';

interface ISaveQuestionModalProps {
  open?: boolean;
  onClose?: () => void;
  onSave?: (val: IAchievement) => void;
  achievement: IAchievement;
}

const AchievementModal: React.FC<ISaveQuestionModalProps> = ({ open = false, onClose, onSave, achievement }) => {
  const [editedAchievement, setEditedAchievement] = useState(achievement);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setEditedAchievement(achievement);
  }, [achievement]);

  const handleSave = () => {
    const errors = [];
    if (!editedAchievement.key) {
      errors.push('key: Ключ не может быть пустым');
    }
    if (!editedAchievement.title) {
      errors.push('title: Название не может быть пустым');
    }
    if (editedAchievement.target < 0) {
      errors.push('target: Целевое значение не может быть отрицательным');
    }
    if (editedAchievement.reward_points < 0) {
      errors.push('reward_points: Награда не может быть отрицательной');
    }

    if (errors.length > 0) {
      dispatch(
        openModal({
          text: errors.join('\n'),
        })
      );
      return;
    }

    onSave?.(editedAchievement);
  };

  return (
    <CustomModal
      open={open}
      caption={achievement.id ? 'Редактирование достижения' : 'Добавление достижения'}
      onClose={onClose}
    >
      <div className={'m-6 h-[70vh] p-4'}>
        <ScrollArea className={'h-full px-2'}>
          <div className={'mb-4'}>
            <UIInput
              className={'mb-4'}
              label={'Ключ'}
              value={editedAchievement.key}
              onInput={(val) => {
                setEditedAchievement({ ...editedAchievement, key: val });
              }}
            />
            <UIInput
              label={'Название'}
              value={editedAchievement.title}
              onInput={(val) => {
                setEditedAchievement({ ...editedAchievement, title: val });
              }}
            />
            <UIInput
              label={'Описание'}
              value={editedAchievement.description}
              onInput={(val) => {
                setEditedAchievement({ ...editedAchievement, description: val });
              }}
            />
            <div className={'flex gap-4 lg:flex-row flex-col'}>
              <div className={'flex flex-col gap-2 lg:w-auto w-full'}>
                <UILabel>Тип</UILabel>
                <UISelect
                  value={editedAchievement.type}
                  onChange={(val: ACHIEVEMENT_TYPE) => {
                    setEditedAchievement({ ...editedAchievement, type: val });
                  }}
                  options={Object.values(ACHIEVEMENT_TYPE).map((type) => ({
                    id: type,
                    text: type,
                  }))}
                />
              </div>
              <div className={'flex flex-col gap-2 lg:w-auto w-full'}>
                <UILabel>Триггер</UILabel>
                <UISelect
                  value={editedAchievement.trigger}
                  onChange={(val: ACHIEVEMENT_TRIGGER) => {
                    setEditedAchievement({ ...editedAchievement, trigger: val });
                  }}
                  options={Object.values(ACHIEVEMENT_TRIGGER).map((trigger) => ({
                    id: trigger,
                    text: trigger,
                  }))}
                />
              </div>
            </div>
            <UIInput
              label={'Целевое значение'}
              value={editedAchievement.target}
              type={'number'}
              onInput={(val) => {
                setEditedAchievement({ ...editedAchievement, target: Number(val) });
              }}
            />
            <UIInput
              label={'Награда'}
              value={editedAchievement.reward_points}
              type={'number'}
              onInput={(val) => {
                setEditedAchievement({ ...editedAchievement, reward_points: Number(val) });
              }}
            />
            <div className={'p-6 bg-main-black rounded-3xl'}>
              <div className={'text-2xl font-bold mb-6'}>Изображение для достижения</div>
              <FileDropzone
                maxFileSize={2}
                file={editedAchievement.image}
                filePath={
                  editedAchievement.image &&
                  typeof editedAchievement.image === 'object' &&
                  'path' in editedAchievement.image
                    ? editedAchievement.image.path
                    : undefined
                }
                formats={['svg']}
                onFileSelected={(e) => setEditedAchievement({ ...editedAchievement, image: e })}
              />
            </div>
          </div>

          <div className={'flex'}>
            <UIButton
              className={'lg:ml-auto mx-auto'}
              text={'Сохранить фейкового пользователя'}
              onClick={handleSave}
            />
          </div>
        </ScrollArea>
      </div>
    </CustomModal>
  );
};

export default AchievementModal;
