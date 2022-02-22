import { Input, TInputProps } from '../../components/input/input';
import { Button, TButtonProps } from '../../components/button/button';
import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';
import { createSubmitFn, VALIDATION_PATTERNS } from '../../modules/formValidation';


const data = {
  header: 'Регистрация',
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
      id: 'phone',
      label: 'Телефон',
      pattern: VALIDATION_PATTERNS.PHONE,
    },
    {
      id: 'password',
      label: 'Пароль',
      type: 'password',
      pattern: VALIDATION_PATTERNS.PASSWORD,
    },
    {
      id: 'password_repeat',
      label: 'Пароль (ещё раз)',
      type: 'password',
      pattern: VALIDATION_PATTERNS.PASSWORD,
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
  events: {
    submit: createSubmitFn('.register-form'),
  },
};

export type TRegisterFormProps = {
  title: string,
  header: string,
  inputs: TInputProps[],
  buttons: TButtonProps[],
}

export class RegisterForm extends Block {
  constructor() {
    super(data);
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
