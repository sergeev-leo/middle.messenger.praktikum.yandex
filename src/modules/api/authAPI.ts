import { HTTPTransport } from './fetch';
import { AUTH_API_ENDPOINTS, DEFAULT_POST_REQUEST_HEADERS, YANDEX_API_HOST } from './constants';


const authHTTPTransportInstance = new HTTPTransport(YANDEX_API_HOST);

export type TSignUpData = {
  first_name: 'string',
  second_name: 'string',
  login: 'string',
  email: 'string',
  password: 'string',
  phone: 'string'
};

export type TSignInData = {
  login: 'string',
  password: 'string',
}



class AuthAPIClass {

  async signUp(data: TSignUpData) {
    const xhr = await authHTTPTransportInstance.post(
      AUTH_API_ENDPOINTS.SIGN_UP,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
        withCredentials: true,
      },
    );

    return xhr.response;
  }

  async signIn(data: TSignInData) {
    const xhr = await authHTTPTransportInstance.post(
      AUTH_API_ENDPOINTS.SIGN_IN,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
        withCredentials: true,
      },
    );

    return xhr.response;
  }

  async logOut() {
    const xhr = await authHTTPTransportInstance.post(
      AUTH_API_ENDPOINTS.LOG_OUT,
      {
        withCredentials: true,
      },
    );

    return xhr.response;
  }

  async getUserData() {
    const xhr = await authHTTPTransportInstance.get(
      AUTH_API_ENDPOINTS.USER_DATA,
      {
        withCredentials: true,
      },
    );

    return xhr.response;
  }
}

export const AuthAPI = new AuthAPIClass();
