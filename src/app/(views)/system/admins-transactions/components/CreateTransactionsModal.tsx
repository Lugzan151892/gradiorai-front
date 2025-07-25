import CustomModal from '@/components/ui/modal/CustomModal';
import React, { useCallback, useEffect, useState } from 'react';
import Api from '@/core/api/api';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';
import errorHandler from '@/core/utils/error/errorHandler';
import UIFilterButton from '@/components/ui/filter-button/UIFilterButton';
import UIButton from '@/components/ui/button/UIButton';
import { IUser } from '@/core/interfaces/types';
import { RootState } from '@/store';
import UIInput from '@/components/ui/input/UIInput';

interface ICreateTransactionModalProps {
  open?: boolean;
  onClose?: () => void;
  onSave?: () => void;
}

const CreateTransactionModal: React.FC<ICreateTransactionModalProps> = ({ open = false, onClose }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.user);

  const [admins, setAdmins] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | undefined>(user?.id);

  const loadAdmins = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<undefined, IUser[]>('/user/users');

      if (result.payload) {
        setAdmins(result.payload);
      }
      setSelectedUser(user?.id);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!open) {
      return;
    }

    loadAdmins();
  }, [open, loadAdmins]);

  return (
    <CustomModal
      open={open}
      caption={'Добавить транзакцию'}
      onClose={onClose}
    >
      <div className={'m-6 flex flex-col'}>
        <div className={'flex flex-col mt-4'}>
          <div className={'text-xl'}>Выберите, кто производил оплату</div>
          <div className={'flex flex-wrap gap-3 justify-center'}>
            {admins.map((el) => (
              <UIFilterButton
                className={'lg:mt-2 mt-1'}
                key={el.id}
                text={el.email}
                selected={selectedUser === el.id}
                onClick={() => setSelectedUser(el.id)}
              />
            ))}
          </div>
        </div>
        <UIInput
          label={'Укажите сумму'}
          type={'number'}
        />
        <div className={'w-full flex mt-6 mb-6'}>
          <UIButton
            className={'mx-auto'}
            text={'Добавить направления'}
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default CreateTransactionModal;
