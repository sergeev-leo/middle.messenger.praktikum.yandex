import { TComponent } from '../types';
import { Route, TRoute } from './Route';
import { ROUTES } from './constants';


export class RouterClass {
  static __instance?: RouterClass;
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
    });

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if(
      localStorage.getItem('isUserLoggedIn') !== 'true' &&
      route._pathname !== ROUTES.LOGIN &&
      route._pathname !== ROUTES.REGISTER
    ) {
      return this.go(ROUTES.LOGIN);
    }

    if (this._currentRoute) {
      if(this._currentRoute._pathname === route._pathname) {
        return;
      }

      this._currentRoute.leave();
    }

    route.render();
    this._currentRoute = route;
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
