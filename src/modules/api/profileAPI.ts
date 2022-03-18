import { BaseApi } from './baseApi';
import { HTTPTransport } from './fetch';
import { USER_API_ENDPOINTS, DEFAULT_POST_REQUEST_HEADERS, YANDEX_API_HOST } from './constants';


const userHTTPTransportInstance = new HTTPTransport(YANDEX_API_HOST);

export type TChangeProfileData = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
};

export type TChangePasswordData = {
  oldPassword: string,
  newPassword: string,
};

class ProfileAPIClass extends BaseApi {

  changeProfile(data: TChangeProfileData) {
    return userHTTPTransportInstance.put(
      USER_API_ENDPOINTS.CHANGE_PROFILE,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
        withCredentials: true,
      },
    )
      .then(xhr => xhr.response);
  }

  changePassword(data: TChangePasswordData) {
    return userHTTPTransportInstance.put(
      USER_API_ENDPOINTS.CHANGE_PASSWORD,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
        withCredentials: true,
      },
    )
      .then(xhr => xhr.response);
  }

  changeAvatar(data: FormData) {
    return userHTTPTransportInstance.put(
      USER_API_ENDPOINTS.CHANGE_AVATAR,
      {
        data,
        isFile: true,
        withCredentials: true,
      },
    )
      .then(xhr => xhr.response);
  }

  getUsersByLogin(login: string) {
    return userHTTPTransportInstance.post(
      USER_API_ENDPOINTS.SEARCH_USER,
      {
        data: { login },
        headers: DEFAULT_POST_REQUEST_HEADERS,
        withCredentials: true,
      },
    )
      .then(xhr => xhr.response);
  }

  getUserById(userId: number) {
    return userHTTPTransportInstance.get(
      [USER_API_ENDPOINTS.GET_USER_BY_ID, userId].join('/'),
      {
        withCredentials: true,
      },
    )
      .then(xhr => xhr.response);
  }
}

export const ProfileAPI = new ProfileAPIClass();
