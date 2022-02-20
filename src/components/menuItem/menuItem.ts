import { Block } from '../../modules/Block/Block';
import compileTemplate from '../menuItem/menuItem.pug';
import { IconButton, TIconButtonProps } from '../icon-button/icon-button';
import { TEvents } from '../../modules/types';


export type TMenuItemProps = {
  id: string,
  text: string,
  iconButton: TIconButtonProps,
  events?: TEvents,
}

export class MenuItem extends Block {
  constructor(props: TMenuItemProps) {
    super('span', props);
  }

  render() {
    const {
      text,
      id,
      iconButton,
    } = this.props as TMenuItemProps;

    //------------------------------------------------------------------
    this._children.iconButton = new IconButton(iconButton);
    //------------------------------------------------------------------

    return this.compile(
      compileTemplate,
      {
        id,
        text,
        iconButton: this._children.iconButton,
      },
    );
  }
}
