import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';
import { Input, TInputProps } from '../../components/input/input';
import { Button, TButtonProps } from '../../components/button/button';

const data = {
  header: 'Вход',
  inputs: {
    login: {
      id: 'login',
      label: 'Логин',
      type: 'text',
      error: 'Неверный логин',
    },
    password: {
      id: 'password',
      label: 'Пароль',
      type: 'password',
    },
  },
  buttons: {
    logIn: {
      title: 'Вход',
      style: 'primary',
      type: 'submit',
    },
    register: {
      title: 'Нет аккаунта?',
      style: 'secondary',
    },
  },
};

export type TLoginFormProps = {
  title: string,
  header: string,
  inputs: Record<string, TInputProps>,
  buttons: Record<string, TButtonProps>,
}

export class LoginForm extends Block {
  constructor(props: TLoginFormProps) {
    super('div', data);
  }

  render() {
    const {
      title,
      header,
      inputs: {
        login,
        password,
      },
      buttons: {
        logIn,
        register,
      },
    } = this.props as TLoginFormProps;

    this._children.loginInput = new Input(login);
    this._children.passwordInput = new Input(password);
    this._children.logInButton = new Button(logIn);
    this._children.registerButton = new Button(register);

    return this.compile(
      compileTemplate,
      {
        title,
        header,
        ...this._children,
      },
    );
  }
}
