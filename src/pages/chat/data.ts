import { ROUTES } from '../../modules/Router/constants';
import { Router } from '../../modules/Router/Router';


export const chatData = {
  profileLink: {
    title: 'Профиль',
    events: {
      click: () => Router.go(ROUTES.PROFILE),
    },
  },
  searchInputPlaceholder: 'Поиск',
  searchInput: {
    id: 'search',
    type: 'search',
    events: {
      keyup: (e: InputEvent) => {
        const { value } = e.target as HTMLInputElement;

        // eslint-disable-next-line no-console
        return console.log(`поиск ${value}`);
      },
    },
  },
  reviewingDialogUser: {
    avatar: {
      src: null,
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
        id: 'chat-menu-0',
        text: 'Создать чат',
        iconButton: {
          outerIconClassName:'fa-circle-thin',
          iconClassName: 'fa-plus',
        },
        events: {
          click: () => {
            const modal = document.querySelector('#create-chat-modal');
            modal?.classList.remove('closed');
          },
        },
      },
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
          // eslint-disable-next-line no-console
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
          // eslint-disable-next-line no-console
          click: ()  => console.log('локация'),
        },
      },
    ],
  },
  sendIcon: {
    outerIconClassName: 'fa-circle',
    iconClassName: 'fa-arrow-right',
  },
  messagesPanelInfoText: 'Выберите чат чтобы отправить сообщение',
  messageInput: {
    id: 'message',
    placeholder: 'Сообщение',
  },
};
