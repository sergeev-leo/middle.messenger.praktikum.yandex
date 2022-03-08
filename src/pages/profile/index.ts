import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';
import { Avatar, TAvatarProps } from '../../components/avatar/avatar';
import { Link, TLinkProps } from '../../components/link/link';
import { GoBackButtonPanel } from '../../components/goBackButtonPanel/goBackButtonPanel';
import { profileData } from './data';


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

export class ProfilePage extends Block {
  constructor() {
    super(profileData);
  }

  render() {
    const {
      avatar,
      userName,
      links,
      userData,
    } = this.props as TProfilePageProps;

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
