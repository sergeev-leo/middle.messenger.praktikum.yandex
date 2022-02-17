import { Block } from "../../modules/Block/Block";
import compileTemplate from './error.pug';
import {Link, TLinkProps} from "../link/link";


export type TErrorProps = {
  errorCode: string | number,
  errorText: string,
  link: TLinkProps,
};

export class ErrorPage extends Block {
  constructor(props: TErrorProps) {
    super("div", props);

    this._children.link = new Link(props.link);
  }

  render() {
    console.log(this.props)
    return this.compile(compileTemplate, { ...this.props, link: this._children.link });
  }
}
