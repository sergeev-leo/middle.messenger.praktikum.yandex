import { createSubmitFn, VALIDATION_PATTERNS } from '../../modules/formValidation';

export const chatData = {
  profileLink: {
    title: 'Профиль',
    href: '../profile/index.html',
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
          click: ()  => {
            const modal = document.querySelector('#media-upload-modal');
            modal?.classList.remove('closed');
          },
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
      click: (e: InputEvent) => {
        const messageInput = document.getElementById('message');

        if(!messageInput?.validity.valid) {
          return;
        }

        return createSubmitFn('.chat__bottom-panel')(e);
      },
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
