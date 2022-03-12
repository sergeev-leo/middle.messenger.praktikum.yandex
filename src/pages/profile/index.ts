import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';
import { Avatar } from '../../components/avatar/avatar';
import { Link, TLinkProps } from '../../components/link/link';
import { GoBackButtonPanel } from '../../components/goBackButtonPanel/goBackButtonPanel';
import { getProfileData, TProfilePageProps } from './data';
import { connect } from '../../modules/store/connect';
import { TStore } from '../../modules/types';
import { Button } from '../../components/button/button';


class ProfilePageClass extends Block {
  render() {
    const {
      avatar,
      userName,
      button,
      links,
      userData,
    } = getProfileData(this.props) as TProfilePageProps;

    this._children.button = new Button(button);
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
  };
};


export const ProfilePage = connect(ProfilePageClass, mapStateToProps);
