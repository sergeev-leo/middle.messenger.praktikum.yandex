import { store } from '../modules/store/store';
import { ChatAPI, TCreateChatData, TGetChatsData } from '../modules/api/chatAPI';


export class ChatControllerClass {
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
      ChatControllerClass.setError(null);
    } catch (error) {
      ChatControllerClass.setError(error);
      return Promise.reject();
    }
  }

  public async createChat(data: TCreateChatData) {
    try {
      await ChatAPI.createChat(data);
      await this.getChats();
      ChatControllerClass.setError(null);
    } catch (error) {
      ChatControllerClass.setError(error);
      return Promise.reject();
    }
  }

  public async addUserToChat(chatId: number, login: string) {
    try {
      const currentChatUsers = await this.getChatUsers(chatId);

      const {
        id,
      } = currentChatUsers.find(user => user.login === login);

      await ChatAPI.addUsersToChat({
        chatId,
        users: [id],
      });

      ChatControllerClass.setError(null);
    } catch (error) {
      ChatControllerClass.setError(error);
      return Promise.reject();
    }
  }

  public async deleteUserFromChat(chatId: number, login: string) {
    try {
      const currentChatUsers = await this.getChatUsers(chatId);

      const {
        id,
      } = currentChatUsers.find(user => user.login === login);

      await ChatAPI.deleteUsersFromChat({
        chatId,
        users: [id],
      });

      ChatControllerClass.setError(null);
    } catch (error) {
      ChatControllerClass.setError(error);
      return Promise.reject();
    }
  }

  public async getChatUsers(chatId: number) {
    try {
      const users = await ChatAPI.getChatUsers(chatId);
      store.set('chat.current.users', null);
      store.set('chat.current.users', users);
      return users;
    } catch (error) {
      ChatControllerClass.setError(error);
      return Promise.reject();
    }
  }
}


export const ChatController = new ChatControllerClass();
