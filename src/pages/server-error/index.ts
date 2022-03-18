import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';
import { ErrorPage } from '../../components/error/error';
import { serverErrorData } from './data';


export class ServerError extends Block {
  initChildren() {
    this._children.error = new ErrorPage(serverErrorData);
  }

  render() {
    return this.compile(
      compileTemplate,
      { ...this._children },
    );
  }
}
