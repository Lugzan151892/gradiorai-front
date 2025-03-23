import { IResponseError } from '@/core/api/interfaces';
import { AppDispatch } from '@/store';
import { openModal } from '@/store/tech/techSlice';

const errorHandler = (error: IResponseError, dispatch: AppDispatch) => {
  dispatch(
    openModal({
      text: error?.payload?.message || 'Произошла ошибка.\r\nСвяжитесь с разработчиками. asdas',
      type: 'error',
      status: error?.payload?.statusCode || 500,
    })
  );
};

export default errorHandler;
