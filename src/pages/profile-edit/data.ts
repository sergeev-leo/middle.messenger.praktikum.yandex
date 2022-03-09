import { createSubmitFn, VALIDATION } from '../../modules/formValidation';


export const profileEditData = {
  avatar: {
    src:'/user.png',
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
      id: 'display_name',
      label: 'Имя в чате',
    },
    {
      id: 'phone',
      label: 'Телефон',
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
      formData => {
        console.log(formData);
      },
    ),
  },
};
