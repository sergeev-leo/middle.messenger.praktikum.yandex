export const YANDEX_API_HOST = 'https://ya-praktikum.tech/api/v2';

export const AUTH_API_ENDPOINTS = {
  SIGN_UP: 'auth/signup',
  SIGN_IN: 'auth/signin',
  USER_DATA: 'auth/user',
  LOG_OUT: 'auth/logout',
};

export const USER_API_ENDPOINTS = {
  CHANGE_PROFILE: 'user/profile',
  CHANGE_AVATAR: 'user/profile/avatar',
  CHANGE_PASSWORD: 'user/password',
  SEARCH_USER: 'user/search',
  GET_USER_BY_ID: 'user',
};

export const CHAT_API_ENDPOINTS = {
  CHATS: 'chats',
  CHATS_USERS: '/hats/users',
  REQUEST_TOKEN: 'chats/token',
};

export const DEFAULT_POST_REQUEST_HEADERS = {
  'content-type': 'application/json',
};
