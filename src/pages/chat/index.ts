import compileTemplate from './index.pug';
import { Block } from '../../modules/Block/Block';
import { Menu } from '../../components/menu/menu';
import { IconButton } from '../../components/icon-button/icon-button';
import { Input } from '../../components/input/input';
import { createSubmitFn, VALIDATION } from '../../modules/formValidation';
import { Modal } from '../../components/modal/modal';
import { getChatData } from './data';
import { Link } from '../../components/link/link';
import { TStore, TUserStore } from '../../modules/store/store';
import { connect } from '../../modules/store/connect';
import { ChatController } from '../../controllers/ChatController';
import { DialogsSection } from '../../components/dialogsSection/dialogsSection';
import { MessagesSection } from '../../components/messagesSection/messagesSection';
import { SelectedDialogMeta } from '../../components/selectedDialogMeta/selectedDialogMeta';


type TChatPageProps = {
  selectedChatId: number,
  currentUserId: number,
};

/* eslint-disable no-console */
class ChatPageClass extends Block {

  async componentDidMount() {
    const chatsData = await ChatController.getChats({});

    if(!Array.isArray(chatsData)) {
      return;
    }

    const {
      currentUserId,
    } = this.props as TChatPageProps;

    for (const { id } of chatsData) {
      await ChatController.getChatUsers(id);
      await ChatController.connectToChat(id, currentUserId);
    }
  }

  componentWillUnmount() {
    ChatController.closeConnections();
  }

  protected initChildren() {
    const deleteChatCb = () => ChatController.deleteChat(this.props.selectedChatId as number);

    const {
      profileLink,
      chatMenu,
      attachMenu,
      searchInput,
      sendIcon,
      messageInput,
    } = getChatData(deleteChatCb);

    const sendMessage = () => {
      const messageInput = <HTMLInputElement>document.getElementById('message');
      if(!messageInput || !messageInput.value.trim()) {
        return;
      }

      const {
        selectedChatId,
      } = this.props;

      if(!ChatController.connections[selectedChatId as number]) {
        return;
      }

      ChatController.connections[selectedChatId as number].sendMessage(messageInput.value as string);
      messageInput.value = '';
    };

    this._children.profileLink = new Link(profileLink);
    this._children.chatMenu = new Menu(chatMenu);
    this._children.attachMenu = new Menu(attachMenu);
    this._children.selectedDialogMeta = new SelectedDialogMeta({});
    this._children.sendIcon = new IconButton({
      ...sendIcon,
      events: {
        click: sendMessage,
      },
    });
    this._children.searchInput = new Input(searchInput);
    this._children.messageInput = new Input({
      ...messageInput,
      events: {
        keydown: (e:KeyboardEvent) => {
          if(e.keyCode === 13) {
            return sendMessage();
          }
        },
      },
    });

    this._children.dialogsSection = new DialogsSection({});
    this._children.messagesSection = new MessagesSection({});

    this._children.createChatModal = new Modal({
      id: 'create-chat-modal',
      title: 'Создать чат',
      contentComponent: Input,
      contentComponentProps: {
        id: 'create-chat-input',
        label: 'Логин',
        pattern: VALIDATION.REQUIRED.pattern,
        error: VALIDATION.REQUIRED.message,
      },
      button: {
        title: 'Создать',
        type: 'submit',
        style: 'primary',
      },
      events: {
        submit: (e: InputEvent, onClose: () => void) => {
          createSubmitFn(
            '.create-chat-modal',
            formData => ChatController.createChat({
              title: formData['create-chat-input'] as string,
            }),
          )(e);
          onClose();
        },
      },
    });

    this._children.addUserModal = new Modal({
      id: 'add-user-modal',
      title: 'Добавить пользователя',
      contentComponent: Input,
      contentComponentProps: {
        id: 'add-user-input',
        label: 'Логин',
        pattern: VALIDATION.LOGIN.pattern,
        error: VALIDATION.LOGIN.message,
      },
      button: {
        title: 'Добавить',
        type: 'submit',
        style: 'primary',
      },
      events: {
        submit: (e: InputEvent, onClose: () => void) => {
          createSubmitFn(
            '.add-user-modal',
            formData => ChatController.addUserToChat(
              this.props.selectedChatId as number,
              formData['add-user-input'] as string,
            ),
          )(e);
          onClose();
        },
      },
    });

    this._children.deleteUserModal = new Modal({
      id: 'delete-user-modal',
      title: 'Удалить пользователя',
      contentComponent: Input,
      contentComponentProps: {
        id: 'delete-user-input',
        label: 'Логин',
        pattern: VALIDATION.LOGIN.pattern,
        error: VALIDATION.LOGIN.message,
      },
      button: {
        title: 'Удалить',
        type: 'submit',
        style: 'primary',
      },
      events: {
        submit: (e: InputEvent, onClose: () => void) => {
          createSubmitFn(
            '.delete-user-modal',
            formData => ChatController.deleteUserFromChat(
              this.props.selectedChatId as number,
              formData['delete-user-input'] as string,
            ),
          )(e);
          onClose();
        },
      },
    });

    this._children.fileUploadModal = new Modal({
      id: 'file-upload-modal',
      title: 'Загрузить файл',
      contentComponent: Input,
      contentComponentProps: {
        id: 'file-upload-input',
        type: 'file',
        label: 'Выберите файл',
        events: {
          change: function(e: InputEvent) {
            const inputElement = e.target as HTMLInputElement;

            if(!inputElement) {
              return;
            }

            const fileChosen = document.querySelector('#file-upload-modal .file-chosen');

            if(!fileChosen) {
              return;
            }

            const file = inputElement.files && inputElement.files[0];

            if(!file) {
              return;
            }

            fileChosen.textContent = file.name;
          },
        },
      },
      button: {
        title: 'Применить',
        type: 'submit',
        style: 'primary',
      },
      events: {
        submit: (e: InputEvent, onClose: () => void) => {
          createSubmitFn(
            '.file-upload-modal',
            () => console.log('fileUploadCb'),
          )(e);
          onClose();
        },
      },
    });

    this._children.mediaUploadModal = new Modal({
      id: 'media-upload-modal',
      title: 'Загрузить фото/видео',
      contentComponent: Input,
      contentComponentProps: {
        id: 'media-upload-input',
        type: 'file',
        label: 'Выберите файл',
        accept: 'image/*, video/*',
        events: {
          change: function(e: InputEvent) {
            const inputElement = e.target as HTMLInputElement;

            if(!inputElement) {
              return;
            }

            const fileChosen = document.querySelector('#media-upload-modal .file-chosen');

            if(!fileChosen) {
              return;
            }

            const file = inputElement.files && inputElement.files[0];

            if(!file) {
              return;
            }

            fileChosen.textContent = file.name;
          },
        },
      },
      button: {
        title: 'Применить',
        type: 'submit',
        style: 'primary',
      },
      events: {
        submit: (e: InputEvent, onClose: () => void) => {
          createSubmitFn(
            '.file-upload-modal',
            () => console.log('fileUploadCb'),
          )(e);
          onClose();
        },
      },
    });
  }

  render() {
    return this.compile(
      compileTemplate,
      {
        searchInputPlaceholder: 'Поиск',
        disabled: !this.props.selectedChatId,
        ...this._children,
      },
    );
  }
}


const mapStateToProps = (state: TStore) => {
  const {
    selectedChatId,
  } = state.chat;

  const { data } = state.user as TUserStore;
  const currentUserId = data?.id;

  return {
    selectedChatId,
    currentUserId,
  };
};

export const ChatPage = connect(ChatPageClass, mapStateToProps);
