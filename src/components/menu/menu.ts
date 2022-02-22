import { Block } from '../../modules/Block/Block';
import compileTemplate from './menu.pug';
import { IconButton, TIconButtonProps } from '../icon-button/icon-button';
import { TEvents } from '../../modules/types';
import { MenuItem, TMenuItemProps } from '../menuItem/menuItem';



export type TMenuProps = {
  iconButton: TIconButtonProps,
  position?: string,
  data: TMenuItemProps[],
  events?: TEvents,
};

export class Menu extends Block {
  initChildren() {
    const {
      iconButton,
      data,
    } = this.props as TMenuProps;

    this._children.iconButton = new IconButton(iconButton);
    this._children.data = data.map(item => new MenuItem(item));
  }

  render() {
    const {
      position,
    } = this.props as TMenuProps;

    return this.compile(
      compileTemplate,
      {
        ...this._children,
        position,
      },
    );
  }
}
