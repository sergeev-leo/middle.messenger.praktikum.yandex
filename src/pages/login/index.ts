import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';
import { Input, TInputProps } from '../../components/input/input';
import { Button, TButtonProps } from '../../components/button/button';
import { createSubmitFn, VALIDATION_PATTERNS } from '../../modules/formValidation';


const data = {
  header: 'Вход',
  inputs: [
    {
      id: 'login',
      label: 'Логин',
      type: 'text',
      pattern: VALIDATION_PATTERNS.LOGIN,
    },
    {
      id: 'password',
      label: 'Пароль',
      type: 'password',
      pattern: VALIDATION_PATTERNS.PASSWORD,
    },
  ],
  buttons: [
    {
      title: 'Вход',
      style: 'primary',
      type: 'submit',
    },
    {
      title: 'Нет аккаунта?',
      style: 'secondary',
    },
  ],
  events: {
    submit: createSubmitFn('.login-form'),
  },
};

export type TLoginFormProps = {
  title: string,
  header: string,
  inputs: TInputProps[],
  buttons: TButtonProps[],
}

export class LoginForm extends Block {
  constructor(props: TLoginFormProps) {
    super(data);
  }

  initChildren() {
    const {
      inputs,
      buttons,
    } = this.props as TLoginFormProps;

    this._children.inputs = inputs.map((item: TInputProps) => new Input(item));
    this._children.buttons = buttons.map((item: TButtonProps) => new Button(item));
  }

  render() {
    const {
      title,
      header,
    } = this.props as TLoginFormProps;

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
