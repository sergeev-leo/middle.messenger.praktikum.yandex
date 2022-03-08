import { ROUTES } from '../../modules/Router/constants';

export const serverErrorData = {
  errorCode: '500',
  errorText: 'Мы уже фиксим',
  link: {
    style: 'primary',
    title: 'Назад к чатам',
    href: ROUTES.CHAT,
  },
};
