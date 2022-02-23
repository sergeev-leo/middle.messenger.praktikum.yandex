import { Block } from '../../modules/Block/Block';
import compileTemplate from './input.pug';
import { TEvents } from '../../modules/types';


export type TInputProps = {
  id: string,
  type?: string,
  label: string,
  error?: string,
  pattern?: string,
  required?: boolean,
  placeholder?: string,
  events?: TEvents,
};

export class Input extends Block {
  constructor(props: TInputProps) {
    super({
      ...props,
      events: {
        ...props.events || {},
        focusout: (e: InputEvent) => this.validateInputValue(e),
        focusin: (e: InputEvent) => this.validateInputValue(e),
      },
    });
  }

  validateInputValue(e: InputEvent) {
    if(!e.target) {
      return;
    }

    const { validity } = e.target as HTMLInputElement;

    if (!validity.valid) {
      return this.element.classList.add('has-error');
    }
    return this.element.classList.remove('has-error');
  }

  render() {
    return this.compile(compileTemplate, this.props);
  }
}
