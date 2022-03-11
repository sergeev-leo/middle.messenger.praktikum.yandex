import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';
import { Avatar, TAvatarProps } from '../../components/avatar/avatar';
import { Link, TLinkProps } from '../../components/link/link';
import { GoBackButtonPanel } from '../../components/goBackButtonPanel/goBackButtonPanel';
import { getProfileData } from './data';
import { connect } from '../../modules/store/connect';
import { TStore } from '../../modules/types';
import { store } from "../../modules/store/store";


type TUserDataRow = {
  id: string,
  label: string,
  value: string,
};

export type TProfilePageProps = {
  avatar: TAvatarProps,
  userName: string,
  links: TLinkProps[],
  userData: TUserDataRow[],
}

class ProfilePageClass extends Block {
  constructor(props) {
    super(props);

    setTimeout(
      () => {
        //store.set('user.login', 'bbbbbbb'); // - эта строка не работает как ожидается

        // такое обновление отрабатывает корректно
        this.setProps({
          login: 'aaaaaaaa',
        });
      },
      3000,
    );
  }

  render() {
    const {
      avatar,
      userName,
      links,
      userData,
    } = getProfileData(this.props) as TProfilePageProps;

    this._children.avatar = new Avatar(avatar);
    this._children.links = links.map((item: TLinkProps) => new Link(item));
    this._children.GoBackButtonPanel = new GoBackButtonPanel();

    return this.compile(
      compileTemplate,
      {
        userName,
        userData,
        ...this._children,
      },
    );
  }
}

const mapStateToProps = (state: TStore) => {
  const userData = state.user;

  return {
    id: userData?.id,
    login: userData?.login,
    email: userData?.email,
    phone: userData?.phone,
    firstName: userData?.firstName,
    secondName: userData?.secondName,
    displayName: userData?.displayName,
    avatar: userData?.avatar,
  };
};


export const ProfilePage = connect(ProfilePageClass, mapStateToProps);
