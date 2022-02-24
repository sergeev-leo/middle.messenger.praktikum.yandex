import { createSubmitFn, VALIDATION_PATTERNS } from '../../modules/formValidation';


export const registerData = {
  header: 'Регистрация',
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
      id: 'phone',
      label: 'Телефон',
      pattern: VALIDATION_PATTERNS.PHONE,
    },
    {
      id: 'password',
      label: 'Пароль',
      type: 'password',
      pattern: VALIDATION_PATTERNS.PASSWORD,
    },
    {
      id: 'password_repeat',
      label: 'Пароль (ещё раз)',
      type: 'password',
      pattern: VALIDATION_PATTERNS.PASSWORD,
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
    },
  ],
  events: {
    submit: createSubmitFn('.register-form'),
  },
};
