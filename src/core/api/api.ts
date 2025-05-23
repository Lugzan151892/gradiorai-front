import SystemError from '@/utils/errors/SystemError';
import UserError from '@/utils/errors/UserError';
import { IResponse, IResponseSilent } from '@/core/api/interfaces';

const API_PATH = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : `/api`;

type TApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type ResponseType<R, S extends boolean> = S extends true ? IResponseSilent<R> : IResponse<R>;

class Api {
  static handleRequestStatus(status: number, silentError: boolean = false) {
    if (status >= 500 && status <= 599) {
      throw new SystemError('server', status);
    } else if (status === 401 && !silentError) {
      throw new SystemError('auth', status);
    }
  }

  static request<T>(path: string, method: TApiMethod, options: T = {} as T): Promise<Response> {
    let requestParams = '';

    if (options && method === 'GET') {
      requestParams = Object.keys(options).reduce(
        (acc, curr) => `${acc}${acc ? '&' : '?'}${curr}=${(options as { [key: string]: string })[curr]}`,
        ''
      );
    }

    const authToken = localStorage.getItem('token');

    return fetch(API_PATH + path + requestParams, {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
      credentials: 'include',
      ...(method !== 'GET' && { body: JSON.stringify(options) }),
    });
  }

  static async handleResponse<T, R, S extends boolean>(
    path: string,
    method: TApiMethod,
    options: T = {} as T,
    silent?: S
  ): Promise<ResponseType<R, S>> {
    const response = await this.request<T>(path, method, options);

    this.handleRequestStatus(response.status, silent);

    if (!silent && !response.ok && response.status < 500) {
      const error = await response.json();
      throw new UserError({ payload: { ...error }, success: false });
    }

    const result = await response.text();
    const parsedResult = JSON.parse(result);

    if (parsedResult.accessToken) {
      localStorage.setItem('token', parsedResult.accessToken);
    }

    return {
      success: response.ok,
      payload: parsedResult,
    } as ResponseType<R, S>;
  }

  static async get<T, R>(path: string, options: T = {} as T): Promise<IResponse<R>> {
    return await this.handleResponse<T, R, false>(path, 'GET', options);
  }

  static async getSilent<T, R>(path: string, options: T = {} as T): Promise<IResponseSilent<R>> {
    return await this.handleResponse<T, R, true>(path, 'GET', options, true);
  }

  static async post<T, R>(path: string, options: T = {} as T): Promise<IResponse<R>> {
    return await this.handleResponse<T, R, false>(path, 'POST', options);
  }

  static async postSilent<T, R>(path: string, options: T = {} as T): Promise<IResponseSilent<R>> {
    return await this.handleResponse<T, R, true>(path, 'POST', options, true);
  }

  static async put<T, R>(path: string, options: T = {} as T): Promise<IResponse<R>> {
    return await this.handleResponse<T, R, false>(path, 'PUT', options);
  }

  static async putSilent<T, R>(path: string, options: T = {} as T): Promise<IResponseSilent<R>> {
    return await this.handleResponse<T, R, true>(path, 'PUT', options, true);
  }

  static async delete<T, R>(path: string, options: T = {} as T): Promise<IResponse<R>> {
    return await this.handleResponse<T, R, false>(path, 'DELETE', options);
  }

  static async deleteSilent<T, R>(path: string, options: T = {} as T): Promise<IResponseSilent<R>> {
    return await this.handleResponse<T, R, true>(path, 'DELETE', options, true);
  }

  static createEvent(path: string) {
    return new EventSource(API_PATH + path);
  }
}

export default Api;
