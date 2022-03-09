import { ROUTES } from '../../modules/Router/constants';

export const profileData = {
  avatar: {
    src: '/user.png',
  },
  userName: 'User',

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
      value: 'pochta@yandex.ru',
    },
    {
      id: 'login',
      label: 'Логин',
      value: 'ivanivanov',
    },
    {
      id: 'first_name',
      label: 'Имя',
      value: 'Иван',
    },
    {
      id: 'second_name',
      label: 'Фамилия',
      value: 'Иванов',
    },
    {
      id: 'display_name',
      label: 'Имя в чате',
      value: 'Иван',
    },
    {
      id: 'phone',
      label: 'Телефон',
      value: '+7(909)9673030',
    },
  ],
};
