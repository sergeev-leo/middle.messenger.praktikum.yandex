import { createSubmitFn, VALIDATION_PATTERNS } from '../../modules/formValidation';


export const loginData = {
  header: 'Вход',
  inputs: [
    {
      id: 'login',
      label: 'Логин',
      type: 'text',
      pattern: VALIDATION_PATTERNS.LOGIN,
    },
    {
      id: 'password',
      label: 'Пароль',
      type: 'password',
      pattern: VALIDATION_PATTERNS.PASSWORD,
    },
  ],
  buttons: [
    {
      title: 'Вход',
      style: 'primary',
      type: 'submit',
    },
    {
      title: 'Нет аккаунта?',
      style: 'secondary',
    },
  ],
  events: {
    submit: createSubmitFn('.login-form'),
  },
};
