import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';
import { Input, TInputProps } from '../../components/input/input';
import { Button, TButtonProps } from '../../components/button/button';
import { render } from '../../modules/renderDOM';
import { loginData } from './data';


export type TLoginFormProps = {
  title: string,
  header: string,
  inputs: TInputProps[],
  buttons: TButtonProps[],
}

export class LoginForm extends Block {
  constructor() {
    super(loginData);
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

render('#login', new LoginForm());
