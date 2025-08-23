'use client';

import React, { useCallback, useEffect, useState } from 'react';
import routeChecker from '@/hoc/routeChecker';
import { ITask, ETASK_STATUS } from '@/app/(views)/system/issue-board/interfaces';
import TaskItem from '@/app/(views)/system/issue-board/components/TaskItem';
import UIButton from '@/components/ui/button/UIButton';
import Api from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import { useAppDispatch } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';
import AddTaskModal from './components/AddTaskModal';

const emptyTask: () => ITask = () => {
  return {
    id: '',
    title: '',
    status: ETASK_STATUS.TODO,
    description: '',
  };
};

const SystemUsers = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [currentTask, setCurrentTask] = useState<ITask | null>(null);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [gptTasks, setGptTasks] = useState<ITask[]>([]);
  const dispatch = useAppDispatch();

  const setTaskStatus = (taskId: string, newStatus: ETASK_STATUS) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)));
  };

  const addNewTask = () => {
    setCurrentTask(emptyTask());
    setOpenTaskModal(true);
  };

  const loadTasks = useCallback(async () => {
    try {
      dispatch(setLoading(true));

      const result = await Api.get<undefined, ITask[]>('/system/tasks/all');

      setTasks(result.payload);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const createOrEditTask = async (task: ITask) => {
    try {
      dispatch(setLoading(true));
      if (task.id) await Api.put(`/system/tasks/${task.id}`, task);
      else await Api.post('/system/tasks/add', task);

      setOpenTaskModal(false);

      loadTasks();
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const editTask = async (taskId: string) => {
    try {
      dispatch(setLoading(true));

      const result = await Api.get<undefined, ITask>(`/system/tasks/${taskId}`);

      setCurrentTask(result.payload);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      dispatch(setLoading(true));

      await Api.delete<undefined, ITask>(`/system/tasks/${taskId}`);

      loadTasks();
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    loadTasks();
    setTasks([
      {
        id: '1',
        title: 'Task 1',
        description:
          '1. Сделать доску в сервисе для заполнения. 2. Сделать кнопку для анализа генерации задач 3. Придумать промт',
        status: ETASK_STATUS.TODO,
      },
      {
        id: '2',
        title: 'Task 2',
        description:
          '1. Сделать доску в сервисе для заполнения. 2. Сделать кнопку для анализа генерации задач 3. Придумать промт',
        status: ETASK_STATUS.TODO,
      },
      {
        id: '3',
        title: 'Task 3',
        description:
          '1. Сделать доску в сервисе для заполнения. 2. Сделать кнопку для анализа генерации задач 3. Придумать промт',
        status: ETASK_STATUS.TODO,
      },
      {
        id: '4',
        title: 'Task 4',
        description:
          '1. Сделать доску в сервисе для заполнения. 2. Сделать кнопку для анализа генерации задач 3. Придумать промт',
        status: ETASK_STATUS.TODO,
      },
      {
        id: '5',
        title: 'Task 5',
        description:
          '1. Сделать доску в сервисе для заполнения. 2. Сделать кнопку для анализа генерации задач 3. Придумать промт',
        status: ETASK_STATUS.TODO,
      },
    ]);
  }, [loadTasks]);

  return (
    <div className={'flex flex-col h-full items-center px-4'}>
      <div className={'text-5xl mb-5'}>Доска задач + аналитика</div>
      <UIButton
        text={'Создать задачу'}
        onClick={addNewTask}
      />
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
                      handleEdit={() => editTask(task.id)}
                      handleDelete={() => deleteTask(task.id)}
                      setTaskStatus={(newStatus) => setTaskStatus(task.id, newStatus)}
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
                      setTaskStatus={(newStatus) => setTaskStatus(task.id, newStatus)}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={'text-5xl mb-5 mt-5'}>Предложения задач от Чата</div>
      <div className={'w-full p-4 bg-main-black rounded-xl'}>
        <div className={'flex gap-6 h-full'}>
          <div className={'w-full p-2 flex flex-col'}>
            <div className={'text-2xl mb-2'}>BACKLOG</div>
            <div className={'flex-1 min-h-0 max-h-[calc(100dvh-300px)] overflow-y-auto px-2'}>
              <div className={'flex flex-col gap-2'}>
                {gptTasks.map((task) => (
                  <div
                    className={'flex gap-2 items-center'}
                    key={task.id}
                  >
                    <TaskItem
                      className={'flex-grow'}
                      task={task}
                      isSuggestion
                      setTaskStatus={(newStatus) => setTaskStatus(task.id, newStatus)}
                    />
                    <UIButton text={'Перевести в бэклог'} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {currentTask && (
        <AddTaskModal
          open={openTaskModal}
          task={currentTask}
          onSave={createOrEditTask}
        />
      )}
    </div>
  );
};

export default routeChecker(SystemUsers, 'adminOnly');
