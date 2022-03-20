import { Input, TInputProps } from '../../components/input/input';
import { Button, TButtonProps } from '../../components/button/button';
import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';
import { registerData } from './data';
import { connect } from '../../modules/store/connect';
import { TStore } from '../../modules/store/store';


export type TRegisterFormProps = {
  title: string,
  header: string,
  inputs: TInputProps[],
  buttons: TButtonProps[],
  registerError: string | null,
}

class RegisterForm extends Block {

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
      registerError,
    } = this.props as TRegisterFormProps;

    return this.compile(
      compileTemplate,
      {
        header,
        ...this._children,
        registerError,
      },
    );
  }
}

const mapStateToProps = (state: TStore) => {
  const {
    user: {
      registerError,
    },
  } = state;

  return {
    ...registerData,
    registerError,
  };
};

export const RegisterPage = connect(RegisterForm, mapStateToProps);
