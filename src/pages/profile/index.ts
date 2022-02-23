import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';
import { Avatar, TAvatarProps } from '../../components/avatar/avatar';
import { Link, TLinkProps } from '../../components/link/link';
import { GoBackButtonPanel } from '../../components/goBackButtonPanel/goBackButtonPanel';
import { render } from '../../modules/renderDOM';


const data = {
  avatar: {
    src: '../../../static/user.png',
    title: 'Поменять аватар',
    withUpload: true,
  },
  userName: 'User',

  links: [
    {
      title: 'Выйти',
      style: 'error',
      href: '/logout',
    },
    {
      title: 'Изменить пароль',
      style: 'secondary',
      href: '../password-edit/index.pug',
    },
    {
      title: 'Изменить данные',
      style: 'secondary',
      href: '../profile-edit/index.pug',
    },
  ],
  userData: [
    {
      id: 'email',
      label: 'Почта',
      value: 'pochta@yandex.ru',
    },
    {
      id: 'login',
      label: 'Логин',
      value: 'ivanivanov',
    },
    {
      id: 'first_name',
      label: 'Имя',
      value: 'Иван',
    },
    {
      id: 'second_name',
      label: 'Фамилия',
      value: 'Иванов',
    },
    {
      id: 'display_name',
      label: 'Имя в чате',
      value: 'Иван',
    },
    {
      id: 'phone',
      label: 'Телефон',
      value: '+7(909)9673030',
    },
  ],
};

type TUserDataRow = {
  id: string,
  label: string,
  value: string,
};

export type TProfilePageProps = {
  avatar: TAvatarProps,
  userName: string,
  links: TLinkProps[],
  userData: TUserDataRow[],
}

export class ProfilePage extends Block {
  constructor() {
    super(data);
  }

  render() {
    const {
      avatar,
      userName,
      links,
      userData,
    } = this.props as TProfilePageProps;

    this._children.avatar = new Avatar(avatar);
    this._children.links = links.map((item: TLinkProps) => new Link(item));
    this._children.GoBackButtonPanel = new GoBackButtonPanel();

    return this.compile(
      compileTemplate,
      {
        userName,
        userData,
        ...this._children,
      },
    );
  }
}

render('#profile', new ProfilePage());
