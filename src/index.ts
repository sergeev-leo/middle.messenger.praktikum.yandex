import { ChatPage } from './pages/chat';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { ProfilePage } from './pages/profile';
import { ProfileEditPage } from './pages/profile-edit';
import { ClientError } from './pages/client-error';
import { ServerError } from './pages/server-error';
import { Routes } from './modules/Router/constants';
import { Router } from './modules/Router/Router';
import { PasswordEditPage } from './pages/password-edit';
import { UserController } from './controllers/UserController';
import './style.scss';

document.addEventListener('DOMContentLoaded', async() => {
  await UserController.fetchAndSetSignedUserData()
    // eslint-disable-next-line no-console
    .catch(error => console.log('Пользователь не авторизован в системе', error));

  Router
    .use(Routes.LOGIN, LoginPage)
    .use(Routes.CHAT, ChatPage)
    .use(Routes.REGISTER, RegisterPage)
    .use(Routes.PROFILE, ProfilePage)
    .use(Routes.PROFILE_EDIT, ProfileEditPage)
    .use(Routes.PASSWORD_EDIT, PasswordEditPage)
    .use(Routes.CLIENT_ERROR, ClientError)
    .use(Routes.SERVER_ERROR, ServerError)
    .start();
});

