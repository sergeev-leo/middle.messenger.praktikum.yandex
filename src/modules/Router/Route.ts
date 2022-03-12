import { render } from '../renderDOM';
import { TComponent } from '../types';
import { isEqual } from '../../utils/isEqual';


export interface TRoute  {
  navigate: (p:string) => void;
  leave: () => void;
  match: (p:string) => boolean;
  render: () => void;
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

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return String(pathname) === String(this._pathname);
  }

  render() {
    this._block = new this._blockClass();
    render(this._props.rootQuery, this._block);
    return;
  }
}
