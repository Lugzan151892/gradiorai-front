import SystemError from '@/core/utils/error/SystemError';
import UserError from '@/core/utils/error/UserError';
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

  static requestFormData<T extends Record<string, any> | undefined>(
    path: string,
    method: 'POST',
    options: T = {} as T
  ): Promise<Response> {
    const authToken = localStorage.getItem('token');
    const formData = new FormData();

    if (options) {
      Object.keys(options).forEach((key) => {
        const value = options[key];

        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item instanceof File) {
              formData.append(key, item);
            } else if (typeof item === 'object') {
              formData.append(key, JSON.stringify(item));
            } else {
              formData.append(key, String(item));
            }
          });
        } else if (value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      });
    }

    return fetch(API_PATH + path, {
      method,
      headers: {
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
      credentials: 'include',
      body: formData,
    });
  }

  static async handleResponse<T extends object | undefined, R, S extends boolean>(
    path: string,
    method: TApiMethod,
    options: T = {} as T,
    silent?: S,
    isFormData?: boolean
  ): Promise<ResponseType<R, S>> {
    const response =
      isFormData && method === 'POST'
        ? await this.requestFormData<T>(path, method, options)
        : await this.request<T>(path, method, options);

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

  static async get<T extends object | undefined, R>(path: string, options: T = {} as T): Promise<IResponse<R>> {
    return await this.handleResponse<T, R, false>(path, 'GET', options);
  }

  static async getSilent<T extends object | undefined, R>(
    path: string,
    options: T = {} as T
  ): Promise<IResponseSilent<R>> {
    return await this.handleResponse<T, R, true>(path, 'GET', options, true);
  }

  static async post<T extends object | undefined, R>(path: string, options: T = {} as T): Promise<IResponse<R>> {
    return await this.handleResponse<T, R, false>(path, 'POST', options);
  }

  static async postSilent<T extends object | undefined, R>(
    path: string,
    options: T = {} as T
  ): Promise<IResponseSilent<R>> {
    return await this.handleResponse<T, R, true>(path, 'POST', options, true);
  }

  static async put<T extends object | undefined, R>(path: string, options: T = {} as T): Promise<IResponse<R>> {
    return await this.handleResponse<T, R, false>(path, 'PUT', options);
  }

  static async putSilent<T extends object | undefined, R>(
    path: string,
    options: T = {} as T
  ): Promise<IResponseSilent<R>> {
    return await this.handleResponse<T, R, true>(path, 'PUT', options, true);
  }

  static async delete<T extends object | undefined, R>(path: string, options: T = {} as T): Promise<IResponse<R>> {
    return await this.handleResponse<T, R, false>(path, 'DELETE', options);
  }

  static async deleteSilent<T extends object | undefined, R>(
    path: string,
    options: T = {} as T
  ): Promise<IResponseSilent<R>> {
    return await this.handleResponse<T, R, true>(path, 'DELETE', options, true);
  }

  static async postFormData<T extends object | undefined, R>(
    path: string,
    options: T = {} as T
  ): Promise<IResponse<R>> {
    return await this.handleResponse<T, R, false>(path, 'POST', options, false, true);
  }

  static createEvent(path: string) {
    return new EventSource(API_PATH + path);
  }
}

export default Api;
