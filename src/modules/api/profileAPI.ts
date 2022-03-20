import { HTTPTransport } from './fetch';
import { USER_API_ENDPOINTS, DEFAULT_POST_REQUEST_HEADERS, YANDEX_API_HOST } from './constants';



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


export type TUserModelResponse = {
  'id': number,
  'first_name': string,
  'second_name': string,
  'display_name': string,
  'login': string,
  'email': string,
  'phone': string,
  'avatar': string,
}

class ProfileAPIClass {
  userHTTPTransportInstance: HTTPTransport;

  constructor() {
    this.userHTTPTransportInstance = new HTTPTransport(YANDEX_API_HOST, { withCredentials: true });
  }

  async changeProfile(data: TChangeProfileData): Promise<TUserModelResponse> {
    const xhr = await this.userHTTPTransportInstance.put(
      USER_API_ENDPOINTS.CHANGE_PROFILE,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
      },
    );
    return xhr.response;
  }

  async changePassword(data: TChangePasswordData) {
    const xhr = await this.userHTTPTransportInstance.put(
      USER_API_ENDPOINTS.CHANGE_PASSWORD,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
      },
    );

    return xhr.response;
  }

  async changeAvatar(data: FormData): Promise<TUserModelResponse> {
    const xhr = await this.userHTTPTransportInstance.put(
      USER_API_ENDPOINTS.CHANGE_AVATAR,
      {
        data,
        isFile: true,
      },
    );

    return xhr.response;
  }

  async getUsersByLogin(login: string): Promise<TUserModelResponse[]> {
    const xhr = await this.userHTTPTransportInstance.post(
      USER_API_ENDPOINTS.SEARCH_USER,
      {
        data: { login },
        headers: DEFAULT_POST_REQUEST_HEADERS,
      },
    );

    return xhr.response;
  }

  async getUserById(userId: number): Promise<TUserModelResponse> {
    const xhr = await this.userHTTPTransportInstance.get(
      [USER_API_ENDPOINTS.GET_USER_BY_ID, userId].join('/'),
    );

    return xhr.response;
  }
}

export const ProfileAPI = new ProfileAPIClass();
