import { ChatPage } from './pages/chat';
import { LoginForm } from './pages/login';
import { RegisterForm } from './pages/register';
import { ProfilePage } from './pages/profile';
import { ProfileEditPage } from './pages/profile-edit';
import { ClientError } from './pages/client-error';
import { ServerError } from './pages/server-error';
import { ROUTES } from './modules/Router/constants';
import { Router } from './modules/Router/Router';
import { PasswordEditPage } from './pages/password-edit';
import { UserController } from './controllers/UserController';

document.addEventListener('DOMContentLoaded', async() => {
  await UserController.fetchAndSetSignedUserData()
    .catch(error => console.log('no logged in user', error));

  Router
    .use(ROUTES.LOGIN, LoginForm)
    .use(ROUTES.CHAT_WITH_USER, ChatPage)
    .use(ROUTES.CHAT, ChatPage)
    .use(ROUTES.REGISTER, RegisterForm)
    .use(ROUTES.PROFILE, ProfilePage)
    .use(ROUTES.PROFILE_EDIT, ProfileEditPage)
    .use(ROUTES.PASSWORD_EDIT, PasswordEditPage)
    .use(ROUTES.CLIENT_ERROR, ClientError)
    .use(ROUTES.SERVER_ERROR, ServerError)
    .start();
});

