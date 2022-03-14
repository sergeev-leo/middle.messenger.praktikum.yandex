import { store } from '../modules/store/store';
import { ProfileAPI, TChangePasswordData, TChangeProfileData } from '../modules/api/profileAPI';
import { UserControllerClass } from './UserController';


class ProfileControllerClass {
  public async changeProfile(data: TChangeProfileData) {
    try {
      const {
        first_name,
        second_name,
        display_name,
        login,
        email,
        phone,
      } = await ProfileAPI.changeProfile(data);

      store.set(
        'user.data',
        {
          firstName: first_name,
          secondName: second_name,
          displayName: display_name,
          login,
          email,
          phone,
        },
      );
      UserControllerClass.setError(null);

    } catch (error) {
      return UserControllerClass.setError(error);
    }
  }

  public async changePassword(data: TChangePasswordData) {
    try {
      await ProfileAPI.changePassword(data);
    } catch (error) {
      UserControllerClass.setError(error);
      return Promise.reject();
    }
  }

  public async changeAvatar(data: FormData) {
    try {
      const { avatar } = await ProfileAPI.changeAvatar(data);

      store.set('user.data.avatar', avatar);
      UserControllerClass.setError(null);
    } catch (error) {
      UserControllerClass.setError(error);
      return Promise.reject();
    }
  }

  public async getUserById(userId: number) {
    try {
      const userData = await ProfileAPI.getUserById(userId);

      store.set(
        'search.userById.data',
        userData,
      );
      store.set(
        'search.userById.error',
        null,
      );


    } catch({ reason }) {
      store.set(
        'search.userById.error',
        reason,
      );
      return Promise.reject();
    }
  }

  public async getUsersByLogin(login: string) {
    try {
      const usersData = await ProfileAPI.getUsersByLogin(login);

      store.set(
        'search.usersByLogin.data',
        usersData,
      );
      store.set(
        'search.usersByLogin.error',
        null,
      );
      return usersData;
    } catch(error) {
      store.set(
        'search.usersByLogin.error',
        error,
      );
      return Promise.reject(error);
    }
  }
}

export const ProfileController = new ProfileControllerClass();
