import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';
import { Avatar, TAvatarProps } from '../../components/avatar/avatar';
import { GoBackButtonPanel } from '../../components/goBackButtonPanel/goBackButtonPanel';
import { Button, TButtonProps } from '../../components/button/button';
import { Input, TInputProps } from '../../components/input/input';
import { profileEditData } from './data';


export type TProfileEditPageProps = {
  avatar: TAvatarProps,
  inputs: TInputProps[],
  button: TButtonProps,
}

export class ProfileEditPage extends Block {
  constructor() {
    super(profileEditData);
  }

  initChildren() {
    const {
      avatar,
      inputs,
      button,
    } = this.props as TProfileEditPageProps;

    this._children.avatar = new Avatar(avatar);
    this._children.button = new Button(button);
    this._children.inputs = inputs.map((item: TInputProps) => new Input(item));
    this._children.GoBackButtonPanel = new GoBackButtonPanel();
  }

  render() {
    return this.compile(
      compileTemplate,
      {
        ...this._children,
      },
    );
  }
}
