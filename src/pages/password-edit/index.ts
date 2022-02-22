import { Avatar, TAvatarProps } from '../../components/avatar/avatar';
import { Block } from '../../modules/Block/Block';
import { Button, TButtonProps } from '../../components/button/button';
import { Input, TInputProps } from '../../components/input/input';
import { GoBackButtonPanel } from '../../components/goBackButtonPanel/goBackButtonPanel';
import compileTemplate from '../password-edit/index.pug';
import { VALIDATION_PATTERNS } from '../../modules/formValidation';

const data = {
  avatar: {
    src:'../../../static/user.png',
    title: 'Поменять аватар',
  },
  inputs: [
    {
      id: 'oldPassword',
      label: 'Старый пароль',
      pattern: VALIDATION_PATTERNS.PASSWORD,
    },
    {
      id: 'newPassword',
      label: 'Новый пароль',
      pattern: VALIDATION_PATTERNS.PASSWORD,
    },
    {
      id: 'repeatNewPassword',
      label: 'Повторите пароль',
      pattern: VALIDATION_PATTERNS.PASSWORD,
    },
  ],
  button: {
    title: 'Сохранить',
    style: 'primary',
    type: 'submit',
  },
};


export type TPasswordEditPageProps = {
  avatar: TAvatarProps,
  inputs: TInputProps[],
  button: TButtonProps,
}

export class PasswordEditPage extends Block {
  constructor(props: TPasswordEditPageProps) {
    super(data);
  }

  initChildren() {
    const {
      avatar,
      inputs,
      button,
    } = this.props as TPasswordEditPageProps;

    this._children.avatar = new Avatar(avatar);
    this._children.button = new Button(button);
    this._children.inputs = inputs.map((item: TInputProps) => new Input(item));
    this._children.goBackButtonPanel = new GoBackButtonPanel();
  }

  render() {
    return this.compile(
      compileTemplate,
      {
        ...this._children,
      },
    );
  }
}
