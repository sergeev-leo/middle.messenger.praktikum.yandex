import { createSubmitFn, VALIDATION } from '../../modules/formValidation';
import { ProfileController } from '../../controllers/ProfileController';
import { TChangeProfileData } from '../../modules/api/profileAPI';
import { Router } from '../../modules/Router/Router';
import { ROUTES } from '../../modules/Router/constants';


export const getProfileEditData = ({
  avatar,
  login,
  email,
  phone,
  firstName,
  secondName,
  displayName,
}) => ({
  avatar: {
    src: avatar,
    title: 'Поменять аватар',
    withUpload: true,
    events: {
      click: ()  => {
        const modal = document.querySelector('#file-upload-modal');
        modal?.classList.remove('closed');
      },
    },
  },
  inputs: [
    {
      id: 'email',
      label: 'Почта',
      value: email,
      pattern: VALIDATION.EMAIL.pattern,
      error: VALIDATION.EMAIL.message,
    },
    {
      id: 'login',
      label: 'Логин',
      value: login,
      pattern: VALIDATION.LOGIN.pattern,
      error: VALIDATION.LOGIN.message,
    },
    {
      id: 'first_name',
      label: 'Имя',
      value: firstName,
      pattern: VALIDATION.FIRST_NAME.pattern,
      error: VALIDATION.FIRST_NAME.message,
    },
    {
      id: 'second_name',
      label: 'Фамилия',
      value: secondName,
      pattern: VALIDATION.SECOND_NAME.pattern,
      error: VALIDATION.SECOND_NAME.message,
    },
    {
      id: 'display_name',
      label: 'Имя в чате',
      value: displayName,
    },
    {
      id: 'phone',
      label: 'Телефон',
      value: phone,
      pattern: VALIDATION.PHONE.pattern,
      error: VALIDATION.PHONE.message,
    },
  ],
  button: {
    title: 'Сохранить',
    style: 'primary',
    type: 'submit',
  },
  events: {
    submit: createSubmitFn(
      '.profile-edit',
      async formData => {
        await ProfileController.changeProfile(formData as TChangeProfileData);
        Router.go(ROUTES.PROFILE);
      },
    ),
  },
});
