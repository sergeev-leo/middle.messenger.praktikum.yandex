import { HTTPTransport } from './fetch';
import { DEFAULT_POST_REQUEST_HEADERS, YANDEX_API_HOST, CHAT_API_ENDPOINTS } from './constants';


const chatHTTPTransportInstance = new HTTPTransport(YANDEX_API_HOST);



export type TGetChatsData = {
  offset?: number,
  limit?: number,
  title?: string,
};

export type TChatDialog = {
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
  },
};

export type TCreateChatData = {
  title: string,
};

export type TDeleteChatData = {
  chatId: number,
};

export type TAddOrDeleteUsersToChatData = {
  users: number[],
  chatId: number,
};

class ChatAPIClass {

  async getChats(data: TGetChatsData = {}): Promise<TChatDialog[]> {
    const xhr = await chatHTTPTransportInstance.get(
      CHAT_API_ENDPOINTS.CHATS,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
        withCredentials: true,
      },
    );

    return xhr.response;
  }

  async createChat(data: TCreateChatData) {
    const xhr = await chatHTTPTransportInstance.post(
      CHAT_API_ENDPOINTS.CHATS,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
        withCredentials: true,
      },
    );

    return xhr.response;
  }

  async deleteChat(data: TDeleteChatData) {
    const xhr = await chatHTTPTransportInstance.delete(
      CHAT_API_ENDPOINTS.CHATS,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
        withCredentials: true,
      },
    );

    return xhr.response;
  }

  async addUsersToChat(data: TAddOrDeleteUsersToChatData) {
    const xhr = await chatHTTPTransportInstance.put(
      CHAT_API_ENDPOINTS.CHATS_USERS,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
        withCredentials: true,
      },
    );

    return xhr.response;
  }

  async deleteUsersFromChat(data: TAddOrDeleteUsersToChatData) {
    const xhr = await chatHTTPTransportInstance.delete(
      CHAT_API_ENDPOINTS.CHATS_USERS,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
        withCredentials: true,
      },
    );

    return xhr.response;
  }

  async getChatUsers(chatId: number) {
    const xhr = await chatHTTPTransportInstance.get(
      [CHAT_API_ENDPOINTS.CHATS, chatId, 'users'].join('/'),
      {
        withCredentials: true,
      },
    );

    return xhr.response;
  }

  async getToken(chatId: number) {
    const xhr = await chatHTTPTransportInstance.post(
      [CHAT_API_ENDPOINTS.REQUEST_TOKEN, chatId].join('/'),
      {
        headers: DEFAULT_POST_REQUEST_HEADERS,
        withCredentials: true,
      },
    );

    return xhr.response;
  }

  async changeAvatar(data: FormData) {
    const xhr = await chatHTTPTransportInstance.put(
      [CHAT_API_ENDPOINTS.CHATS, 'avatar'].join('/'),
      {
        withCredentials: true,
        isFile: true,
        data,
      },
    );

    return xhr.response;
  }
}

export const ChatAPI = new ChatAPIClass();
