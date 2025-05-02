'use client';

import Api from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import routeChecker from '@/hoc/routeChecker';
import { useAppDispatch } from '@/hooks/redux';
import React, { useEffect, useState } from 'react';

interface ILog {
  context?: string;
  level: string;
  message: string;
  timestamp: string;
}

const LogsPage = () => {
  const [logs, setLogs] = useState<ILog[]>([]);
  const dispatch = useAppDispatch();

  const getLogs = async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<any, { [key: number]: string }>('/system/logs');
      const parsedLogs: ILog[] = result.payload[0]
        .trim()
        .split('\n')
        .map((line) => JSON.parse(line))
        .reverse();

      setLogs(parsedLogs);
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={'text-white px-2 py-3'}>
      {logs
        ? logs.map((log, iLog) => (
            <div
              className={'grid grid-cols-[10%_10%_1fr_10%] border-1 border-white mb-2'}
              key={iLog}
            >
              <div>{log.context}</div>
              <div>{log.level}</div>
              <div>{log.message}</div>
              <div>{log.timestamp}</div>
            </div>
          ))
        : null}
    </div>
  );
};

export default routeChecker(LogsPage, 'adminOnly');
