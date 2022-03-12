import { Router } from '../Router/Router';
import { ROUTES } from '../Router/constants';

enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type THttpRequestOptions = {
  method: HTTP_METHOD,
  data?: Record<string, unknown>,
  headers?: Record<string, string>,
  timeout?: number,
  withCredentials?: boolean,
  mode?: string,
};

type THttpRequestOptionsWithoutMethod = Omit<THttpRequestOptions, 'method'>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class HTTPTransport {
  host: string;

  constructor(host: string) {
    this.host = host;
  }

  public get(url: string, options: THttpRequestOptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.makeHTTPRequest(url, { ...options, method: HTTP_METHOD.GET }, options.timeout)
      .catch(xhr => HTTPTransport.handleCommonErrors(xhr));
  }

  public post(url: string, options: THttpRequestOptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.makeHTTPRequest(url, { ...options, method: HTTP_METHOD.POST }, options.timeout)
      .catch(xhr => HTTPTransport.handleCommonErrors(xhr));
  }

  public put(url: string, options: THttpRequestOptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.makeHTTPRequest(url, { ...options, method: HTTP_METHOD.PUT }, options.timeout)
      .catch(xhr => HTTPTransport.handleCommonErrors(xhr));
  }

  public delete(url: string, options: THttpRequestOptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.makeHTTPRequest(url, { ...options, method: HTTP_METHOD.DELETE }, options.timeout)
      .catch(xhr => HTTPTransport.handleCommonErrors(xhr));
  }

  private makeHTTPRequest(
    url: string,
    options: THttpRequestOptions = { method: HTTP_METHOD.GET },
    timeout = 60000,
  ): Promise<XMLHttpRequest> {
    const {
      method,
      data,
      headers,
      withCredentials = true,
    } = options;

    return new Promise((resolve, reject) => {
      const urlWithHost = [this.host, url].join('/');
      const urlToRequest = method === HTTP_METHOD.GET ?
        [urlWithHost, this.queryStringify(data)].join('') :
        urlWithHost;

      const xhr = new XMLHttpRequest();
      xhr.open(method, urlToRequest);

      xhr.responseType = 'json';

      // задаем указанные заголовки
      for(const header in headers) {
        xhr.setRequestHeader(header, headers[header]);
      }

      // инициализируем таймаут
      xhr.timeout = timeout;

      if(withCredentials) {
        xhr.withCredentials = true;
      }

      xhr.onload = function() {
        xhr.status >= 200 && xhr.status < 300 ?
          resolve(xhr) :
          reject(xhr);
      };

      xhr.onabort = function() {
        reject(xhr);
      };
      xhr.onerror = function() {
        reject(xhr);
      };
      xhr.ontimeout = () => {
        throw new Error('request timeout error');
      };

      if (method === HTTP_METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }

  private queryStringify(data?: Record<string, unknown>): string {
    if(!data || Object.keys(data).length === 0) {
      return '';
    }

    return Object
      .keys(data)
      .reduce(
        (acc, param, index) => {
          const value = data[param];
          const paramBlock = [param, value].join('=');

          acc = index === Object.keys(data).length -1 ?
            acc + paramBlock :
            acc + paramBlock + '&';
          return acc;
        },
        '?',
      );
  }

  private static handleCommonErrors(xhr: XMLHttpRequest) {
    switch(xhr.status) {
    case 400: {
      console.log(xhr.response.reason);
      return Promise.resolve(xhr);
    }
    case 401: {
      console.log('Неизвестный пользователь');
      Router.go(ROUTES.LOGIN);
      return Promise.resolve(xhr);
    }
    case 403: {
      console.log('Недостаточно прав для выполнения действия');
      return Promise.resolve(xhr);
    }
    case 404: {
      Router.go(ROUTES.CLIENT_ERROR);
      return Promise.reject(xhr);
    }
    case 500: {
      Router.go(ROUTES.SERVER_ERROR);
      return Promise.reject(xhr);
    }
    default: {
      console.log('При выполнении запроса возникла неизвестная ошибка');
      return Promise.reject(xhr);
    }
    }
  }
}
