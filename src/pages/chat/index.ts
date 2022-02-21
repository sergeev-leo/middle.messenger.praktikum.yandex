import compileTemplate from './index.pug';
import { Block } from '../../modules/Block/Block';
import { Link, TLinkProps } from '../../components/link/link';
import { Menu, TMenuProps } from '../../components/menu/menu';
import { Avatar, TAvatarProps } from '../../components/avatar/avatar';
import { IconButton, TIconButtonProps } from '../../components/icon-button/icon-button';
import { Dialog, TDialogProps } from '../../components/dialog/dialog';
import { Message, TMessageProps } from '../../components/message/message';
import {Input, TInputProps} from "../../components/input/input";

const data = {
  profileLink: {
    title: 'Профиль',
    style: 'error',
    href: '../profile/index.pug',
  },
  searchInputPlaceholder: 'Поиск',
  searchInput: {
    id: 'search',
    type: 'search',
    events: {
      focusin: () => console.log('focus'),
      focusout: () => console.log('blur'),
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
          click: ()  => console.log('1'),
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
          click: ()  => console.log('2'),
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
          click: ()  => console.log('3'),
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
          click: ()  => console.log('1'),
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
          click: ()  => console.log('2'),
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
          click: ()  => console.log('3'),
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
  },
  messagesPanelInfoText: 'Выберите чат чтобы отправить сообщение',
  messageInput: {
    id: 'message',
    placeholder: 'Сообщение',
    events: {
      focusin: () => console.log('focus'),
      focusout: () => console.log('blur'),
    },
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
  constructor(props: TChatPageProps) {
    super('div', data);
  }

  render() {
    const {
      profileLink,
      chatMenu,
      attachMenu,
      reviewingDialogUser: {
        name,
        avatar,
      },
      searchInput,
      searchInputPlaceholder,
      sendIcon,
      dialogs,
      messages,
      messagesPanelInfoText,
      messageInput,
    } = this.props as TChatPageProps;

    this._children.profileLink = new Link(profileLink);
    this._children.chatMenu = new Menu(chatMenu);
    this._children.attachMenu = new Menu(attachMenu);
    this._children.reviewingDialogUserAvatar = new Avatar(avatar);
    this._children.sendIcon = new IconButton(sendIcon);
    this._children.searchInput = new Input(searchInput);
    this._children.messageInput = new Input(messageInput);

    //------------------------------------------------------------------
    dialogs.forEach((item: TDialogProps, index: number) => {
      const key = ['dialog', index].join('_');
      this._children[key] = new Dialog(item);
    });
    messages.forEach((item: TMessageProps, index: number) => {
      const key = ['message', index].join('_');
      this._children[key] = new Message(item);
    });
    //------------------------------------------------------------------

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
