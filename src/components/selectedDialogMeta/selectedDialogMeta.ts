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
              if(!e.target) {
                return;
              }

              const fileChosen = document.querySelector('#avatar-upload-modal .file-chosen');

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
          submit: async(e: InputEvent, onClose: () => void) => {
            e.preventDefault();

            const formData = new FormData();
            formData.append('avatar', e.target[0].files[0]);
            formData.append('chatId', selectedChatId);

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
