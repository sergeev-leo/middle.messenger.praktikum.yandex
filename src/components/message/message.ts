import { Block } from "../../modules/Block/Block";
import compileTemplate from './message.pug';


export type TMessageProps = {
  currentUserMessage: boolean,
  status: string,
  text: string,
  time: string,
};

export class Message extends Block {
  constructor(props: TMessageProps) {
    super("div", props);
  }

  render() {
    return this.compile(compileTemplate, this.props);
  }
}
