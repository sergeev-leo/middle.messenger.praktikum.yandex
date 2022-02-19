import { Input, TInputProps } from '../../components/input/input';
import { Button, TButtonProps } from '../../components/button/button';
import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';


const data = {
  header: 'Регистрация',
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
    secondName: {
      id: 'second_name',
      label: 'Фамилия',
    },
    phone: {
      id: 'phone',
      label: 'Телефон',
    },
    password: {
      id: 'password',
      label: 'Пароль',
      type: 'password',
    },
    passwordRepeat: {
      id: 'password_repeat',
      label: 'Пароль (ещё раз)',
      type: 'password',
    },
  },
  buttons: {
    register: {
      title: 'Зарегистрироваться',
      style: 'primary',
      type: 'submit',
    },
    logIn: {
      title: 'Войти',
      style: 'secondary',
    },
  },
};

export type TRegisterFormProps = {
  title: string,
  header: string,
  inputs: Record<string, TInputProps>,
  buttons: Record<string, TButtonProps>,
}

export class RegisterForm extends Block {
  constructor(props: TRegisterFormProps) {
    super('div', data);
  }

  render() {
    const {
      header,
      inputs: {
        email,
        login,
        firstName,
        secondName,
        phone,
        password,
        passwordRepeat,
      },
      buttons: {
        logIn,
        register,
      },
    } = this.props as TRegisterFormProps;

    this._children.emailInput = new Input(email);
    this._children.loginInput = new Input(login);
    this._children.firstNameInput = new Input(firstName);
    this._children.secondNameInput = new Input(secondName);
    this._children.phoneInput = new Input(phone);
    this._children.passwordInput = new Input(password);
    this._children.passwordRepeatInput = new Input(passwordRepeat);

    this._children.logInButton = new Button(logIn);
    this._children.registerButton = new Button(register);

    return this.compile(
      compileTemplate,
      {
        header,
        ...this._children,
      },
    );
  }
}
