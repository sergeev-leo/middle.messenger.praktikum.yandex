import { createSubmitFn, VALIDATION_PATTERNS } from '../../modules/formValidation';


export const profileEditData = {
  avatar: {
    src:'/user.png',
    title: 'Поменять аватар',
  },
  inputs: [
    {
      id: 'email',
      label: 'Почта',
      pattern: VALIDATION_PATTERNS.EMAIL,
    },
    {
      id: 'login',
      label: 'Логин',
      pattern: VALIDATION_PATTERNS.LOGIN,
    },
    {
      id: 'first_name',
      label: 'Имя',
      pattern: VALIDATION_PATTERNS.FIRST_NAME,
    },
    {
      id: 'second_name',
      label: 'Фамилия',
      pattern: VALIDATION_PATTERNS.SECOND_NAME,
    },
    {
      id: 'display_name',
      label: 'Имя в чате',
    },
    {
      id: 'phone',
      label: 'Телефон',
      pattern: VALIDATION_PATTERNS.PHONE,
    },
  ],
  button: {
    title: 'Сохранить',
    style: 'primary',
    type: 'submit',
  },
  events: {
    submit: createSubmitFn('.profile-edit'),
  },
};
