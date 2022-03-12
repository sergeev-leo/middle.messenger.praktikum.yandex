import { ROUTES } from '../../modules/Router/constants';
import { Router } from '../../modules/Router/Router';

export const serverErrorData = {
  errorCode: '500',
  errorText: 'Мы уже фиксим',
  link: {
    style: 'primary',
    title: 'Назад к чатам',
    events: {
      click: () => Router.go(ROUTES.CHAT),
    },
  },
};
