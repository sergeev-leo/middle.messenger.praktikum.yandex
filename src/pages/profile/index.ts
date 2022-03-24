import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';
import { Avatar } from '../../components/avatar/avatar';
import { Link, TLinkProps } from '../../components/link/link';
import { GoBackButtonPanel } from '../../components/goBackButtonPanel/goBackButtonPanel';
import { getProfileData, TProfilePageProps } from './data';
import { connect } from '../../modules/store/connect';
import { TStore } from '../../modules/store/store';


class ProfilePageClass extends Block {
  render() {
    const {
      avatar,
      userName,
      links,
      userData,
    } = getProfileData(this.props.data as Record<string, string> | null) as TProfilePageProps;

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

const mapStateToProps = (state: TStore) => state.user;


export const ProfilePage = connect(ProfilePageClass, mapStateToProps);
