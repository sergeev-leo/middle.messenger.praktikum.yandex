import { Block } from '../../modules/Block/Block';
import compileTemplate from './index.pug';
import { ErrorPage } from '../../components/error/error';


const data = {
  errorCode: '500',
  errorText: 'Мы уже фиксим',
  link: {
    style: 'primary',
    title: 'Назад к чатам',
    href: '../pages/chat.pug',
  },
};

export class Error500Page extends Block {
  initChildren() {
    this._children.error = new ErrorPage(data);
  }

  render() {
    return this.compile(
      compileTemplate,
      { ...this._children },
    );
  }
}
