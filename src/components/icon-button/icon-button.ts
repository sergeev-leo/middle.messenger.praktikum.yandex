import { Block } from "../../modules/Block/Block";
import compileTemplate from './icon-button.pug';


export type TIconButtonProps = {
  iconClassName: string,
  style?: string,
  outerIconClassName?: string,
};

export class IconButton extends Block {
  constructor(props: TIconButtonProps) {
    super("div", props);
  }

  render() {
    return this.compile(compileTemplate, this.props);
  }
}
