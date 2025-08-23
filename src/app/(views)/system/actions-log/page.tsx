'use client';

import Api from '@/core/api/api';
import { normalizeServerDate } from '@/core/utils/date';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area/ScrollArea';
import { IActionsLog } from '@/core/interfaces/types';
import { EGPT_SETTINGS_TYPE } from '@/core/interfaces/enums';
import ContentModal from './components/ContentModal';
import routeChecker from '@/hoc/routeChecker';

const SystemActionsLog = () => {
  const [logs, setLogs] = useState<IActionsLog[]>([]);
  const dispatch = useAppDispatch();
  const [modalContent, setModalContent] = useState<string>('');
  const [modalContentType, setModalContentType] = useState<EGPT_SETTINGS_TYPE>(EGPT_SETTINGS_TYPE.INTERVIEW);
  const [openModalContent, setOpenModalContent] = useState<boolean>(false);

  const loadUsersLogs = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<undefined, IActionsLog[]>('/user/actions-log/logs');

      setLogs(result.payload);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const openInfoModal = (content: string, type: EGPT_SETTINGS_TYPE) => {
    if (!content) {
      return;
    }

    setModalContent(content);
    setModalContentType(type);
    setOpenModalContent(true);
  };

  useEffect(() => {
    loadUsersLogs();
  }, [loadUsersLogs]);

  return (
    <div className={'flex flex-col h-full items-center'}>
      <div className={'text-5xl mb-5'}>Список собеседований</div>
      <div className={'w-full px-4 mt-4 h-full overflow-hidden'}>
        <ScrollArea>
          <div className={'mb-4 relative bg-modal'}>
            <div className={'sticky top-0 left-0 border grid grid-cols-[12%_20%_15%_15%_38%] min-h-8 border bg-modal'}>
              <div className={'text-2xl border-r px-2'}>Дата активности</div>
              <div className={'text-2xl border-r px-2'}>Имя пользователя</div>
              <div className={'text-2xl border-r px-2'}>IP</div>
              <div className={'text-2xl border-r px-2'}>Тип активности</div>
              <div className={'text-2xl border-r px-2'}>Контент</div>
            </div>
            {logs.length &&
              logs.map((log) => (
                <div
                  key={log.id}
                  className={'border w-full grid grid-cols-[12%_20%_15%_15%_38%]'}
                >
                  <div className={'text-xl border-r px-2'}>
                    {log.createdAt ? normalizeServerDate(log.createdAt) : ''}
                  </div>
                  <div className={'text-xl border-r text-center'}>{log.user?.email || 'UNAUTH'}</div>
                  <div className={'text-xl border-r px-2 truncate'}>{log.user_ip || 'Скрыт'}</div>
                  <div className={'text-xl border-r px-2 truncate'}>{log.type}</div>
                  {log.type === EGPT_SETTINGS_TYPE.INTERVIEW ? (
                    <a
                      className={'text-xl text-center border-r border-white hover:text-main-blue hover:underline'}
                      href={`/interview/${log.interview?.id}`}
                      target={'_blank'}
                      rel={'noreferrer'}
                    >
                      Перейти к собеседованию
                    </a>
                  ) : (
                    <div
                      className={
                        'text-xl border-r px-2 text-center hover:text-main-blue hover:underline cursor-pointer'
                      }
                      onClick={() => openInfoModal(log.content || '', log.type)}
                    >
                      Посмотреть данные
                    </div>
                  )}
                </div>
              ))}
          </div>
        </ScrollArea>
        <ContentModal
          open={openModalContent}
          content={modalContent}
          type={modalContentType}
          onClose={() => setOpenModalContent(false)}
        />
      </div>
    </div>
  );
};

export default routeChecker(SystemActionsLog, 'adminOnly');
