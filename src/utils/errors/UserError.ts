import { IResponseError } from '@/services/api/interfaces';

export default class UserError extends Error {
  public status: number;
  constructor(error: IResponseError) {
    super();
    this.message =
      error.errorMessage ||
      error.message ||
      'Произошла ошибка.\r\nСвяжитесь с разработчиками.';
    this.status = error.status;
  }
}
