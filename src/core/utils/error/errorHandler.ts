import { AppDispatch } from '@/store';
import { openModal } from '@/store/tech/techSlice';
import SystemError from '@/utils/errors/SystemError';
import UserError from '@/utils/errors/UserError';

const errorHandler = (error: UserError | SystemError, dispatch: AppDispatch) => {
  dispatch(
    openModal({
      text: error?.message || 'Произошла ошибка.\r\nСвяжитесь с разработчиками.',
      type: 'error',
      status: error?.status || 500,
    })
  );
};

export default errorHandler;
