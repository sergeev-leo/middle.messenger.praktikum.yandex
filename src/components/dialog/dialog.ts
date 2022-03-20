import { Block } from '../../modules/Block/Block';
import compileTemplate from './dialog.pug';
import { Avatar, TAvatarProps } from '../avatar/avatar';
import { TEvents } from '../../modules/types';


export type TDialogProps = {
  id: number,
  avatar?: TAvatarProps,
  isSelected: boolean,
  currentUserMessage: boolean,
  name: string,
  messagePreview?: string,
  lastMessageTime?: string,
  amountOfUnreadMessages: string | number,
  events?: TEvents,
};

export class Dialog extends Block {
  initChildren() {
    const { avatar } = this.props as TDialogProps;

    this._children.avatar = new Avatar(avatar);
  }

  render() {
    return this.compile(compileTemplate, { ...this.props });
  }
}
