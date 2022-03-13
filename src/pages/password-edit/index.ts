import { Avatar, TAvatarProps } from '../../components/avatar/avatar';
import { Block } from '../../modules/Block/Block';
import { Button, TButtonProps } from '../../components/button/button';
import { Input, TInputProps } from '../../components/input/input';
import { GoBackButtonPanel } from '../../components/goBackButtonPanel/goBackButtonPanel';
import compileTemplate from '../password-edit/index.pug';
import { TStore } from '../../modules/store/store';
import { connect } from '../../modules/store/connect';
import { getPasswordEditData } from './data';


export type TPasswordEditPageProps = {
  avatar: TAvatarProps,
  inputs: TInputProps[],
  button: TButtonProps,
}

class PasswordEditPageClass extends Block {
  initChildren() {
    const {
      avatar,
      inputs,
      button,
    } = this.props as TPasswordEditPageProps;

    this._children.avatar = new Avatar(avatar);
    this._children.button = new Button(button);
    this._children.inputs = inputs.map((item: TInputProps) => new Input(item));
    this._children.GoBackButtonPanel = new GoBackButtonPanel();
  }

  render() {
    const {
      avatar,
      inputs,
      button,
    } = this.props as TPasswordEditPageProps;

    this._children.avatar = new Avatar(avatar);
    this._children.button = new Button(button);
    this._children.inputs = inputs.map((item: TInputProps) => new Input(item));
    this._children.GoBackButtonPanel = new GoBackButtonPanel();

    return this.compile(
      compileTemplate,
      {
        ...this._children,
      },
    );
  }
}
const mapStateToProps = (state: TStore) => {
  const {
    data: userData,
    error,
  } = state.user;
  return {
    ...getPasswordEditData(userData),
    error,
  };
};

export const PasswordEditPage = connect(PasswordEditPageClass, mapStateToProps);
