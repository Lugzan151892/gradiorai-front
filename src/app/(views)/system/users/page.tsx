'use client';

import Api from '@/core/api/api';
import { IUser } from '@/core/interfaces/types';
import { normalizeServerDate } from '@/core/utils/date';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area/ScrollArea';
import routeChecker from '@/hoc/routeChecker';

const SystemUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const dispatch = useAppDispatch();

  const loadUsers = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<undefined, IUser[]>('/user/users');

      setUsers(result.payload);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <div className={'flex flex-col h-full items-center'}>
      <div className={'text-5xl mb-5'}>Список зарегистрированных пользователей</div>
      <div className={'w-full px-4 mt-4 h-full overflow-hidden'}>
        <ScrollArea>
          <div className={'mb-4 relative bg-modal'}>
            <div
              className={
                'sticky top-0 left-0 border grid grid-cols-[3%_15%_12%_15%_10%_10%_19%_16%] min-h-8 border bg-modal'
              }
            >
              <div className={'text-2xl border-r text-center'}>ID</div>
              <div className={'text-2xl border-r px-2'}>EMAIL</div>
              <div className={'text-2xl border-r px-2'}>Дата регистрации</div>
              <div className={'text-2xl border-r px-2'}>Последний вход</div>
              <div className={'text-2xl border-r px-2'}>Последний IP</div>
              <div className={'text-2xl border-r px-2'}>3 последних IP</div>
              <div className={'text-2xl border-r px-2'}>Кол-во пройденных вопросов</div>
              <div className={'text-2xl text-center'}>STATUS</div>
            </div>
            {users.length &&
              users.map((user) => (
                <div
                  key={user.id}
                  className={'border w-full grid grid-cols-[3%_15%_12%_15%_10%_10%_19%_16%]'}
                >
                  <div className={'text-xl border-r text-center'}>{user.id}</div>
                  <div className={'text-xl border-r px-2'}>{user.email}</div>
                  <div className={'text-xl border-r px-2'}>
                    {user.created_at ? normalizeServerDate(user.created_at) : ''}
                  </div>
                  <div className={'text-xl border-r px-2'}>
                    {user.last_login ? normalizeServerDate(user.last_login) : ''}
                  </div>
                  <div className={'text-xl border-r px-2'}>{user.last_ip || ''}</div>
                  <div className={'text-xl border-r px-2'}>
                    {user.ip_log
                      ? user.ip_log.map((ip, iIp) => (
                          <span key={iIp}>
                            {ip.ip}
                            <br />
                          </span>
                        ))
                      : ''}
                  </div>
                  <div className={'text-xl border-r text-center'}>{user.questions_passed?.length || 0}</div>
                  <div className={'text-xl text-center'}>{user.admin ? 'ADMIN' : 'USER'}</div>
                </div>
              ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default routeChecker(SystemUsers, 'adminOnly');
