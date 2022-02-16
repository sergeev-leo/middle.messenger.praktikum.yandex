import { Block } from "../../modules/Block/Block";
import { TComponentProps } from "../../modules/types";
import compileTemplate from './button.pug';


export class Button extends Block {
  constructor(props: TComponentProps) {
    super("div", props);
  }

  render() {
    return this.compile(compileTemplate, this.props);
  }
}
