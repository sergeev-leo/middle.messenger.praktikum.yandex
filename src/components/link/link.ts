import { Block } from "../../modules/Block/Block";
import compileTemplate from './link.pug';


type TLinkProps = {
  style: string,
  title: string,
  href: string,
};

export class Link extends Block {
  constructor(props: TLinkProps) {
    super("span", props);
  }

  render() {
    return this.compile(compileTemplate, this.props);
  }
}
