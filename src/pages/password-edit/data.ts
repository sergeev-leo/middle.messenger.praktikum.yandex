import { VALIDATION_PATTERNS } from '../../modules/formValidation';


export const passwordEditData = {
  avatar: {
    src:'/user.png',
    title: 'Поменять аватар',
  },
  inputs: [
    {
      id: 'oldPassword',
      label: 'Старый пароль',
      pattern: VALIDATION_PATTERNS.PASSWORD,
    },
    {
      id: 'newPassword',
      label: 'Новый пароль',
      pattern: VALIDATION_PATTERNS.PASSWORD,
    },
    {
      id: 'repeatNewPassword',
      label: 'Повторите пароль',
      pattern: VALIDATION_PATTERNS.PASSWORD,
    },
  ],
  button: {
    title: 'Сохранить',
    style: 'primary',
    type: 'submit',
  },
};
