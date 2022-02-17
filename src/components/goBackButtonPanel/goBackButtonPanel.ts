import { Block } from "../../modules/Block/Block";
import compileTemplate from './goBackButtonPanel.pug';
import { IconButton } from "../icon-button/icon-button";


export type TGoBackButtonPanelProps = Record<string, unknown>;

export class GoBackButtonPanel extends Block {
  constructor(props: TGoBackButtonPanelProps) {
    super("div", props);
  }

  render() {

    //------------------------------------------------------------------
    this._children.iconButton = new IconButton({
      outerIconClassName: 'fa-circle',
      iconClassName: 'inner fa-arrow-left',
    });
    //------------------------------------------------------------------

    return this.compile(
      compileTemplate, {
        ...this.props,
        iconButton: this._children.iconButton,
      });
  }
}
