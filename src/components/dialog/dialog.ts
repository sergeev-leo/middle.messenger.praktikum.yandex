import { Block } from "../../modules/Block/Block";
import compileTemplate from './dialog.pug';
import {Avatar, TAvatarProps} from "../avatar/avatar";


export type TDialogProps = {
  avatar: TAvatarProps,
  isSelected: boolean,
  currentUserMessage: boolean,
  name: string,
  messagePreview: string,
  lastMessageTime: string,
  amountOfUnreadMessages: string | number,
};

export class Dialog extends Block {
  constructor(props: TDialogProps) {
    super("div", props);

    this._children.avatar = new Avatar(props.avatar);
  }

  render() {
    return this.compile(compileTemplate, { ...this.props, avatar: this._children.avatar });
  }
}
