import { Block } from "../../modules/Block/Block";
import compileTemplate from './menu.pug';
import {IconButton, TIconButtonProps} from "../icon-button/icon-button";
import {TEvents} from "../../modules/types";


type TMenuItem = {
  id: string,
  text: string,
  icon: TIconButtonProps,
}

export type TMenuProps = {
  iconButton: TIconButtonProps,
  position?: string,
  data: TMenuItem[],
  events?: TEvents,
};

export class Menu extends Block {
  constructor(props: TMenuProps) {
    super("div", props);

  }

  render() {
    const {
      data,
      iconButton,
    } = this.props as TMenuProps;

    //------------------------------------------------------------------
    this._children.iconButton = new IconButton(iconButton);
    data.forEach(({ icon }, index) => {
      const key = ['menuButton', index].join('_');

      this._children[key] = new IconButton(icon);
    });
    //------------------------------------------------------------------

    return this.compile(
      compileTemplate,
      {
        iconButton: this._children.iconButton,
        data: data.map((item, index) => {
          const iconId = ['menuButton', index].join('_');

          return {
            ...item,
            icon: this._children[iconId],
          };
        }),
      },
    );
  }
}
