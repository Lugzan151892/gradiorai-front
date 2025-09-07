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
import UIButton from '@/components/ui/button/UIButton';
import { openModal } from '@/store/tech/techSlice';
import { useConfirm } from '@/features/confirm-provider/ConfirmProvider';
import { Trans } from '@/i18n/Trans';

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

  const confirm = useConfirm();

  const deleteUser = async (id: number) => {
    const checkConfirm = await confirm({
      caption: 'Вы уверены, что хотите удалить пользователя?',
      content:
        'Это действие нельзя будет отменить. Все данные пользователя будут удалены. В том числе и связанные с ним сущности.',
      type: 'warning',
      buttons: [
        {
          key: 'yes',
          label: (
            <Trans
              ns={'common'}
              k={'common_delete'}
            />
          ),
          type: 'danger',
        },
        {
          key: 'no',
          label: (
            <Trans
              ns={'common'}
              k={'common_cancel'}
            />
          ),
          type: 'default',
        },
      ],
    });

    if (checkConfirm !== 'yes') return;

    try {
      dispatch(setLoading(true));

      await Api.delete(`/user/user/${id}`);
      loadUsers();

      openModal({
        text: 'Пользователь удален',
        type: 'success',
      });
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={'flex flex-col h-full items-center'}>
      <div className={'text-5xl mb-5'}>Список зарегистрированных пользователей</div>
      <div className={'w-full px-4 mt-4 h-full overflow-hidden'}>
        <ScrollArea>
          <div className={'mb-4 relative bg-modal'}>
            <div
              className={
                'sticky top-0 left-0 border grid grid-cols-[3%_15%_12%_15%_10%_19%_16%_10%] min-h-8 border bg-modal'
              }
            >
              <div className={'text-2xl border-r text-center'}>ID</div>
              <div className={'text-2xl border-r px-2'}>EMAIL</div>
              <div className={'text-2xl border-r px-2'}>Дата регистрации</div>
              <div className={'text-2xl border-r px-2'}>Последний вход</div>
              <div className={'text-2xl border-r px-2'}>Последний IP</div>
              <div className={'text-2xl border-r px-2'}>Кол-во пройденных вопросов</div>
              <div className={'text-2xl border-r text-center'}>STATUS</div>
              <div className={'text-2xl text-center'}>ACTIONS</div>
            </div>
            {users.length &&
              users.map((user) => (
                <div
                  key={user.id}
                  className={'border w-full grid grid-cols-[3%_15%_12%_15%_10%_19%_16%_10%]'}
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
                  <div className={'text-xl border-r text-center'}>{user.questions_passed?.length || 0}</div>
                  <div className={'text-xl border-r text-center'}>{user.admin ? 'ADMIN' : 'USER'}</div>
                  <div className={'text-xl text-center p-2'}>
                    <UIButton
                      text={'Удалить'}
                      onClick={() => deleteUser(user.id)}
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

export default routeChecker(SystemUsers, 'adminOnly');
