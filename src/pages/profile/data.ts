import { ROUTES } from '../../modules/Router/constants';
import { TAvatarProps } from '../../components/avatar/avatar';
import { TLinkProps } from '../../components/link/link';
import { UserController } from '../../controllers/UserController';
import { TButtonProps } from '../../components/button/button';


type TUserDataRow = {
  id: string,
  label: string,
  value: string,
};

export type TProfilePageProps = {
  avatar: TAvatarProps,
  userName: string,
  button: TButtonProps,
  links: TLinkProps[],
  userData: TUserDataRow[],
}

export const getProfileData = ({
  login,
  email,
  phone,
  firstName,
  secondName,
  displayName,
  avatar,
}): TProfilePageProps => ({
  avatar: {
    src: avatar,
  },
  userName: login,
  button: {
    title: 'Выйти',
    type: 'button',
    style: 'error',
    events: {
      click: UserController.logOut,
    },
  },
  links: [
    {
      title: 'Изменить пароль',
      style: 'secondary',
      href: ROUTES.PASSWORD_EDIT,
    },
    {
      title: 'Изменить данные',
      style: 'secondary',
      href: ROUTES.PROFILE_EDIT,
    },
  ],
  userData: [
    {
      id: 'email',
      label: 'Почта',
      value: email,
    },
    {
      id: 'login',
      label: 'Логин',
      value: login,
    },
    {
      id: 'first_name',
      label: 'Имя',
      value: firstName,
    },
    {
      id: 'second_name',
      label: 'Фамилия',
      value: secondName,
    },
    {
      id: 'display_name',
      label: 'Имя в чате',
      value: displayName,
    },
    {
      id: 'phone',
      label: 'Телефон',
      value: phone,
    },
  ],
});
