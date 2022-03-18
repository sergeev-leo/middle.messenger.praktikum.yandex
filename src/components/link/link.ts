import { Block } from '../../modules/Block/Block';
import compileTemplate from './link.pug';
import { TEvents } from '../../modules/types';


export type TLinkProps = {
  style?: string,
  title: string,
  events?: TEvents,
};

export class Link extends Block {
  constructor(props: TLinkProps) {
    const eventsFromProps = props.events || {};

    super({
      ...props,
      events: {
        ...eventsFromProps,
        click: (e: Event) => {
          e.preventDefault();

          if(typeof eventsFromProps.click === 'function') {
            eventsFromProps.click();
          }
        },
      },
    });
  }

  render() {
    return this.compile(compileTemplate, this.props);
  }
}
