import { Block } from '../../modules/Block/Block';
import { TChatMessage, TStore } from '../../modules/store/store';
import { connect } from '../../modules/store/connect';
import compileTemplate from './messagesSection.pug';
import { Message } from '../message/message';


export type TMessagesSectionProps = {
  messages: TChatMessage[] | [],
  currentUserId: number,
};

class MessagesSectionClass extends Block {

  render() {
    console.log('messages');
    const {
      currentUserId,
      messages = [],
    } = this.props as TMessagesSectionProps;

    this._children.messages = messages
      .sort((a, b) => Date.parse(a.time) - Date.parse(b.time))
      .map(
        message => {
          const {
            content,
            is_read,
            time,
            user_id,
          } = message as TChatMessage;

          return new Message({
            type: 0,
            time,
            status: is_read ? 'read' : 'delivered',
            text: content,
            currentUserMessage: user_id === currentUserId,
          });
        },
      );

    return this.compile(
      compileTemplate,
      {
        messagesPanelInfoText: 'Выберите чат чтобы отправить сообщение',
        ...this._children,
      },
    );
  }
}

const mapStateToProps = (state: TStore) => {
  const {
    data,
  } = state.user;

  const currentUserId = data?.id;

  const {
    messages,
    selectedChatId,
  } = state.chat;

  return {
    currentUserId,
    messages: messages[selectedChatId] ? messages[selectedChatId] : [],
  };
};

export const MessagesSection = connect(MessagesSectionClass, mapStateToProps);
