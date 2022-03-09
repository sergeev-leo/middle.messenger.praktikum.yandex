import { createSubmitFn, VALIDATION } from '../../modules/formValidation';
import { Router } from '../../modules/Router/Router';
import { ROUTES } from '../../modules/Router/constants';


export const registerData = {
  header: 'Регистрация',
  inputs: [
    {
      id: 'email',
      label: 'Почта',
      pattern: VALIDATION.EMAIL.pattern,
      error: VALIDATION.EMAIL.message,
    },
    {
      id: 'login',
      label: 'Логин',
      pattern: VALIDATION.LOGIN.pattern,
      error: VALIDATION.LOGIN.message,
    },
    {
      id: 'first_name',
      label: 'Имя',
      pattern: VALIDATION.FIRST_NAME.pattern,
      error: VALIDATION.FIRST_NAME.message,
    },
    {
      id: 'second_name',
      label: 'Фамилия',
      pattern: VALIDATION.SECOND_NAME.pattern,
      error: VALIDATION.SECOND_NAME.message,
    },
    {
      id: 'phone',
      label: 'Телефон',
      pattern: VALIDATION.PHONE.pattern,
      error: VALIDATION.PHONE.message,
    },
    {
      id: 'password',
      label: 'Пароль',
      type: 'password',
      pattern: VALIDATION.PASSWORD.pattern,
      error: VALIDATION.PASSWORD.message,
    },
    {
      id: 'password_repeat',
      label: 'Пароль (ещё раз)',
      type: 'password',
      pattern: VALIDATION.PASSWORD.pattern,
      error: VALIDATION.PASSWORD.message,
    },
  ],
  buttons: [
    {
      title: 'Зарегистрироваться',
      style: 'primary',
      type: 'submit',
    },
    {
      title: 'Войти',
      style: 'secondary',
      events: {
        click: () => Router.go(ROUTES.CHAT),
      },
    },
  ],
  events: {
    submit: createSubmitFn(
      '.register-form',
      () => Router.go(ROUTES.LOGIN),
    ),
  },
};
