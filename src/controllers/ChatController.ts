import { store } from '../modules/store/store';
import { ChatAPI, TCreateChatData, TGetChatsData } from '../modules/api/chatAPI';
import { SOCKET_API_MESSAGES_TYPES, SocketAPI } from '../modules/api/socketAPI';
import { ProfileAPI } from '../modules/api/profileAPI';


export class ChatControllerClass {
  connections: Record<string, SocketAPI> = {};

  public closeConnections() {
    Object
      .values(this.connections)
      .forEach((connection: SocketAPI) => connection.close());
  }

  public static setError(error: { reason: string } | null) {
    if(error === null) {
      return store.set('chat.error', null);
    }

    store.set('chat.error', error.reason);
  }


  public async getChats(data?: TGetChatsData) {
    try {
      const dialogsData = await ChatAPI.getChats(data);

      store.set('chat.dialogs', dialogsData);
      return dialogsData || [];
    } catch (error) {
      ChatControllerClass.setError(error);
      return Promise.resolve([]);
    }
  }

  public async createChat(data: TCreateChatData) {
    try {
      await ChatAPI.createChat(data);
      await this.getChats();
      ChatControllerClass.setError(null);
    } catch (error) {
      ChatControllerClass.setError(error);
      return Promise.resolve();
    }
  }

  public async addUserToChat(chatId: number, login: string) {
    try {
      const usersData = await ProfileAPI.getUsersByLogin(login);

      const user = usersData.find(user => user.login === login);
      if(!user) {
        return;
      }

      await ChatAPI.addUsersToChat({
        chatId,
        users: [user.id],
      });

      ChatControllerClass.setError(null);
    } catch (error) {
      ChatControllerClass.setError(error);
      return Promise.resolve();
    }
  }

  public async deleteUserFromChat(chatId: number, login: string) {
    try {
      const usersData = await ProfileAPI.getUsersByLogin(login);

      const user = usersData.find(user => user.login === login);
      if(!user) {
        return;
      }

      await ChatAPI.deleteUsersFromChat({
        chatId,
        users: [user.id],
      });

      ChatControllerClass.setError(null);
    } catch (error) {
      ChatControllerClass.setError(error);
      return Promise.resolve();
    }
  }

  public async deleteChat(chatId: number) {
    try {
      await ChatAPI.deleteChat({ chatId });
      await this.getChats();
      ChatControllerClass.setError(null);
    } catch (error) {
      ChatControllerClass.setError(error);
      return Promise.resolve();
    }
  }

  public async getChatUsers(chatId: number) {
    try {
      const users = await ChatAPI.getChatUsers(chatId);
      store.set(`chat.users.${chatId}`, users);
      return users;
    } catch (error) {
      ChatControllerClass.setError(error);
      return Promise.resolve();
    }
  }

  public selectChat(chatId: number) {
    store.set('chat.selectedChatId', chatId);
  }

  public async connectToChat(chatId: number, userId: number) {
    try {
      const { token } = await ChatAPI.getToken(chatId);

      const socketAPI = new SocketAPI();
      this.connections[chatId] = socketAPI;

      await socketAPI.connect({
        userId,
        chatId,
        token,
      });

      const setNewMessagesCb = data => {
        if(Array.isArray(data)) {

          if(data[0] && data[0].type === SOCKET_API_MESSAGES_TYPES.MESSAGE) {
            const state = store.getState();
            const messagesFromState = state.chat.messages[chatId] || [];

            const update = [...messagesFromState, ...data];

            store.set(`chat.messages.${chatId}`, update);
          }
        }

        if(data.type !== SOCKET_API_MESSAGES_TYPES.MESSAGE) {
          return;
        }

        const state = store.getState();
        const messagesFromState = state.chat.messages[chatId] || [];

        const update = [...messagesFromState, data];

        store.set(`chat.messages.${chatId}`, update);
      };

      socketAPI.ping();
      socketAPI.addMessageListener(setNewMessagesCb);
      socketAPI.getOldMessages();
    } catch (error) {
      ChatControllerClass.setError(error);
      return Promise.resolve();
    }
  }
}


export const ChatController = new ChatControllerClass();
