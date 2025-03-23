export interface IResponseSuccess<R> {
  payload: R;
  error: false;
  errorMessage?: null;
  message?: null;
  status: number;
  success: true;
}

export interface IResponseError {
  payload: {
    message?: string;
    statusCode: number;
    path?: string;
    type?: string;
  };
  success: false;
}

export type IResponse<R> = IResponseSuccess<R>;
export type IResponseSilent<R> = IResponseError | IResponseSuccess<R>;
