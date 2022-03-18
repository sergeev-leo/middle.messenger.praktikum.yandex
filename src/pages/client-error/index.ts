import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';
import { ErrorPage } from '../../components/error/error';
import { clientErrorData } from './data';


export class ClientError extends Block {
  initChildren() {
    this._children.error = new ErrorPage(clientErrorData);
  }

  render() {
    return this.compile(
      compileTemplate,
      {
        ...this._children,
      },
    );
  }
}
