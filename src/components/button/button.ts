import { Block } from "../../modules/Block/Block";
import compileTemplate from './button.pug';


type TButtonProps = {
  style: string,
  type: string,
  title: string,
};

export class Button extends Block {
  constructor(props: TButtonProps) {
    super("div", props);
  }

  render() {
    return this.compile(compileTemplate, this.props);
  }
}
