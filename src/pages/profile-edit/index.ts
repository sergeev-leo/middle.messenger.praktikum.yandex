import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';
import { Avatar, TAvatarProps } from '../../components/avatar/avatar';
import { GoBackButtonPanel } from '../../components/goBackButtonPanel/goBackButtonPanel';
import { Button, TButtonProps } from '../../components/button/button';
import { Input, TInputProps } from '../../components/input/input';
import { profileEditData } from './data';
import { Modal } from '../../components/modal/modal';
import { createSubmitFn } from '../../modules/formValidation';


export type TProfileEditPageProps = {
  avatar: TAvatarProps,
  inputs: TInputProps[],
  button: TButtonProps,
}

export class ProfileEditPage extends Block {
  constructor() {
    super(profileEditData);
  }

  initChildren() {
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
            () => console.log('avatarChangeCb'),
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
        ...this._children,
      },
    );
  }
}
