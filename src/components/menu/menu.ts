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
  constructor(props: TMenuProps) {
    super('div', props);

  }

  render() {
    const {
      data,
      iconButton,
      position,
    } = this.props as TMenuProps;

    //------------------------------------------------------------------
    this._children.iconButton = new IconButton(iconButton);
    data.forEach(({ id, text, iconButton, events }, index) => {
      const key = ['menuItem', index].join('_');

      this._children[key] = new MenuItem({ id, text, iconButton, events });
    });
    //------------------------------------------------------------------

    return this.compile(
      compileTemplate,
      {
        ...this._children,
        position,
        data,
      },
    );
  }
}
