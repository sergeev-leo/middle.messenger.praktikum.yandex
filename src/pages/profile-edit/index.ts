import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';
import { Avatar, TAvatarProps } from '../../components/avatar/avatar';
import { GoBackButtonPanel } from '../../components/goBackButtonPanel/goBackButtonPanel';
import { Button, TButtonProps } from '../../components/button/button';
import { Input, TInputProps } from '../../components/input/input';


const data = {
  avatar: {
    src:'../../../static/user.png',
    title: 'Поменять аватар',
  },
  inputs: {
    email: {
      id: 'email',
      label: 'Почта',
    },
    login: {
      id: 'login',
      label: 'Логин',
    },
    firstName: {
      id: 'first_name',
      label: 'Имя',
    },
    secondName:{
      id: 'second_name',
      label: 'Фамилия',
    },
    displayName: {
      id: 'display_name',
      label: 'Имя в чате',
    },
    phone: {
      id: 'phone',
      label: 'Телефон',
    },
  },
  button: {
    title: 'Сохранить',
    style: 'primary',
    type: 'submit',
  },
};

export type TProfileEditPageProps = {
  avatar: TAvatarProps,
  inputs: TInputProps[],
  button: TButtonProps,
}

export class ProfileEditPage extends Block {
  constructor(props: TProfileEditPageProps) {
    super('div', data);
  }

  render() {
    const {
      avatar,
      inputs: {
        email,
        login,
        firstName,
        secondName,
        displayName,
        phone,
      },
      button,
    } = this.props as TProfileEditPageProps;

    this._children.avatar = new Avatar(avatar);
    this._children.button = new Button(button);
    this._children.email = new Input(email);
    this._children.login = new Input(login);
    this._children.firstName = new Input(firstName);
    this._children.secondName = new Input(secondName);
    this._children.displayName = new Input(displayName);
    this._children.phone = new Input(phone);
    this._children.GoBackButtonPanel = new GoBackButtonPanel();

    return this.compile(
      compileTemplate,
      {
        ...this._children,
      },
    );
  }
}
