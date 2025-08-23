'use client';

import React, { useEffect, useState } from 'react';
import routeChecker from '@/hoc/routeChecker';
import { ITask, ETASK_STATUS } from '@/app/(views)/system/issue-board/interfaces';
import TaskItem from '@/app/(views)/system/issue-board/components/TaskItem';

const SystemUsers = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    setTasks([
      {
        id: 1,
        title: 'Task 1',
        description:
          '1. Сделать доску в сервисе для заполнения. 2. Сделать кнопку для анализа генерации задач 3. Придумать промт',
        status: ETASK_STATUS.TODO,
      },
      {
        id: 2,
        title: 'Task 2',
        description:
          '1. Сделать доску в сервисе для заполнения. 2. Сделать кнопку для анализа генерации задач 3. Придумать промт',
        status: ETASK_STATUS.TODO,
      },
      {
        id: 3,
        title: 'Task 3',
        description:
          '1. Сделать доску в сервисе для заполнения. 2. Сделать кнопку для анализа генерации задач 3. Придумать промт',
        status: ETASK_STATUS.TODO,
      },
      {
        id: 4,
        title: 'Task 4',
        description:
          '1. Сделать доску в сервисе для заполнения. 2. Сделать кнопку для анализа генерации задач 3. Придумать промт',
        status: ETASK_STATUS.TODO,
      },
      {
        id: 5,
        title: 'Task 5',
        description:
          '1. Сделать доску в сервисе для заполнения. 2. Сделать кнопку для анализа генерации задач 3. Придумать промт',
        status: ETASK_STATUS.TODO,
      },
    ]);
  }, []);

  return (
    <div className={'flex flex-col h-full items-center px-4'}>
      <div className={'text-5xl mb-5'}>Доска задач + аналитика</div>
      <div className={'w-full p-4 bg-main-black rounded-xl'}>
        <div className={'flex gap-6 h-full'}>
          <div className={'w-full p-2 flex flex-col'}>
            <div className={'text-2xl mb-2'}>BACKLOG</div>
            <div className={'flex-1 min-h-0 max-h-[calc(100dvh-300px)] overflow-y-auto px-2'}>
              <div className={'flex flex-col gap-2'}>
                {tasks
                  .filter((task) => task.status === ETASK_STATUS.TODO)
                  .map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className={'w-full p-2 flex flex-col'}>
            <div className={'text-2xl mb-2'}>DONE</div>
            <div className={'flex-1 min-h-0 max-h-[calc(100dvh-300px)] overflow-y-auto px-2'}>
              <div className={'flex flex-col gap-2'}>
                {tasks
                  .filter((task) => task.status === ETASK_STATUS.DONE)
                  .map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default routeChecker(SystemUsers, 'adminOnly');
