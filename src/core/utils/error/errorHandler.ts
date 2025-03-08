import { IResponse } from '@/core/api/interfaces';
import { AppDispatch } from '@/store';
import { openModal } from '@/store/tech/techSlice';

const errorHandler = (error: IResponse<null>, dispatch: AppDispatch) => {
  if (error?.errorMessage) {
    dispatch(
      openModal({
        text: error?.errorMessage,
        type: 'error',
        status: error.status,
      })
    );
  } else {
    dispatch(
      openModal({
        text:
          error?.message ||
          'Произошла ошибка.\r\nСвяжитесь с разработчиками. asdas',
        type: 'error',
        status: error?.status || 500,
      })
    );
  }
};

export default errorHandler;
