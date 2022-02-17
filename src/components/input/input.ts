import { Block } from "../../modules/Block/Block";
import compileTemplate from './input.pug';
import {TEvents} from "../../modules/types";


export type TInputProps = {
  id: string,
  type?: string,
  label: string,
  error?: string,
  events?: TEvents,
};

export class Input extends Block {
  constructor(props: TInputProps) {
    super("div", props);
  }

  render() {
    return this.compile(compileTemplate, this.props);
  }
}
