import { Block } from '../../modules/Block/Block';
import compileTemplate from './button.pug';
import { TEvents } from '../../modules/types';


export type TButtonProps = {
  style: string,
  type: string,
  title: string,
  events?: TEvents,
};

export class Button extends Block {
  render() {
    return this.compile(compileTemplate, this.props);
  }
}
