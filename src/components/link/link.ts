import { Block } from '../../modules/Block/Block';
import compileTemplate from './link.pug';
import { TEvents } from '../../modules/types';


export type TLinkProps = {
  style: string,
  title: string,
  href: string,
  events?: TEvents,
};

export class Link extends Block {
  constructor(props: TLinkProps) {
    super('span', props);
  }

  render() {
    return this.compile(compileTemplate, this.props);
  }
}
