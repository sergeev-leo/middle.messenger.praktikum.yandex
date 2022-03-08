import { ROUTES } from '../../modules/Router/constants';

export const clientErrorData = {
  errorCode: '404',
  errorText: 'Не туда попали',
  link: {
    style: 'primary',
    title: 'Назад к чатам',
    href: ROUTES.CHAT,
  },
};
