type ErrorType = 'unknown' | 'server' | 'auth';

export default class SystemError extends Error {
  private type: ErrorType;
  public status: number;

  constructor(type: ErrorType = 'unknown', status: number = 500) {
    super();

    this.name = 'SystemError';
    this.type = type;
    this.status = status;

    switch (this.type) {
      case 'server':
        this.message = 'Ошибка сервера.\r\nСвяжитесь с разработчиками.';
        break;
      case 'auth':
        this.message = 'Ошибка авторизации.';
        break;
      default:
        this.message = 'Произошла ошибка.\r\nСвяжитесь с разработчиками.';
        break;
    }
  }
}
