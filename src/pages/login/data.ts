import { createSubmitFn, VALIDATION_PATTERNS } from '../../modules/formValidation';
import { Router } from '../../modules/Router/Router';
import { ROUTES } from '../../modules/Router/constants';


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
      events: {
        click: () => Router.go(ROUTES.REGISTER),
      },
    },
  ],
  events: {
    submit: createSubmitFn(
      '.login-form',
      () => Router.go(ROUTES.CHAT),
    ),
  },
};
