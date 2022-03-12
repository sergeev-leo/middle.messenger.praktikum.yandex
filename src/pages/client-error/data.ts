import { ROUTES } from '../../modules/Router/constants';
import { Router } from '../../modules/Router/Router';

export const clientErrorData = {
  errorCode: '404',
  errorText: 'Не туда попали',
  link: {
    style: 'primary',
    title: 'Назад к чатам',
    events: {
      click: () => Router.go(ROUTES.CHAT),
    },
  },
};
