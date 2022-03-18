import { AuthAPI, TSignInData, TSignUpData } from '../modules/api/authAPI';
import { store } from '../modules/store/store';
import { Router } from '../modules/Router/Router';
import { ROUTES } from '../modules/Router/constants';

export class UserControllerClass {
  public static setError(error: { reason: string } | null) {
    if(error === null) {
      return store.set('user.error', null);
    }

    store.set('user.error', error.reason);
  }

  public async getUserData() {
    try {
      const userData = await AuthAPI.getUserData();

      store.set('user.data', userData);
      UserControllerClass.setError(null);
    } catch (error) {
      UserControllerClass.setError(error);
      return Promise.reject();
    }
  }

  public async logOut() {
    try {
      await AuthAPI.logOut();

      store.set( 'user.data', null);
      UserControllerClass.setError(null);

      Router.go(ROUTES.LOGIN);
    } catch (error) {
      UserControllerClass.setError(error);
      return Promise.reject();
    }
  }

  public async signUp(formData: TSignUpData) {
    try {
      const response = await AuthAPI.signUp(formData);
      const {
        id,
      } = response;

      store.set('user.data', { ...formData, id });
      UserControllerClass.setError(null);
    } catch (error) {
      UserControllerClass.setError(error);
      return Promise.reject();
    }
  }

  public async signIn(formData: TSignInData) {
    try {
      await AuthAPI.signIn(formData);

      await this.fetchAndSetSignedUserData();
    } catch(error) {
      if(error.reason === 'User already in system') {
        await this.fetchAndSetSignedUserData();
        return Promise.resolve();
      }

      UserControllerClass.setError(error);
      return Promise.reject();
    }
  }

  public async fetchAndSetSignedUserData() {
    try {
      const signedUserResponse = await AuthAPI.getUserData();

      const {
        id,
        first_name,
        second_name,
        display_name,
        login,
        email,
        phone,
        avatar,
      } = signedUserResponse;

      store.set(
        'user.data',
        {
          id,
          firstName: first_name,
          secondName: second_name,
          displayName: display_name,
          login,
          email,
          phone,
          avatar,
        },
      );
      localStorage.setItem('isUserLoggedIn', 'true');
      UserControllerClass.setError(null);

    } catch (error) {
      UserControllerClass.setError(error);
      return Promise.reject();
    }
  }
}


export const UserController = new UserControllerClass();
