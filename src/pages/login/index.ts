import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';
import { Input, TInputProps } from '../../components/input/input';
import { Button, TButtonProps } from '../../components/button/button';
import { loginData } from './data';
import { TStore } from '../../modules/store/store';
import { connect } from '../../modules/store/connect';


export type TLoginFormProps = {
  title: string,
  header: string,
  inputs: TInputProps[],
  buttons: TButtonProps[],
  loginError: string,
}

export class LoginForm extends Block {
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
      loginError,
    } = this.props as TLoginFormProps;

    return this.compile(
      compileTemplate,
      {
        title,
        header,
        loginError,
        ...this._children,
      },
    );
  }
}


const mapStateToProps = (state: TStore) => {
  const {
    user: {
      loginError,
    },
  } = state;

  return {
    ...loginData,
    loginError,
  };
};

export const LoginPage = connect(LoginForm, mapStateToProps);
