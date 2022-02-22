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
};

type THttpRequestOptionsWithoutMethod = Omit<THttpRequestOptions, 'method'>;

class HTTPTransport {
  get(url: string, options: THttpRequestOptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.makeHTTPRequest(url, { ...options, method: HTTP_METHOD.GET }, options.timeout);
  }

  post(url: string, options: THttpRequestOptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.makeHTTPRequest(url, { ...options, method: HTTP_METHOD.POST }, options.timeout);
  }

  put(url: string, options: THttpRequestOptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.makeHTTPRequest(url, { ...options, method: HTTP_METHOD.PUT }, options.timeout);
  }

  delete(url: string, options: THttpRequestOptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.makeHTTPRequest(url, { ...options, method: HTTP_METHOD.DELETE }, options.timeout);
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
    } = options;

    return new Promise((resolve, reject) => {
      const urlToRequest = [url, this.queryStringify(data)].join('');

      const xhr = new XMLHttpRequest();

      // задаем указанные заголовки
      for(const header in headers) {
        xhr.setRequestHeader(header, headers[header]);
      }

      // инициализируем таймаут
      xhr.timeout = timeout;

      xhr.open(method, urlToRequest);

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
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
    // Можно делать трансформацию GET-параметров в отдельной функции
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
}
