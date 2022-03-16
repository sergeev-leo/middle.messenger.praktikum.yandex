import { Block } from '../../modules/Block/Block';
import { TStore } from '../../modules/store/store';
import { connect } from '../../modules/store/connect';
import { Dialog } from '../dialog/dialog';
import compileTemplate from './dialogsSection.pug';
import { ChatController } from '../../controllers/ChatController';
import { TChatDialog } from '../../modules/api/chatAPI';


export type TDialogsSectionProps = {
  dialogs: TChatDialog[] | [],
  selectedChatId: number,
  currentUserLogin: string,
};

class DialogsSectionClass extends Block {

  render() {
    const {
      selectedChatId,
      currentUserLogin,
      dialogs = [],
    } = this.props as TDialogsSectionProps;

    console.log('dialogsSection render');

    this._children.dialogs = dialogs.map(
      dialog => new Dialog({
        id: dialog.id,
        name: dialog.title,
        avatar: {
          src: dialog.avatar,
        },
        isSelected: dialog.id === selectedChatId,
        lastMessageTime: dialog.last_message?.time,
        currentUserMessage: dialog.last_message?.user.login === currentUserLogin,
        amountOfUnreadMessages: dialog.unread_count,
        messagePreview: dialog.last_message?.content,
        events: {
          click: () => ChatController.selectChat(dialog.id),
        },
      }),
    );

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
    data,
  } = state.user;

  const {
    dialogs,
    selectedChatId,
  } = state.chat;

  const currentUserLogin = data?.login;

  return {
    selectedChatId,
    currentUserLogin,
    dialogs,
  };
};

export const DialogsSection = connect(DialogsSectionClass, mapStateToProps);
