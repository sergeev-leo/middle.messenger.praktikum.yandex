import compileTemplate from './index.pug';
import { Block } from '../../modules/Block/Block';
import { Link, TLinkProps } from '../../components/link/link';
import { Menu, TMenuProps } from '../../components/menu/menu';
import { Avatar, TAvatarProps } from '../../components/avatar/avatar';
import { IconButton, TIconButtonProps } from '../../components/icon-button/icon-button';
import { Dialog, TDialogProps } from '../../components/dialog/dialog';
import { Message, TMessageProps } from '../../components/message/message';
import { Input, TInputProps } from '../../components/input/input';
import { createSubmitFn, VALIDATION_PATTERNS } from '../../modules/formValidation';
import { render } from '../../modules/renderDOM';
import {Modal} from "../../components/modal/modal";

const data = {
  profileLink: {
    title: 'Профиль',
    href: '../profile/index.pug',
  },
  searchInputPlaceholder: 'Поиск',
  searchInput: {
    id: 'search',
    type: 'search',
    events: {
      keyup: (e: InputEvent) => {
        const { value } = e.target as HTMLInputElement;

        return console.log(`поиск ${value}`);
      },
    },
  },
  dialogs: [
    {
      name: 'Андрей',
      avatar: {
        src: '../../../static/user.png',
      },
      lastMessageTime: '10:49',
      currentUserMessage: false,
      amountOfUnreadMessages: 2,
      messagePreview: 'Изображение',
    },
    {
      name: 'Киноклуб',
      avatar: {
        src: '../../../static/user.png',
      },
      lastMessageTime: '12:00',
      currentUserMessage: true,
      isSelected: true,
      amountOfUnreadMessages: 0,
      messagePreview: 'стикер',
    },
    {
      name: 'Илья',
      avatar: {
        src: '../../../static/user.png',
      },
      lastMessageTime: '15:12',
      currentUserMessage: false,
      amountOfUnreadMessages: 4,
      messagePreview: 'Друзья, у меня для вас особенный выпуск новостей!...',
    },
  ],
  reviewingDialogUser: {
    avatar: {
      src: '../../../static/user.png',
    },
    name: 'Киноклуб',
  },
  chatMenu: {
    position: 'top-left',
    iconButton: {
      style: 'primary',
      outerIconClassName:'fa-circle-thin',
      iconClassName: 'fa-ellipsis-v',
    },
    data: [
      {
        id: 'chat-menu-1',
        text: 'Добавить пользователя',
        iconButton: {
          outerIconClassName:'fa-circle-thin',
          iconClassName: 'fa-plus',
        },
        events: {
          click: ()  => {
            const modal = document.querySelector('#add-user-modal');
            modal?.classList.remove('closed');
          },
        },
      },
      {
        id: 'chat-menu-2',
        text: 'удалить пользователя',
        iconButton: {
          outerIconClassName:'fa-circle-thin',
          iconClassName: 'fa-close',
        },
        events: {
          click: ()  => {
            const modal = document.querySelector('#delete-user-modal');
            modal?.classList.remove('closed');
          },
        },
      },
      {
        id: 'chat-menu-3',
        text: 'удалить чат',
        iconButton: {
          outerIconClassName:'fa-circle-thin',
          iconClassName: 'fa-trash',
        },
        events: {
          click: ()  => console.log('удалить чат'),
        },
      },
    ],
  },
  attachMenu: {
    position: 'bottom-right',
    iconButton: {
      outerIconClassName:'fa-circle-thin',
      iconClassName: 'fa-paperclip',
    },
    data: [
      {
        id: 'attach-menu-1',
        text: 'Фото или видео',
        iconButton: {
          outerIconClassName:'fa-circle-thin',
          iconClassName: 'fa-picture-o',
        },
        events: {
          click: ()  => console.log('фото/видео'),
        },
      },
      {
        id: 'attach-menu-2',
        text: 'Файл',
        iconButton: {
          outerIconClassName:'fa-circle-thin',
          iconClassName: 'fa-file-o',
        },
        events: {
          click: ()  => {
            const modal = document.querySelector('#file-upload-modal');
            modal?.classList.remove('closed');
          },
        },
      },
      {
        id: 'attach-menu-3',
        text: 'Локация',
        iconButton: {
          outerIconClassName:'fa-circle-thin',
          iconClassName: 'fa-map-marker',
        },
        events: {
          click: ()  => console.log('локация'),
        },
      },
    ],
  },
  messages: [
    {
      type: 0,
      time: '12:00',
      status: 'read',
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat maiores totam ex?',
      currentUserMessage: false,
    },
    {
      type: 0,
      time: '12:00',
      status: 'read',
      text: 'Lorem ipsum dolor, sit amet consectetur. Distinctio sed, esse cum libero obcaecati voluptate debitis.',
      currentUserMessage: false,
    },
    {
      status: 'dateTimeMsg',
      text: '19 июля',
    },
    {
      type: 0,
      time: '12:00',
      status: 'read',
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat maiores totam ex? Distinctio sed, esse cum libero obcaecati voluptate debitis.',
      currentUserMessage: true,
    },
    {
      type: 0,
      time: '12:00',
      status: 'delivered',
      text: 'Lorem ipsum dolor',
      currentUserMessage: true,
    },
    {
      type: 0,
      time: '12:00',
      status: 'sent',
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat maiores totam ex? Distinctio sed, esse cum libero obcaecati voluptate debitis.',
      currentUserMessage: true,
    },
  ],
  sendIcon: {
    outerIconClassName: 'fa-circle',
    iconClassName: 'fa-arrow-right',
    events: {
      click: createSubmitFn('.chat__bottom-panel'),
    },
  },
  messagesPanelInfoText: 'Выберите чат чтобы отправить сообщение',
  messageInput: {
    id: 'message',
    placeholder: 'Сообщение',
    pattern: VALIDATION_PATTERNS.REQUIRED,
  },
  events: {
    submit: createSubmitFn('.chat__bottom-panel'),
  },
};

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
  dialogs: TDialogProps[],
  messages: TMessageProps[],
  messagesPanelInfoText: string,
  messageInput: TInputProps,
};

export class ChatPage extends Block {
  constructor() {
    super(data);
  }

  initChildren() {
    const {
      profileLink,
      chatMenu,
      attachMenu,
      reviewingDialogUser: {
        avatar,
      },
      searchInput,
      sendIcon,
      dialogs,
      messages,
      messageInput,
    } = this.props as TChatPageProps;

    this._children.profileLink = new Link(profileLink);
    this._children.chatMenu = new Menu(chatMenu);
    this._children.attachMenu = new Menu(attachMenu);
    this._children.reviewingDialogUserAvatar = new Avatar(avatar);
    this._children.sendIcon = new IconButton(sendIcon);
    this._children.searchInput = new Input(searchInput);
    this._children.messageInput = new Input(messageInput);
    this._children.dialogs = dialogs.map((item: TDialogProps) => new Dialog(item));
    this._children.messages = messages.map((item: TMessageProps) => new Message(item));
  }

  render() {
    const {
      reviewingDialogUser: {
        name,
      },
      searchInputPlaceholder,
      messagesPanelInfoText,
    } = this.props as TChatPageProps;

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

render('#chat', new ChatPage());

/*
* модальные окна размещаем здесь, т.к. доступ к ним есть только со страницы чата, но по факту, их необходимо будет
* разметстить в корневом компоненте, чтобы можно было ими пользоваться из других частей приложения
* */
render('#chat', new Modal({
  id: 'add-user-modal',
  title: 'Добавить пользователя',
  contentComponent: Input,
  contentComponentProps: {
    id: 'add-user-input',
    label: 'Логин',
    pattern: VALIDATION_PATTERNS.LOGIN,
  },
  button: {
    title: 'Добавить',
    type: 'submit',
    style: 'primary',
  },
  events: {
    submit: (e: InputEvent, onClose: () => void) => {
      createSubmitFn('.add-user-modal')(e);
      onClose();
    },
  },
}));

render('#chat', new Modal({
  id: 'delete-user-modal',
  title: 'Удалить пользователя',
  contentComponent: Input,
  contentComponentProps: {
    id: 'delete-user-input',
    label: 'Логин',
    pattern: VALIDATION_PATTERNS.LOGIN,
  },
  button: {
    title: 'Удалить',
    type: 'submit',
    style: 'primary',
  },
  events: {
    submit: (e: InputEvent, onClose: () => void) => {
      createSubmitFn('.delete-user-modal')(e);
      onClose();
    },
  },
}));

render('#chat', new Modal({
  id: 'file-upload-modal',
  title: 'Удалить пользователя',
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

        const fileChosen = document.querySelector('#file-chosen');

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
      createSubmitFn('.file-upload-modal')(e);
      onClose();
    },
  },
}));
