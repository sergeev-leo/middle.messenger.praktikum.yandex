import { Block } from '../../modules/Block/Block';
import { TStore } from '../../modules/store/store';
import { connect } from '../../modules/store/connect';
import compileTemplate from './selectedDialogMeta.pug';
import { Avatar } from '../avatar/avatar';
import { Modal } from '../modal/modal';
import { Input } from '../input/input';
import { ChatController } from '../../controllers/ChatController';


class SelectedDialogMetaClass extends Block {

  render() {
    const {
      avatar,
      title,
      selectedChatId,
    } = this.props;

    if(selectedChatId) {
      this._children.avatar = new Avatar({
        src: avatar,
        title: 'Выбрать аватар',
        withUpload: true,
        events: {
          click: ()  => {
            const modal = document.querySelector('#avatar-upload-modal');
            modal?.classList.remove('closed');
          },
        },
      });

      this._children.avatarUploadModal = new Modal({
        id: 'avatar-upload-modal',
        title: 'аватар для чата',
        contentComponent: Input,
        contentComponentProps: {
          id: 'avatar-upload-input',
          type: 'file',
          label: 'Выберите файл',
          events: {
            change: function(e: InputEvent) {
              const inputElement = e.target as HTMLInputElement;

              if(!inputElement) {
                return;
              }

              const fileChosen = document.querySelector('#avatar-upload-modal .file-chosen');

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
          submit: async(e: InputEvent, onClose: () => void) => {
            e.preventDefault();

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const inputElement = e.target && e.target[0] as HTMLInputElement;

            if(!inputElement) {
              return;
            }


            const file = inputElement.files ? inputElement.files[0] : null;

            const formData = new FormData();
            formData.append('avatar', file as Blob);
            formData.append('chatId', String(selectedChatId));

            await ChatController.changeAvatar(formData);
            onClose();
          },
        },
      });
    }

    return this.compile(
      compileTemplate,
      {
        ...this._children,
        title,
      },
    );
  }
}

const mapStateToProps = (state: TStore) => {
  const {
    selectedChatId,
    dialogs,
  } = state.chat;

  if(!selectedChatId) {
    return {
      avatar: null,
      userName: '',
    };
  }

  const dialog = dialogs.find(({ id }) => id === selectedChatId);

  if(!dialog) {
    return {
      avatar: null,
      userName: '',
    };
  }

  const {
    title,
    avatar,
  } = dialog;

  return {
    title,
    avatar,
    selectedChatId,
  };
};

export const SelectedDialogMeta = connect(SelectedDialogMetaClass, mapStateToProps);
