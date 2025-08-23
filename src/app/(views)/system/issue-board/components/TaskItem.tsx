import React from 'react';
import { ETASK_STATUS, ITask } from '@/app/(views)/system/issue-board/interfaces';
import MarkdownMessage from '@/components/markdown-message/MarkdownMessage';
import UISelect from '@/components/ui/select/UISelect';

interface ITaskItemProps {
  task: ITask;
}

const TaskItem: React.FC<ITaskItemProps> = ({ task }) => {
  const taskStatuses = [
    { id: ETASK_STATUS.TODO, text: ETASK_STATUS.TODO },
    { id: ETASK_STATUS.DONE, text: ETASK_STATUS.DONE },
  ];

  return (
    <div className={'bg-main-gray rounded-xl p-4'}>
      <div className={'flex justify-between'}>
        <div className={'text-2xl mb-2'}>{task.title}</div>
        <UISelect
          value={task.status}
          options={taskStatuses}
        />
      </div>
      <MarkdownMessage
        message={task.description}
        isHuman
      />
    </div>
  );
};

export default TaskItem;
