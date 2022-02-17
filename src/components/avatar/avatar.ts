import { Block } from "../../modules/Block/Block";
import compileTemplate from './avatar.pug';


type TAvatarProps = {
  src: string,
  withUpload: boolean,
  title: string,
};

export class Avatar extends Block {
  constructor(props: TAvatarProps) {
    super("div", props);
  }

  render() {
    return this.compile(compileTemplate, this.props);
  }
}
