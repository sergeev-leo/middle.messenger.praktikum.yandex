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
  dialogFilter: string,
};

class DialogsSectionClass extends Block {

  render() {
    const {
      selectedChatId,
      currentUserLogin,
      dialogs = [],
      dialogFilter,
    } = this.props as TDialogsSectionProps;

    this._children.dialogs = dialogs
      .filter(({ title }) => title.toLowerCase().trim().includes(dialogFilter))
      .sort((a, b) => Date.parse(b.last_message?.time) - Date.parse(a.last_message?.time))
      .map(
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
    dialogFilter,
    selectedChatId,
  } = state.chat;

  const currentUserLogin = data?.login;

  return {
    selectedChatId,
    currentUserLogin,
    dialogs,
    dialogFilter,
  };
};

export const DialogsSection = connect(DialogsSectionClass, mapStateToProps);
