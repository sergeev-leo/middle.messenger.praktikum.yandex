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

class ProfileAPIClass {

  async changeProfile(data: TChangeProfileData) {
    const xhr = await userHTTPTransportInstance.put(
      USER_API_ENDPOINTS.CHANGE_PROFILE,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
        withCredentials: true,
      },
    );
    return xhr.response;
  }

  async changePassword(data: TChangePasswordData) {
    const xhr = await userHTTPTransportInstance.put(
      USER_API_ENDPOINTS.CHANGE_PASSWORD,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
        withCredentials: true,
      },
    );

    return xhr.response;
  }

  async changeAvatar(data: FormData) {
    const xhr = await userHTTPTransportInstance.put(
      USER_API_ENDPOINTS.CHANGE_AVATAR,
      {
        data,
        isFile: true,
        withCredentials: true,
      },
    );

    return xhr.response;
  }

  async getUsersByLogin(login: string) {
    const xhr = await userHTTPTransportInstance.post(
      USER_API_ENDPOINTS.SEARCH_USER,
      {
        data: { login },
        headers: DEFAULT_POST_REQUEST_HEADERS,
        withCredentials: true,
      },
    );

    return xhr.response;
  }

  async getUserById(userId: number) {
    const xhr = await userHTTPTransportInstance.get(
      [USER_API_ENDPOINTS.GET_USER_BY_ID, userId].join('/'),
      {
        withCredentials: true,
      },
    );

    return xhr.response;
  }
}

export const ProfileAPI = new ProfileAPIClass();
