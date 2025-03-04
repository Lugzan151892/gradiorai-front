export interface IResponseSuccess<R> {
  payload: R;
  error: false;
  errorMessage?: null;
  message?: null;
  status: number;
  success: true;
}

export interface IResponseError {
  error: true;
  errorMessage: string;
  message?: null;
  status: number;
  success: false;
}

export type IResponse<R> = IResponseSuccess<R>;
export type IResponseSilent<R> = IResponseError | IResponseSuccess<R>;
