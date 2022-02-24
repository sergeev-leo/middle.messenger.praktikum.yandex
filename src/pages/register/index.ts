import { Input, TInputProps } from '../../components/input/input';
import { Button, TButtonProps } from '../../components/button/button';
import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';
import { render } from '../../modules/renderDOM';
import { registerData } from './data';


export type TRegisterFormProps = {
  title: string,
  header: string,
  inputs: TInputProps[],
  buttons: TButtonProps[],
}

export class RegisterForm extends Block {
  constructor() {
    super(registerData);
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

render('#register', new RegisterForm());
