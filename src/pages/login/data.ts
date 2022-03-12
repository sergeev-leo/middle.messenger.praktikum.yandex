import { createSubmitFn, VALIDATION } from '../../modules/formValidation';
import { Router } from '../../modules/Router/Router';
import { ROUTES } from '../../modules/Router/constants';
import {UserController} from "../../controllers/UserController";
import {TSignInData} from "../../modules/api/authAPI";


export const loginData = {
  header: 'Вход',
  inputs: [
    {
      id: 'login',
      label: 'Логин',
      type: 'text',
      pattern: VALIDATION.LOGIN.pattern,
      error: VALIDATION.LOGIN.message,
    },
    {
      id: 'password',
      label: 'Пароль',
      type: 'password',
      pattern: VALIDATION.PASSWORD.pattern,
      error: VALIDATION.PASSWORD.message,
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
      formData => UserController
        .signIn(formData as TSignInData)
        .then(() => Router.go(ROUTES.CHAT)),
    ),
  },
};
