import { TComponent } from '../types';
import { Route, TRoute } from './Route';


class RouterClass {
  static __instance?: any;
  routes: TRoute[];
  history: History;
  _currentRoute: TRoute | null;
  _rootQuery: string;

  constructor(rootQuery: string) {
    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    RouterClass.__instance = this;
  }

  use(pathname: string, block: TComponent) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = ((event: Event) => {
      const historyObjFromEvent = event.currentTarget as Window;

      this._onRoute(historyObjFromEvent.location?.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    console.log(this.history);
    console.log(window.location)
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string, params?: Record<string, unknown>, title = '') {
    this.history.pushState(params, title, pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }
}

export const Router = new RouterClass('#app');
