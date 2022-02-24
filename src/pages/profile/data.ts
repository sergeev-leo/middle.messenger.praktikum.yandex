export const profileData = {
  avatar: {
    src: '/user.png',
    title: 'Поменять аватар',
    withUpload: true,
  },
  userName: 'User',

  links: [
    {
      title: 'Выйти',
      style: 'error',
      href: '/',
    },
    {
      title: 'Изменить пароль',
      style: 'secondary',
      href: '../password-edit/index.html',
    },
    {
      title: 'Изменить данные',
      style: 'secondary',
      href: '../profile-edit/index.html',
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
