import compileTemplate from './index.pug';
import { Block } from '../../modules/Block/Block';
import { Menu, TMenuProps } from '../../components/menu/menu';
import { Avatar, TAvatarProps } from '../../components/avatar/avatar';
import { IconButton, TIconButtonProps } from '../../components/icon-button/icon-button';
import { Dialog, TDialogProps } from '../../components/dialog/dialog';
import { Message, TMessageProps } from '../../components/message/message';
import { Input, TInputProps } from '../../components/input/input';
import { createSubmitFn, VALIDATION } from '../../modules/formValidation';
import { Modal } from '../../components/modal/modal';
import { chatData } from './data';
import { Router } from '../../modules/Router/Router';
import { ROUTES } from '../../modules/Router/constants';
import { Link, TLinkProps } from '../../components/link/link';
import { TStore } from '../../modules/store/store';
import { connect } from '../../modules/store/connect';
import { ChatController } from '../../controllers/ChatController';


type TChatPageProps = {
  profileLink : TLinkProps,
  chatMenu: TMenuProps,
  attachMenu: TMenuProps,
  reviewingDialogUser: {
    name: string,
    avatar: TAvatarProps,
  },
  searchInput: TInputProps,
  searchInputPlaceholder: string,
  sendIcon: TIconButtonProps,
  dialogs: TDialogProps[] | [],
  messages: TMessageProps[],
  messagesPanelInfoText: string,
  messageInput: TInputProps,
  selectedChatId: number,
};

class ChatPageClass extends Block {
  componentDidMount() {
    ChatController.getChats({});
  }

  render() {
    const {
      reviewingDialogUser: {
        name,
      },
      searchInputPlaceholder,
      messagesPanelInfoText,
    } = this.props as TChatPageProps;

    const {
      profileLink,
      chatMenu,
      attachMenu,
      reviewingDialogUser: {
        avatar,
      },
      searchInput,
      sendIcon,
      dialogs = [],
      messages,
      messageInput,
      selectedChatId,
    } = this.props as TChatPageProps;

    this._children.profileLink = new Link(profileLink);
    this._children.chatMenu = new Menu(chatMenu);
    this._children.attachMenu = new Menu(attachMenu);
    this._children.reviewingDialogUserAvatar = new Avatar(avatar);
    this._children.sendIcon = new IconButton(sendIcon);
    this._children.searchInput = new Input(searchInput);
    this._children.messageInput = new Input(messageInput);
    this._children.dialogs = dialogs
      .map((item: TDialogProps) => new Dialog({
        ...item,
        events: {
          click: () => Router.go([ROUTES.CHAT, item.id].join('/')),
        },
      }));
    this._children.messages = messages.map((item: TMessageProps) => new Message(item));

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
            (formData) => ChatController.createChat({
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
              selectedChatId,
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
              selectedChatId,
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
            if(!e.target) {
              return;
            }

            const fileChosen = document.querySelector('#file-upload-modal .file-chosen');

            if(!fileChosen) {
              return;
            }

            fileChosen.textContent = e.target.files[0].name;
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
            if(!e.target) {
              return;
            }

            const fileChosen = document.querySelector('#media-upload-modal .file-chosen');

            if(!fileChosen) {
              return;
            }

            fileChosen.textContent = e.target.files[0].name;
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

    return this.compile(
      compileTemplate,
      {
        searchInputPlaceholder,
        messagesPanelInfoText,
        reviewingDialogUserName: name,
        ...this._children,
      },
    );
  }
}


const mapStateToProps = (state: TStore) => {
  const {
    dialogs,
  } = state.chat;

  const {
    data,
  } = state.user;

  const currentUserLogin = data && data.login;

  return {
    ...chatData,
    // TODO
    selectedChatId: 2023,
    dialogs: dialogs.map(
      dialog => ({
        id: dialog.id,
        name: dialog.title,
        avatar: {
          src: dialog.avatar,
        },
        lastMessageTime: dialog.last_message?.time,
        currentUserMessage: dialog.last_message?.user.login === currentUserLogin,
        amountOfUnreadMessages: dialog.unread_count,
        messagePreview: dialog.last_message?.content,
      }),
    ),
  };
};

export const ChatPage = connect(ChatPageClass, mapStateToProps);
