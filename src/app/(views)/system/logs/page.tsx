'use client';

import Api from '@/core/api/api';
import React, { useEffect, useState } from 'react';

interface ILog {
  context?: string;
  level: string;
  message: string;
  timestamp: string;
}

const parseJsonSafely = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (error: any) {
    console.log(error);

    return {
      context: '',
      level: '',
      message: '',
      timestamp: '',
    };
  }
};

const LogsPage = () => {
  const [logs, setLogs] = useState<ILog[]>([]);

  const getLogs = async () => {
    const result = await Api.get<any, { [key: number]: string }>(
      '/system/logs'
    );
    const parsedLogs: ILog[] = Object.values(result.payload)
      .reverse()
      .map((log) => parseJsonSafely(log));
    setLogs(parsedLogs);
  };

  useEffect(() => {
    getLogs();
  }, []);
  return (
    <div className={'text-black px-2 py-3'}>
      {logs
        ? logs.map((log, iLog) => (
            <div
              className={'grid grid-cols-[10%_10%_1fr_10%] border-1 mb-2'}
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

export default LogsPage;
