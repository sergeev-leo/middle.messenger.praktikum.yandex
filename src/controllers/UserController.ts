import { AuthAPI, TSignInData, TSignUpData } from '../modules/api/authAPI';
import { store } from '../modules/store/store';
import { Router } from '../modules/Router/Router';
import { ROUTES } from '../modules/Router/constants';

class UserControllerClass {
  public async getUserData() {
    try {
      const userData = await AuthAPI.user();

      store.set('user', userData);
    } catch (error) {
      console.log(error);
    }
  }

  public async logOut() {
    try {
      await AuthAPI.logOut();

      store.set('user', null);
      Router.go(ROUTES.LOGIN);
    } catch (error) {
      console.log(error);
    }
  }

  public async signUp(formData: TSignUpData) {
    try {
      const response = await AuthAPI.signUp(formData);
      const {
        id,
      } = response;

      store.set('user', { ...formData, id });
    } catch (error) {
      console.log(error);
    }
  }

  public async signIn(formData: TSignInData) {
    try {
      await AuthAPI.signIn(formData);

      const signedUserResponse = await AuthAPI.user();

      const {
        id,
        first_name,
        second_name,
        login,
        email,
        phone,
      } = signedUserResponse;

      store.set(
        'user',
        {
          id,
          firstName: first_name,
          secondName: second_name,
          login,
          email,
          phone,
        },
      );
    } catch(error) {
      console.log(error);
    }
  }
}


export const UserController = new UserControllerClass();
