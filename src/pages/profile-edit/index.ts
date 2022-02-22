import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';
import { Avatar, TAvatarProps } from '../../components/avatar/avatar';
import { GoBackButtonPanel } from '../../components/goBackButtonPanel/goBackButtonPanel';
import { Button, TButtonProps } from '../../components/button/button';
import { Input, TInputProps } from '../../components/input/input';
import { createSubmitFn, VALIDATION_PATTERNS } from '../../modules/formValidation';


const data = {
  avatar: {
    src:'../../../static/user.png',
    title: 'Поменять аватар',
  },
  inputs: [
    {
      id: 'email',
      label: 'Почта',
      pattern: VALIDATION_PATTERNS.EMAIL,
    },
    {
      id: 'login',
      label: 'Логин',
      pattern: VALIDATION_PATTERNS.LOGIN,
    },
    {
      id: 'first_name',
      label: 'Имя',
      pattern: VALIDATION_PATTERNS.FIRST_NAME,
    },
    {
      id: 'second_name',
      label: 'Фамилия',
      pattern: VALIDATION_PATTERNS.SECOND_NAME,
    },
    {
      id: 'display_name',
      label: 'Имя в чате',
    },
    {
      id: 'phone',
      label: 'Телефон',
      pattern: VALIDATION_PATTERNS.PHONE,
    },
  ],
  button: {
    title: 'Сохранить',
    style: 'primary',
    type: 'submit',
  },
  events: {
    submit: createSubmitFn('.profile-edit'),
  },
};

export type TProfileEditPageProps = {
  avatar: TAvatarProps,
  inputs: TInputProps[],
  button: TButtonProps,
}

export class ProfileEditPage extends Block {
  constructor() {
    super(data);
  }

  initChildren() {
    const {
      avatar,
      inputs,
      button,
    } = this.props as TProfileEditPageProps;

    this._children.avatar = new Avatar(avatar);
    this._children.button = new Button(button);
    this._children.inputs = inputs.map((item: TInputProps) => new Input(item));
    this._children.GoBackButtonPanel = new GoBackButtonPanel();
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
