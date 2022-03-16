import { RouterClass } from '../modules/Router/Router';

class TestRouteComponent {
  render() {
    //comment to prevent ts warning
  }
  hide() {
    //comment to prevent ts warning
  }
}

const Router = new RouterClass('#app');

Router
  .use('/', TestRouteComponent)
  .use('/messenger', TestRouteComponent)
  .use('/profile', TestRouteComponent)
  .start();

describe('модуль Router', () => {
  it('при переходе аутентифицированного пользователя на страницу чата в location должно быть /messenger', () => {

    localStorage.setItem('isUserLoggedIn', 'true');

    Router.go('/messenger');

    expect(window.location.pathname).toEqual('/messenger');
  });

  it('при переходе НЕаутентифицированного пользователя на страницу чата в location должно быть /', () => {

    localStorage.setItem('isUserLoggedIn', 'false');

    Router.go('/messenger');

    expect(window.location.pathname).toEqual('/');
  });

  it('при переходе аутентифицированного пользователя на страницу чата, далее в профиль, в location должно быть /profile', () => {

    localStorage.setItem('isUserLoggedIn', 'true');

    Router.go('/messenger');
    expect(window.location.pathname).toEqual('/messenger');

    Router.go('/profile');
    expect(window.location.pathname).toEqual('/profile');
  });

  it('при переходе аутентифицированного пользователя на страницу чата, сброса авторизации (к примеру истекли куки) и ' +
    'последующего перехода в профиль, в location должно быть /', () => {

    localStorage.setItem('isUserLoggedIn', 'true');

    Router.go('/messenger');
    expect(window.location.pathname).toEqual('/messenger');


    localStorage.setItem('isUserLoggedIn', 'false');

    Router.go('/profile');
    expect(window.location.pathname).toEqual('/');
  });
});
