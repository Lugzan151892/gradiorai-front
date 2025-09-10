import { IResponseError } from '@/core/api/interfaces';

export default class UserError extends Error {
  public status: number;
  constructor(error: IResponseError) {
    super();
    this.message = error.payload.message || 'Произошла ошибка.\r\nСвяжитесь с разработчиками. (support@gradior.ru)';
    this.status = error.payload.statusCode;
  }
}
