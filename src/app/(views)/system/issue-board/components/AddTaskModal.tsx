import UIInput from '@/components/ui/input/UIInput';
import CustomModal from '@/components/ui/modal/CustomModal';
import React, { useEffect, useState } from 'react';
import UIButton from '@/components/ui/button/UIButton';
import { ITask } from '@/app/(views)/system/issue-board/interfaces';
import UITextarea from '@/components/ui/textarea/UITextarea';

interface IAddTaskModalProps {
  task: ITask;
  open: boolean;
  onSave: (task: ITask) => void;
  onClose?: () => void;
}

const AddTaskModal: React.FC<IAddTaskModalProps> = ({ task, open, onSave, onClose }) => {
  const [currentTask, setCurrentTask] = useState(task);

  useEffect(() => {
    setCurrentTask(task);
  }, [task, open]);

  return (
    <CustomModal
      open={open}
      caption={currentTask.id ? 'Изменить задачу' : 'Создать задачу'}
      onClose={onClose}
    >
      <div className={'p-6'}>
        <UIInput
          className={'mb-10'}
          label={'Название задачи'}
          value={currentTask.title}
          onInput={(val) =>
            setCurrentTask((prev) => {
              return {
                ...prev,
                title: val,
              };
            })
          }
        />
        <UITextarea
          className={'mb-10'}
          label={'Описание задачи'}
          value={task.content}
          onInput={(val) =>
            setCurrentTask((prev) => {
              return {
                ...prev,
                content: val,
              };
            })
          }
        />
        <div className={'flex'}>
          <UIButton
            className={'ml-auto'}
            text={'Сохранить'}
            onClick={() => onSave(currentTask)}
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default AddTaskModal;
