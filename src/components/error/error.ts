import { Block } from '../../modules/Block/Block';
import compileTemplate from './error.pug';
import { Link, TLinkProps } from '../link/link';
import { TEvents } from '../../modules/types';


export type TErrorProps = {
  errorCode: string | number,
  errorText: string,
  link: TLinkProps,
  events?: TEvents,
};

export class ErrorPage extends Block {
  constructor(props: TErrorProps) {
    super('div', props);
  }

  render() {
    const { link } = this.props as TErrorProps;

    //------------------------------------------------------------------
    this._children.link = new Link(link);
    //------------------------------------------------------------------

    return this.compile(compileTemplate, { ...this.props, link: this._children.link });
  }
}
