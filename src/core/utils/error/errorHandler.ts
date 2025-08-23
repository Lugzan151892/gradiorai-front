import { AppDispatch } from '@/store';
import { openModal } from '@/store/tech/techSlice';
import SystemError from '@/core/utils/error/SystemError';
import UserError from '@/core/utils/error/UserError';

const errorHandler = (error: UserError | SystemError | any, dispatch: AppDispatch) => {
  dispatch(
    openModal({
      text: error?.message || 'Произошла ошибка.\r\nСвяжитесь с разработчиками. (support@gradior.ru)',
      type: 'error',
      status: error?.status || 500,
    })
  );
};

export default errorHandler;
