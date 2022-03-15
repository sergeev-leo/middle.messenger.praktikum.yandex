import { BaseApi } from './baseApi';
import { HTTPTransport } from './fetch';
import { DEFAULT_POST_REQUEST_HEADERS, YANDEX_API_HOST, CHAT_API_ENDPOINTS } from './constants';


const chatHTTPTransportInstance = new HTTPTransport(YANDEX_API_HOST);



export type TGetChatsData = {
  offset?: number,
  limit?: number,
  title?: string,
};

export type TChatResponseData = {
  id: number,
  title: string,
  avatar: string | null,
  unread_count: number,
  last_message: {
    user: {
      first_name: string,
      second_name: string,
      avatar: string | null,
      email: string,
      login: string,
      phone: string,
    },
    time: string,
    content: string
  } | null,
};

export type TCreateChatData = {
  title: string,
};

export type TDeleteChatData = {
  id: number,
};

export type TAddOrDeleteUsersToChatData = {
  users: number[],
  chatId: number,
};

class ChatAPIClass extends BaseApi {

  getChats(data: TGetChatsData = {}): Promise<TChatResponseData[] | []> {
    return chatHTTPTransportInstance.get(
      CHAT_API_ENDPOINTS.CHATS,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
        withCredentials: true,
      },
    )
      .then(xhr => xhr.response);
  }

  createChat(data: TCreateChatData) {
    return chatHTTPTransportInstance.post(
      CHAT_API_ENDPOINTS.CHATS,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
        withCredentials: true,
      },
    )
      .then(xhr => xhr.response);
  }

  deleteChat(data: TDeleteChatData) {
    return chatHTTPTransportInstance.delete(
      CHAT_API_ENDPOINTS.CHATS,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
        withCredentials: true,
      },
    )
      .then(xhr => xhr.response);
  }

  addUsersToChat(data: TAddOrDeleteUsersToChatData) {
    return chatHTTPTransportInstance.put(
      CHAT_API_ENDPOINTS.CHATS_USERS,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
        withCredentials: true,
      },
    );
  }

  deleteUsersFromChat(data: TAddOrDeleteUsersToChatData) {
    return chatHTTPTransportInstance.delete(
      CHAT_API_ENDPOINTS.CHATS_USERS,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
        withCredentials: true,
      },
    )
      .then(xhr => xhr.response);
  }

  getChatUsers(chatId: number) {
    return chatHTTPTransportInstance.get(
      [CHAT_API_ENDPOINTS.CHATS, chatId, 'users'].join('/'),
      {
        withCredentials: true,
      },
    )
      .then(xhr => xhr.response);
  }

  requestTokenForChat(chatId: number) {
    return chatHTTPTransportInstance.post(
      [CHAT_API_ENDPOINTS.REQUEST_TOKEN, chatId].join('/'),
      {
        headers: DEFAULT_POST_REQUEST_HEADERS,
        withCredentials: true,
      },
    )
      .then(xhr => xhr.response);
  }
}

export const ChatAPI = new ChatAPIClass();
