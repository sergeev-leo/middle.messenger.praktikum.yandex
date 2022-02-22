import { Block } from '../../modules/Block/Block';
import compileTemplate from './goBackButtonPanel.pug';
import { IconButton } from '../icon-button/icon-button';
import { TEvents } from '../../modules/types';


export type TGoBackButtonPanelProps = {
  events?: TEvents,
};

export class GoBackButtonPanel extends Block {
  initChildren() {
    this._children.iconButton = new IconButton({
      outerIconClassName: 'fa-circle',
      iconClassName: 'inner fa-arrow-left',
    });
  }

  render() {
    return this.compile(compileTemplate, { ...this.props });
  }
}
