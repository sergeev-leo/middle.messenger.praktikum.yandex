import { createSubmitFn, VALIDATION } from '../../modules/formValidation';


export const passwordEditData = {
  avatar: {
    src:'/user.png',
    title: 'Поменять аватар',
  },
  inputs: [
    {
      id: 'oldPassword',
      label: 'Старый пароль',
      type: 'password',
      pattern: VALIDATION.PASSWORD.pattern,
      error: VALIDATION.PASSWORD.message,
    },
    {
      id: 'newPassword',
      label: 'Новый пароль',
      type: 'password',
      pattern: VALIDATION.PASSWORD.pattern,
      error: VALIDATION.PASSWORD.message,
    },
    {
      id: 'repeatNewPassword',
      label: 'Повторите пароль',
      type: 'password',
      pattern: VALIDATION.PASSWORD.pattern,
      error: VALIDATION.PASSWORD.message,
    },
  ],
  button: {
    title: 'Сохранить',
    style: 'primary',
    type: 'submit',
  },
  events: {
    submit: createSubmitFn(
      '.password-edit',
      formData => {
        console.log(formData);
      },
    ),
  },
};
