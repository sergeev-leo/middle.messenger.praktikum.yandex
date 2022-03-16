import { Block } from '../../modules/Block/Block';
import { TStore } from '../../modules/store/store';
import { connect } from '../../modules/store/connect';
import compileTemplate from './selectedDialogMeta.pug';
import { Avatar } from '../avatar/avatar';


class SelectedDialogMetaClass extends Block {

  render() {
    const {
      avatar,
      title,
      selectedChatId,
    } = this.props;

    if(selectedChatId) {
      this._children.avatar = new Avatar({ src: avatar });
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
