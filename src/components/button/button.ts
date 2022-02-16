import { Block } from "../../modules/Block/Block";
import { TComponentProps } from "../../modules/types";
import compileTemplate from './button.pug';


export class Button extends Block {
  constructor(props: TComponentProps) {
    super("div", props);
  }

  render() {
    const { _id } = this.props;
    console.log(_id);

    return compileTemplate(this.props);
  }
}
