import { Block } from "../../modules/Block/Block";
import compileTemplate from './message.pug';
import {TEvents} from "../../modules/types";


export type TMessageProps = {
  currentUserMessage: boolean,
  status: string,
  text: string,
  time: string,
  events?: TEvents,
};

export class Message extends Block {
  constructor(props: TMessageProps) {
    super("div", props);
  }

  render() {
    return this.compile(compileTemplate, this.props);
  }
}
