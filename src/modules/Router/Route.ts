import { render } from '../renderDOM';
import { TComponent } from '../types';


export interface TRoute  {
  leave: () => void;
  match: (p:string) => boolean;
  render: () => void;
  _pathname: string;
}

type TRouteProps = {
  rootQuery: string,
}

export class Route implements TRoute {
  _pathname: string;
  _blockClass: TComponent;
  _block: TComponent;
  _props: TRouteProps;

  constructor(pathname: string, view: TComponent, props: TRouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  leave() {
    console.log('leave', this._block);
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return String(pathname.split('?')[0]) === String(this._pathname);
  }

  render() {
    this._block = new this._blockClass();
    console.log('render', this._block);
    render(this._props.rootQuery, this._block);
    return;
  }
}
