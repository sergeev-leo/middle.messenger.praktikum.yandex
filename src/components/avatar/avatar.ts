import { Block } from "../../modules/Block/Block";
import compileTemplate from './avatar.pug';
import {TEvents} from "../../modules/types";


export type TAvatarProps = {
  src: string,
  withUpload: boolean,
  title: string,
  events?: TEvents,
};

export class Avatar extends Block {
  constructor(props: TAvatarProps) {
    super("div", props);
  }

  render() {
    return this.compile(compileTemplate, this.props);
  }
}
