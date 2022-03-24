import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';
import { Avatar, TAvatarProps } from '../../components/avatar/avatar';
import { GoBackButtonPanel } from '../../components/goBackButtonPanel/goBackButtonPanel';
import { Button, TButtonProps } from '../../components/button/button';
import { Input, TInputProps } from '../../components/input/input';
import { getProfileEditData, TGetProfileEditData } from './data';
import { Modal } from '../../components/modal/modal';
import { TStore } from '../../modules/store/store';
import { connect } from '../../modules/store/connect';
import { ProfileController } from '../../controllers/ProfileController';


export type TProfileEditPageProps = {
  avatar: TAvatarProps,
  inputs: TInputProps[],
  button: TButtonProps,
  avatarToUpload: File | null,
}

class ProfileEditPageClass extends Block {
  render() {
    const {
      avatar,
      inputs,
      button,
    } = this.props as TProfileEditPageProps;

    this._children.avatar = new Avatar(avatar);
    this._children.button = new Button(button);
    this._children.inputs = inputs.map((item: TInputProps) => new Input(item));
    this._children.GoBackButtonPanel = new GoBackButtonPanel();

    this._children.avatarUploadModal = new Modal({
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
        submit: async(e: InputEvent, onClose: () => void) => {
          e.preventDefault();
          const formData = new FormData();

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const inputElement = e.target && e.target[0] as HTMLInputElement;

          if(!inputElement) {
            return;
          }

          const file = inputElement.files ? inputElement.files[0] : null;

          formData.append('avatar', file as Blob);
          await ProfileController.changeAvatar(formData);
          onClose();
        },
      },
    });

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
    data: userData,
    error,
  } = state.user;

  return {
    ...getProfileEditData(userData as TGetProfileEditData),
    error,
  };
};

export const ProfileEditPage = connect(ProfileEditPageClass, mapStateToProps);
