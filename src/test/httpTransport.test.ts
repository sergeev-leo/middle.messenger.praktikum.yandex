import { HTTPTransport } from '../modules/api/fetch';
import { newServer } from 'mock-xmlhttprequest';

const fetch = new HTTPTransport('http://test.ru');

describe('модуль httpTransport', () => {

  it('корректно выполняет преобразование параметров к строке', () => {
    const data = fetch.queryStringify({ name: 'Ivan', age: 20 });

    const expectedResult = '?name=Ivan&age=20';

    expect(data).toEqual(expectedResult);
  });

  it('возвращает пустую строку, если не задан входной объект', () => {
    const data = fetch.queryStringify();

    const expectedResult = '';

    expect(data).toEqual(expectedResult);
  });

  it('корректно выполняет get запрос', async() => {
    const server = newServer({
      get: [
        'http://test.ru/test',
        {
          headers: { 'Content-Type': 'application/json' },
          body: '{ "message": "get" }',
        },
      ],
    }).install();

    const xhr: Record<string, any> = await fetch.get('test');

    const expectedResult = '{ "message": "get" }';
    expect(xhr._response.body).toEqual(expectedResult);

    server.remove();
  });

  it('корректно выполняет get запрос с query-параметрами', async() => {
    const server = newServer({
      get: [
        'http://test.ru/test?name=Ivan&age=30',
        {
          headers: { 'Content-Type': 'application/json' },
          body: '{ "message": "get_with_param" }',
        },
      ],
    }).install();

    const xhr: Record<string, any> = await fetch.get(
      'test',
      {
        data: { name: 'Ivan', age: 30 },
      },
    );

    const expectedResult = '{ "message": "get_with_param" }';
    expect(xhr._response.body).toEqual(expectedResult);

    server.remove();
  });

  it('корректно выполняет post запрос', async() => {
    const server = newServer({
      post: [
        'http://test.ru/test',
        {
          headers: { 'Content-Type': 'application/json' },
          body: '{ "message": "post" }',
        },
      ],
    }).install();

    const xhr: Record<string, any> = await fetch.post(
      'test',
      {
        data: { name: 'test' },
      },
    );

    const expectedResult = '{ "message": "post" }';
    expect(xhr._response.body).toEqual(expectedResult);

    server.remove();
  });

  it('корректно выполняет put запрос', async() => {
    const server = newServer({
      put: [
        'http://test.ru/test',
        {
          headers: { 'Content-Type': 'application/json' },
          body: '{ "message": "put" }',
        },
      ],
    }).install();

    const xhr: Record<string, any> = await fetch.put('test');

    const expectedResult = '{ "message": "put" }';
    expect(xhr._response.body).toEqual(expectedResult);

    server.remove();
  });

  it('корректно выполняет delete запрос', async() => {
    const server = newServer({
      delete: [
        'http://test.ru/test',
        {
          headers: { 'Content-Type': 'application/json' },
          body: '{ "message": "delete" }',
        },
      ],
    }).install();

    const xhr: Record<string, any> = await fetch.delete('test');

    const expectedResult = '{ "message": "delete" }';
    expect(xhr._response.body).toEqual(expectedResult);

    server.remove();
  });
});
