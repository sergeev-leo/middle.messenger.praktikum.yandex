import { Block } from "../../modules/Block/Block";
import compileTemplate from './input.pug';


type TInputProps = {
  id: string,
  type?: string,
  label: string,
  error?: string,
};

export class Input extends Block {
  constructor(props: TInputProps) {
    super("div", props);
  }

  render() {
    return this.compile(compileTemplate, this.props);
  }
}
