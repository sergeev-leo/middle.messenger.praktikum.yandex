enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type TOptions = {
  method: HTTP_METHOD,
  data?: Record<string, unknown>,
};

type TOptionsWithoutMethod = Omit<TOptions, 'method'>;

const makeHTTPRequest = (
  url: string,
  options: TOptions,
): Promise<XMLHttpRequest> => {
  const {
    method,
    data,
  } = options;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.setRequestHeader('Content-Type', 'text/plain');

    xhr.onload = () => {
      resolve(xhr);
    };

    xhr.onabort = reject;
    xhr.onerror = reject;
    xhr.ontimeout = reject;

    if (method === 'GET' || !data) {
      xhr.send();
    } else {
      xhr.send(JSON.stringify(data));
    }
  });
};

class HTTPTransport {
  get(url: string, options: TOptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.makeHTTPRequest(url, { ...options, method: HTTP_METHOD.GET });
  }

  makeHTTPRequest(
    url: string,
    options: TOptions = { method: HTTP_METHOD.GET },
  ): Promise<XMLHttpRequest> {
    const {
      method,
      data,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === HTTP_METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
