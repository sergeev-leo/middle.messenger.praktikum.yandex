import { BaseApi } from './baseApi';
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



class AuthAPIClass extends BaseApi {

  signUp(data: TSignUpData) {
    return authHTTPTransportInstance.post(
      AUTH_API_ENDPOINTS.SIGN_UP,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
        withCredentials: true,
      },
    )
    .then(xhr => xhr.response);
  }

  signIn(data: TSignInData) {
    return authHTTPTransportInstance.post(
      AUTH_API_ENDPOINTS.SIGN_IN,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
        withCredentials: true,
      },
    )
      .then(xhr => xhr.response);
  }

  logOut() {
    return authHTTPTransportInstance.post(
      AUTH_API_ENDPOINTS.LOG_OUT,
      {
        withCredentials: true,
      },
    );
  }

  getUserData() {
    return authHTTPTransportInstance.get(
      AUTH_API_ENDPOINTS.USER_DATA,
      {
        withCredentials: true,
      },
    )
      .then(xhr => xhr.response);
  }
}

export const AuthAPI = new AuthAPIClass();
