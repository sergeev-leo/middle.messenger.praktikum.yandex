import { ROUTES } from '../../modules/Router/constants';

export const getProfileData = ({
  login,
  email,
  phone,
  firstName,
  secondName,
  displayName,
  avatar,
}) => ({
  avatar: {
    src: avatar,
  },
  userName: login,

  links: [
    {
      title: 'Выйти',
      style: 'error',
      href: ROUTES.LOGIN,
    },
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
