import { Avatar, TAvatarProps } from '../../components/avatar/avatar';
import { Block } from '../../modules/Block/Block';
import { Button, TButtonProps } from '../../components/button/button';
import { Input, TInputProps } from '../../components/input/input';
import { GoBackButtonPanel } from '../../components/goBackButtonPanel/goBackButtonPanel';
import compileTemplate from '../password-edit/index.pug';

const data = {
  avatar: {
    src:'../../../static/user.png',
    title: 'Поменять аватар',
  },
  inputs: {
    oldPassword: {
      id: 'oldPassword',
      label: 'Старый пароль',
    },
    newPassword: {
      id: 'newPassword',
      label: 'Новый пароль',
    },
    repeatNewPassword: {
      id: 'repeatNewPassword',
      label: 'Повторите пароль',
    },
  },
  button: {
    title: 'Сохранить',
    style: 'primary',
  },
};


export type TPasswordEditPageProps = {
  avatar: TAvatarProps,
  inputs: Record<string, TInputProps>,
  button: TButtonProps,
}

export class PasswordEditPage extends Block {
  constructor(props: TPasswordEditPageProps) {
    super('div', data);
  }

  render() {
    const {
      avatar,
      inputs: {
        oldPassword,
        newPassword,
        repeatNewPassword,
      },
      button,
    } = this.props as TPasswordEditPageProps;

    this._children.avatar = new Avatar(avatar);
    this._children.button = new Button(button);
    this._children.oldPassword = new Input(oldPassword);
    this._children.newPassword = new Input(newPassword);
    this._children.repeatNewPassword = new Input(repeatNewPassword);
    this._children.goBackButtonPanel = new GoBackButtonPanel();

    return this.compile(
      compileTemplate,
      {
        ...this._children,
      },
    );
  }
}
