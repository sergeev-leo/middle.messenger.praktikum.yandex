import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';
import { Avatar, TAvatarProps } from '../../components/avatar/avatar';
import { Link, TLinkProps } from '../../components/link/link';
import { GoBackButtonPanel } from '../../components/goBackButtonPanel/goBackButtonPanel';


const data = {
  avatar: {
    src: '../../../static/user.png',
    title: 'Поменять аватар',
    withUpload: true,
  },
  userName: 'User',

  links: {
    logOut: {
      title: 'Выйти',
      style: 'error',
      href: '/logout',
    },
    changePassword: {
      title: 'Изменить пароль',
      style: 'secondary',
      href: '../password-edit/index.pug',
    },
    edit: {
      title: 'Изменить данные',
      style: 'secondary',
      href: '../profile-edit/index.pug',
    },
  },
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
  links: Record<string, TLinkProps>
  userData: TUserDataRow[],
}

export class ProfilePage extends Block {
  constructor(props: TProfilePageProps) {
    super('div', data);
  }

  render() {
    const {
      avatar,
      userName,
      links: {
        logOut,
        changePassword,
        edit,
      },
      userData,
    } = this.props as TProfilePageProps;

    this._children.avatar = new Avatar(avatar);
    this._children.logOut = new Link(logOut);
    this._children.changePassword = new Link(changePassword);
    this._children.edit = new Link(edit);
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
