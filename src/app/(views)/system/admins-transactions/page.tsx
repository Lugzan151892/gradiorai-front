'use client';

import UIButton from '@/components/ui/button/UIButton';
import { ScrollArea } from '@/components/ui/scroll-area/ScrollArea';
import Api from '@/core/api/api';
import { ISystemTransaction } from '@/core/interfaces/types';
import { normalizeServerDate } from '@/core/utils/date';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import React, { useCallback, useEffect, useState } from 'react';
import CreateTransactionModal from './components/CreateTransactionsModal';
import UIFilterButton from '@/components/ui/filter-button/UIFilterButton';
import routeChecker from '@/hoc/routeChecker';

const AdminTransactions = () => {
  const [adminsTransactions, setAdminsTransactions] = useState<ISystemTransaction[]>([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [onlyMine, setOnlyMine] = useState(false);
  const [currentTransactionId, setCurrentTransactionId] = useState<number>(0);
  const dispatch = useAppDispatch();

  const openTransactionModal = (transactionId: number) => {
    setCurrentTransactionId(transactionId);

    setOpenCreateModal(true);
  };

  const loadTransactions = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<{ only_mine: boolean }, ISystemTransaction[]>('/user/system-transactions/all', {
        only_mine: onlyMine,
      });

      setAdminsTransactions(result.payload);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, onlyMine]);

  const handleDeleteTransaction = async (transactionId: number) => {
    if (!transactionId) {
      return;
    }

    try {
      dispatch(setLoading(true));
      await Api.delete<{ id: number }, null>('/user/system-transactions/transaction', { id: transactionId });
      loadTransactions();
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return (
    <div className={'flex flex-col h-full items-center'}>
      <div className={'flex items-center justify-center mb-5'}>
        <div className={'text-5xl'}>Список затрат на сервис</div>
        <UIButton
          className={'ml-2'}
          text={'Добавить затраты'}
          onClick={() => openTransactionModal(0)}
        />
      </div>
      <div className={'flex justify-center w-full gap-2 mt-4'}>
        <UIFilterButton
          className={'text-center'}
          text={'Только мои'}
          selected={onlyMine}
          onClick={() => setOnlyMine(true)}
        />
        <UIFilterButton
          className={'text-center'}
          text={'Все'}
          selected={!onlyMine}
          onClick={() => setOnlyMine(false)}
        />
      </div>
      <div className={'w-full px-4 mt-4 h-full overflow-hidden'}>
        <ScrollArea>
          <div className={'mb-4 relative bg-modal'}>
            <div
              className={
                'sticky top-0 left-0 border grid grid-cols-[3%_15%_12%_15%_10%_25%_20%] min-h-8 border bg-modal'
              }
            >
              <div className={'text-2xl border-r text-center'}>ID</div>
              <div className={'text-2xl border-r px-2'}>Пользователь</div>
              <div className={'text-2xl border-r px-2'}>Дата создания</div>
              <div className={'text-2xl border-r px-2'}>Фактическая дата оплаты</div>
              <div className={'text-2xl border-r px-2'}>Сумма</div>
              <div className={'text-2xl border-r px-2'}>Причина оплаты</div>
              <div className={'text-2xl text-center'}>Действия</div>
            </div>
            {adminsTransactions.length &&
              adminsTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className={'border w-full grid grid-cols-[3%_15%_12%_15%_10%_25%_20%]'}
                >
                  <div className={'text-xl border-r text-center'}>{transaction.id}</div>
                  <div className={'text-xl border-r px-2'}>{transaction.transaction_maker.email}</div>
                  <div className={'text-xl border-r px-2'}>
                    {transaction.created_at ? normalizeServerDate(transaction.created_at, 'DD.MM.YYYY') : ''}
                  </div>
                  <div className={'text-xl border-r px-2'}>
                    {transaction.paid_time ? normalizeServerDate(transaction.paid_time, 'DD.MM.YYYY') : ''}
                  </div>
                  <div className={'text-xl border-r px-2'}>{`${transaction.amount || 0} р.`}</div>
                  <div className={'text-xl border-r px-2'}>{transaction.reason}</div>
                  <div className={'text-xl text-center py-2 flex gap-2 justify-center'}>
                    <UIButton
                      text={'Изменить'}
                      onClick={() => openTransactionModal(transaction.id)}
                    />
                    <UIButton
                      text={'Удалить'}
                      onClick={() => handleDeleteTransaction(transaction.id)}
                    />
                  </div>
                </div>
              ))}
            <div className={'sticky top-0 left-0 border grid grid-cols-[80%_20%] min-h-8 border bg-modal'}>
              <div className={'text-2xl border-r ml-2'}>Всего затрачено: </div>
              <div className={'text-2xl text-center'}>
                {adminsTransactions.reduce((acc, cur) => (acc += cur.amount), 0) + ' р.'}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
      <CreateTransactionModal
        open={openCreateModal}
        transactionId={currentTransactionId}
        onClose={() => setOpenCreateModal(false)}
        onSave={loadTransactions}
      />
    </div>
  );
};

export default routeChecker(AdminTransactions, 'adminOnly');
