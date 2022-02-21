import { Input, TInputProps } from '../../components/input/input';
import { Button, TButtonProps } from '../../components/button/button';
import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';


const data = {
  header: 'Регистрация',
  inputs: [
    {
      id: 'email',
      label: 'Почта',
    },
    {
      id: 'login',
      label: 'Логин',
    },
    {
      id: 'first_name',
      label: 'Имя',
    },
    {
      id: 'second_name',
      label: 'Фамилия',
    },
    {
      id: 'phone',
      label: 'Телефон',
    },
    {
      id: 'password',
      label: 'Пароль',
      type: 'password',
    },
    {
      id: 'password_repeat',
      label: 'Пароль (ещё раз)',
      type: 'password',
    },
  ],
  buttons: [
    {
      title: 'Зарегистрироваться',
      style: 'primary',
      type: 'submit',
    },
    {
      title: 'Войти',
      style: 'secondary',
    },
  ],
};

export type TRegisterFormProps = {
  title: string,
  header: string,
  inputs: TInputProps[],
  buttons: TButtonProps[],
}

export class RegisterForm extends Block {
  constructor(props: TRegisterFormProps) {
    super('div', data);
  }

  initChildren() {
    const {
      inputs,
      buttons,
    } = this.props as TRegisterFormProps;

    this._children.inputs = inputs.map((item: TInputProps) => new Input(item));
    this._children.buttons = buttons.map((item: TButtonProps) => new Button(item));
  }

  render() {
    const {
      header,
    } = this.props as TRegisterFormProps;

    return this.compile(
      compileTemplate,
      {
        header,
        ...this._children,
      },
    );
  }
}
