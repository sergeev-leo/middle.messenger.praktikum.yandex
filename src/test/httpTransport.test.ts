import { HTTPTransport } from '../modules/api/fetch';

const fetch = new HTTPTransport('');

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
});
