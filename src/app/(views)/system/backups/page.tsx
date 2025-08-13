'use client';

import UIButton from '@/components/ui/button/UIButton';
import { ScrollArea } from '@/components/ui/scroll-area/ScrollArea';
import Api from '@/core/api/api';
import { normalizeServerDate } from '@/core/utils/date';
import errorHandler from '@/core/utils/error/errorHandler';
import { formatFileSize } from '@/core/utils/files';
import { setLoading } from '@/features/loading/loadingSlice';
import routeChecker from '@/hoc/routeChecker';
import { useAppDispatch } from '@/hooks/redux';
import React, { useCallback, useEffect, useState } from 'react';

interface IBackup {
  createdAt: string;
  name: string;
  path: string;
  size: number;
}

const BackupsPage = () => {
  const [backups, setBackups] = useState<IBackup[]>([]);
  const dispatch = useAppDispatch();

  const getLogs = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<undefined, Array<IBackup>>('/system/backups');

      setBackups(result.payload);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    getLogs();
  }, [getLogs]);

  const downloadFile = async (name: string) => {
    if (!name) {
      return;
    }

    try {
      dispatch(setLoading(true));
      await Api.download('/system/backups/download/' + name, name);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={'flex flex-col h-full items-center'}>
      <div className={'text-5xl mb-5'}>Бэкапы</div>
      <div className={'w-full px-4 mt-4 h-full overflow-hidden'}>
        <ScrollArea>
          <div className={'mb-4 relative bg-modal'}>
            <div className={'sticky top-0 left-0 border grid grid-cols-[15%_45%_20%_20%] min-h-8 border bg-modal'}>
              <div className={'text-2xl border-r text-center'}>Дата бэкапа</div>
              <div className={'text-2xl border-r px-2'}>Название</div>
              <div className={'text-2xl border-r px-2'}>Размер</div>
              <div className={'text-2xl text-center'}>Действия</div>
            </div>
            {backups.length &&
              backups.map((backup, iBackup) => (
                <div
                  key={iBackup}
                  className={'border w-full grid grid-cols-[15%_45%_20%_20%]'}
                >
                  <div className={'text-xl border-r px-2 text-center'}>{normalizeServerDate(backup.createdAt)}</div>
                  <div className={'text-xl border-r px-2'}>{backup.name}</div>
                  <div className={'text-xl border-r px-2'}>{formatFileSize(backup.size)}</div>
                  <div className={'p-2 flex items-center justify-center'}>
                    <UIButton
                      text={'Скачать'}
                      onClick={() => downloadFile(backup.name)}
                    />
                  </div>
                </div>
              ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default routeChecker(BackupsPage, 'adminOnly');
