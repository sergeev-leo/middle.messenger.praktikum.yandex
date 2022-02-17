import { Block } from "../../modules/Block/Block";
import compileTemplate from './dialog.pug';
import {Avatar, TAvatarProps} from "../avatar/avatar";
import {TEvents} from "../../modules/types";


export type TDialogProps = {
  avatar: TAvatarProps,
  isSelected: boolean,
  currentUserMessage: boolean,
  name: string,
  messagePreview: string,
  lastMessageTime: string,
  amountOfUnreadMessages: string | number,
  events?: TEvents,
};

export class Dialog extends Block {
  constructor(props: TDialogProps) {
    super("div", props);
  }

  render() {

    //------------------------------------------------------------------
    const { avatar } = this.props as TDialogProps;
    //------------------------------------------------------------------

    this._children.avatar = new Avatar(avatar);

    return this.compile(compileTemplate, { ...this.props, avatar: this._children.avatar });
  }
}
