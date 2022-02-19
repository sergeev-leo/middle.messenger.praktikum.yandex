import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';
import { ErrorPage } from '../../components/error/error';


const data = {
  errorCode: '404',
  errorText: 'Не туда попали',
  link: {
    style: 'primary',
    title: 'Назад к чатам',
    href: '../pages/chat.pug',
  },
};

export class Error404Page extends Block {
  render() {
    this._children.error = new ErrorPage(data);

    return this.compile(
      compileTemplate,
      {
        ...this._children,
      },
    );
  }
}
