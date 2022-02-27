import { TComponent, TComponentProps, TEvents } from '../../modules/types';
import { Block } from '../../modules/Block/Block';
import compileTemplate from '../modal/modal.pug';
import { Button, TButtonProps } from '../button/button';
import { IconButton } from '../icon-button/icon-button';

export type TModalProps = {
  id: string,
  title: string,
  contentComponent: TComponent,
  contentComponentProps: TComponentProps,
  button: TButtonProps,
  events?: TEvents,
};

export class Modal extends Block {
  constructor(props: TModalProps) {
    super({
      ...props,
      events: {
        ...props.events,
        submit: (e: FormDataEvent) => {
          const onClose = () => document.querySelector(`#${props.id}`)?.classList.add('closed');
          props.events?.submit(e, onClose);
        },
      },
    });
  }

  initChildren() {
    const {
      contentComponent,
      contentComponentProps,
      button,
    } = this.props as TModalProps;

    this._children.closeButton = new IconButton({
      style: 'secondary',
      iconClassName: 'fa-close',
      events: {
        click: () => document.querySelector(`#${this.props.id}`)?.classList.add('closed'),
      },
    });
    this._children.button = new Button(button);
    this._children.contentComponent = new contentComponent(contentComponentProps);
  }

  render() {
    return this.compile(compileTemplate, this.props);
  }
}
