import { TComponent, TComponentProps, TEvents } from '../../modules/types';
import { Block } from '../../modules/Block/Block';
import compileTemplate from '../modal/modal.pug';
import { Button, TButtonProps } from '../button/button';

export type TModalProps = {
  title: string,
  error?: string,
  contentComponent: TComponent,
  contentComponentProps: TComponentProps,
  button: TButtonProps,
  events?: TEvents,
};

export class Modal extends Block {
  initChildren() {
    const {
      contentComponent,
      contentComponentProps,
      button,
    } = this.props as TModalProps;

    this._children.button = new Button(button);
    this._children.contentComponent = new contentComponent(contentComponentProps);
  }

  render() {
    return this.compile(compileTemplate, this.props);
  }
}
