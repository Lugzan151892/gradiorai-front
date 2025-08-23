import React from 'react';
import { ETASK_STATUS, ITask } from '@/app/(views)/system/issue-board/interfaces';
import MarkdownMessage from '@/components/markdown-message/MarkdownMessage';
import UISelect from '@/components/ui/select/UISelect';
import { cn } from '@/lib/utils';
import UIButton from '@/components/ui/button/UIButton';

interface ITaskItemProps {
  task: ITask;
  className?: string;
  isSuggestion?: boolean;
  setTaskStatus?: (val: ETASK_STATUS) => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
}

const TaskItem: React.FC<ITaskItemProps> = ({
  task,
  className,
  isSuggestion,
  setTaskStatus,
  handleEdit,
  handleDelete,
}) => {
  const taskStatuses = [
    { id: ETASK_STATUS.TODO, text: ETASK_STATUS.TODO },
    { id: ETASK_STATUS.DONE, text: ETASK_STATUS.DONE },
  ];

  return (
    <div className={cn('bg-main-gray rounded-xl p-4', className)}>
      <div className={'flex justify-between'}>
        <div className={'text-2xl mb-2'}>{task.title}</div>
        {!isSuggestion && (
          <UISelect
            optionType={'enum'}
            value={task.status}
            options={taskStatuses}
            onChange={setTaskStatus}
          />
        )}
      </div>
      <MarkdownMessage
        message={task.content}
        isHuman
      />
      {!isSuggestion && (
        <div className={'flex w-full gap-2 justify-center'}>
          <UIButton
            text={'Изменить'}
            onClick={handleEdit}
          />
          <UIButton
            text={'Удалить'}
            onClick={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default TaskItem;
