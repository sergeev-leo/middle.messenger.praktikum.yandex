import { ChatPage } from './pages/chat';
import { LoginForm } from './pages/login';
import { RegisterForm } from './pages/register';
import { ProfilePage } from './pages/profile';
import { ProfileEditPage } from './pages/profile-edit';
import { ClientError } from './pages/client-error';
import { ServerError } from './pages/server-error';
import { ROUTES } from './modules/Router/constants';
import { Router } from './modules/Router/Router';


Router
  .use(ROUTES.CHAT_WITH_USER, ChatPage)
  .use(ROUTES.CHAT, ChatPage)
  .use(ROUTES.LOGIN, LoginForm)
  .use(ROUTES.REGISTER, RegisterForm)
  .use(ROUTES.PROFILE, ProfilePage)
  .use(ROUTES.PROFILE_EDIT, ProfileEditPage)
  .use(ROUTES.PASSWORD_EDIT, ProfileEditPage)
  .use(ROUTES.CLIENT_ERROR, ClientError)
  .use(ROUTES.SERVER_ERROR, ServerError)
  .start();
