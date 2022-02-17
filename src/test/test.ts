import { Block } from '../modules/Block/Block';
import profileTemplate from './template.pug';


export class UserProfile extends Block {

  render() {
    return this.compile(profileTemplate, { userName: this.props.userName, button: this.props.button });
  }
}
