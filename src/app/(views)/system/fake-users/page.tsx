'use client';

import Api from '@/core/api/api';
import { normalizeServerDate } from '@/core/utils/date';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import React, { useCallback, useEffect, useState } from 'react';
import UIButton from '@/components/ui/button/UIButton';
import { openModal } from '@/store/tech/techSlice';
import { ScrollArea } from '@/components/ui/scroll-area/ScrollArea';
import routeChecker from '@/hoc/routeChecker';
import { IFakeUser } from '@/app/(views)/system/interfaces';
import FakeUserModal from './components/FakeUserModal';

const SystemFakeUsers = () => {
  const [fakeUsers, setFakeUsers] = useState<IFakeUser[]>([]);
  const dispatch = useAppDispatch();
  const [openFakeUserModal, setOpenFakeUserModal] = useState(false);
  const [currentFakeUser, setCurrentFakeUser] = useState<IFakeUser | null>(null);

  const loadFakeUsers = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<undefined, IFakeUser[]>('/user/rating/fake-users');

      setFakeUsers(result.payload);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const handleAddFakeUser = () => {
    setCurrentFakeUser({ id: '', name: '', total_rating: 0 });
    setOpenFakeUserModal(true);
  };

  const handleSaveFakeUser = async (user: IFakeUser) => {
    try {
      dispatch(setLoading(true));
      if (user.id) await Api.put<IFakeUser, IFakeUser>('/user/rating/fake-users', user);
      else await Api.post<IFakeUser, IFakeUser>('/user/rating/fake-users', user);

      dispatch(
        openModal({
          text: user.id ? 'Фейковый пользователь успешно обновлен' : 'Фейковый пользователь успешно добавлен',
        })
      );

      loadFakeUsers();
      setOpenFakeUserModal(false);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleEditFakeUser = async (id: string) => {
    if (!id) return;

    try {
      dispatch(setLoading(true));
      const result = await Api.get<undefined, IFakeUser>(`/user/rating/fake-users/${id}`);

      setCurrentFakeUser(result.payload);
      setOpenFakeUserModal(true);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteFakeUser = async (id: string) => {
    try {
      await Api.delete<{ id: string }, { message: string }>('/user/rating/fake-users', { id });

      dispatch(
        openModal({
          text: 'Фейковый пользователь успешно удален',
        })
      );

      loadFakeUsers();
    } catch (e) {
      errorHandler(e, dispatch);
    }
  };

  useEffect(() => {
    loadFakeUsers();
  }, [loadFakeUsers]);

  return (
    <div className={'flex flex-col h-full items-center'}>
      <div className={'text-5xl mb-5'}>Список фейковых пользователей</div>
      <div className={'flex'}>
        <UIButton
          text={'Добавить фейкового пользователя'}
          onClick={() => handleAddFakeUser()}
        />
      </div>
      <div className={'w-full px-4 mt-4 h-full overflow-hidden'}>
        <ScrollArea>
          <div className={'mb-4 relative bg-modal'}>
            <div className={'sticky top-0 left-0 border grid grid-cols-[20%_35%_25%_20%] min-h-8 border bg-modal'}>
              <div className={'text-2xl border-r px-2'}>ID</div>
              <div className={'text-2xl border-r px-2'}>Имя пользователя</div>
              <div className={'text-2xl border-r px-2'}>Рейтинг пользователя</div>
              <div className={'text-2xl border-r px-2'}>ACTIONS</div>
            </div>
            {!!fakeUsers.length &&
              fakeUsers.map((fakeUser) => (
                <div
                  key={fakeUser.id}
                  className={'border w-full grid grid-cols-[20%_35%_25%_20%]'}
                >
                  <div className={'text-xl border-r text-center'}>{fakeUser.id}</div>
                  <div className={'text-xl border-r px-2 truncate'}>{fakeUser.name}</div>
                  <div className={'text-xl border-r px-2'}>{fakeUser.total_rating}</div>
                  <div className={'flex flex-col px-2 py-2'}>
                    <UIButton
                      className={'mb-2'}
                      text={'Редактировать'}
                      onClick={() => handleEditFakeUser(fakeUser.id)}
                    />
                    <UIButton
                      text={'Удалить'}
                      onClick={() => handleDeleteFakeUser(fakeUser.id)}
                    />
                  </div>
                </div>
              ))}
          </div>
        </ScrollArea>
      </div>
      {currentFakeUser && (
        <FakeUserModal
          open={openFakeUserModal}
          onClose={() => setOpenFakeUserModal(false)}
          onSave={handleSaveFakeUser}
          user={currentFakeUser}
        />
      )}
    </div>
  );
};

export default routeChecker(SystemFakeUsers, 'adminOnly');
