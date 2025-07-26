import CustomModal from '@/components/ui/modal/CustomModal';
import React, { useCallback, useEffect, useState } from 'react';
import Api from '@/core/api/api';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';
import errorHandler from '@/core/utils/error/errorHandler';
import UIFilterButton from '@/components/ui/filter-button/UIFilterButton';
import UIButton from '@/components/ui/button/UIButton';
import { ISystemTransaction, IUser } from '@/core/interfaces/types';
import { RootState } from '@/store';
import UIInput from '@/components/ui/input/UIInput';
import UIDatePicker from '@/components/ui/datepicker/UIDatepicker';
import UITextarea from '@/components/ui/textarea/UITextarea';

interface ICreateTransactionModalProps {
  open?: boolean;
  transactionId?: number;
  onClose?: () => void;
  onSave?: () => void;
}

const emptyTransaction: () => Partial<ISystemTransaction> = () => ({
  id: 0,
  paid_time: '',
  transaction_maker_id: 0,
  amount: 0,
  reason: '',
});

const CreateTransactionModal: React.FC<ICreateTransactionModalProps> = ({ open = false, onClose, transactionId }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.user);
  const [transaction, setTransaction] = useState<Partial<ISystemTransaction>>(emptyTransaction());
  const [admins, setAdmins] = useState<IUser[]>([]);

  const [amountError, setAmountError] = useState('');
  const [dateError, setDateError] = useState('');
  const [reasonError, setReasonError] = useState('');

  const loadAdmins = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<{ only_admins: boolean }, IUser[]>('/user/users', { only_admins: true });

      if (result.payload) {
        setAdmins(result.payload);
      }

      setTransaction((prev) => ({
        ...prev,
        transaction_maker_id: user?.id,
      }));
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, user]);

  const loadTransactionById = useCallback(async () => {
    if (!transactionId) {
      return;
    }

    try {
      dispatch(setLoading(true));
      const result = await Api.get<{ id: number }, ISystemTransaction>('/user/system-transactions/transaction', {
        id: transactionId,
      });

      if (result.payload) {
        setTransaction(result.payload);
      }
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [transactionId, dispatch]);

  useEffect(() => {
    if (!open) {
      return;
    }

    loadAdmins();

    if (transactionId) {
      loadTransactionById();
    }
  }, [open, loadAdmins, transactionId, loadTransactionById]);

  const handleCheckIsFieldsValid = () => {
    const amountErrorMsg = +(transaction?.amount || 0) ? '' : 'Поле не заполнено';
    const dateEmptyMessage = transaction?.paid_time ? '' : 'Поле не заполнено';
    const dateErrorMsg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(transaction?.paid_time || '')
      ? ''
      : 'Неверный формат даты';
    const reasonErrorMessage = transaction?.reason ? '' : 'Поле не заполнено';

    if (amountErrorMsg || dateEmptyMessage || dateErrorMsg || reasonErrorMessage) {
      setAmountError(amountErrorMsg);
      setDateError(dateEmptyMessage || dateErrorMsg);
      setReasonError(reasonErrorMessage);
      return false;
    }

    return true;
  };

  const saveTransaction = async () => {
    if (!handleCheckIsFieldsValid()) {
      return;
    }

    try {
      dispatch(setLoading(true));
      const result = transaction?.id
        ? await Api.put<Partial<ISystemTransaction>, { id: number }>(
            '/user/system-transactions/transaction',
            transaction
          )
        : await Api.post<Partial<ISystemTransaction>, { id: number }>(
            '/user/system-transactions/transaction',
            transaction
          );

      if (result.payload) {
        setTransaction(result.payload);
      }
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <CustomModal
      open={open}
      caption={'Добавить транзакцию'}
      onClose={onClose}
    >
      <div className={'m-6 flex flex-col'}>
        <div className={'flex flex-col mt-4'}>
          <div className={'text-xl'}>Выберите, кто производил оплату</div>
          <div className={'flex flex-wrap gap-3 justify-center mb-2'}>
            {admins.map((el) => (
              <UIFilterButton
                className={'lg:mt-2 mt-1'}
                key={el.id}
                text={el.email}
                selected={transaction?.transaction_maker_id === el.id}
                onClick={() =>
                  setTransaction((prev) => ({
                    ...prev,
                    transaction_maker_id: el.id,
                  }))
                }
              />
            ))}
          </div>
        </div>
        <UIInput
          label={'Укажите сумму'}
          type={'number'}
          error={amountError}
          value={transaction?.amount}
          onInput={() => setAmountError('')}
          onChange={(val) =>
            setTransaction((prev) => ({
              ...prev,
              amount: +val,
            }))
          }
        />
        <UIDatePicker
          label={'Дата платежа'}
          value={transaction?.paid_time}
          error={dateError}
          onInput={() => setDateError('')}
          onChange={(val) =>
            setTransaction((prev) => ({
              ...prev,
              paid_time: val,
            }))
          }
        />
        <UITextarea
          className={'mt-6'}
          id={'user-description'}
          label={'Тип услуги'}
          hint={'Опишите, на что были потрачены средства'}
          value={transaction?.reason}
          error={reasonError}
          rows={3}
          onInput={(val) => {
            setReasonError('');
            setTransaction((prev) => ({
              ...prev,
              reason: val,
            }));
          }}
        />
        <div className={'w-full flex mt-6 mb-6'}>
          <UIButton
            className={'mx-auto'}
            text={'Сохранить платеж'}
            onClick={saveTransaction}
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default CreateTransactionModal;
