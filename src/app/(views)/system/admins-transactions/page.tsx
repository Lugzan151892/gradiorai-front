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
import UIInput from '@/components/ui/input/UIInput';

const AdminTransactions = () => {
  const [adminsTransactions, setAdminsTransactions] = useState<ISystemTransaction[]>([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const dispatch = useAppDispatch();

  const loadTransactions = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<undefined, ISystemTransaction[]>('/user/system-transactions/all');

      setAdminsTransactions(result.payload);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

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
          onClick={() => setOpenCreateModal(true)}
        />
      </div>
      <UIInput
        label={'Телефон'}
        mask={{
          mask: '+{7} (000) 000-00-00',
        }}
        onInput={console.log}
      />
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
            {adminsTransactions.length &&
              adminsTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className={'border w-full grid grid-cols-[3%_15%_12%_15%_10%_10%_19%_16%]'}
                >
                  <div className={'text-xl border-r text-center'}>{transaction.id}</div>
                  <div className={'text-xl border-r px-2'}>{transaction.amount}</div>
                  <div className={'text-xl border-r px-2'}>
                    {transaction.created_at ? normalizeServerDate(transaction.created_at) : ''}
                  </div>
                  <div className={'text-xl border-r px-2'}>
                    {transaction.paid_time ? normalizeServerDate(transaction.paid_time) : ''}
                  </div>
                  <div className={'text-xl border-r px-2'}>{transaction.transaction_maker_id || ''}</div>
                  <div className={'text-xl border-r px-2'}>test</div>
                  <div className={'text-xl border-r text-center'}>test</div>
                  <div className={'text-xl text-center'}>test</div>
                </div>
              ))}
          </div>
        </ScrollArea>
      </div>
      <CreateTransactionModal open={openCreateModal} />
    </div>
  );
};

export default AdminTransactions;
