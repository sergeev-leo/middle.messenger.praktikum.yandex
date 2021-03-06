import { createSubmitFn, VALIDATION } from '../../modules/formValidation';
import { ProfileController } from '../../controllers/ProfileController';
import { TChangePasswordData } from '../../modules/api/profileAPI';
import { Router } from '../../modules/Router/Router';
import { Routes } from '../../modules/Router/constants';


export type TGetPasswordEditData = {
  avatar: string,
}

export const getPasswordEditData = ({ avatar }: TGetPasswordEditData) => ({
  avatar: {
    src: avatar,
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
      async formData => {
        await ProfileController.changePassword(formData as TChangePasswordData);
        Router.go(Routes.PROFILE);
      },
    ),
  },
});
