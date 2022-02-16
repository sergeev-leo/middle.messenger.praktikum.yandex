import { Button } from "./components/button/button";
import { render } from "./modules/renderDOM";
import { UserProfile } from "./test/test";

//-------------------------------------------------------------------
const button = new Button({
  style: 'error',
  title: 'prettyAwesome',
  type: 'submit',
  events: {
    click: (e: Event) => console.log('click1!', e),
  }
});
setTimeout(() => {
  button.setProps({
    style: 'primary',
    title: 'Awesome',
    type: 'submit',
    events: {
      click: (e: Event) => console.log('click2!', e),
    },
  });
}, 10000);

render("#app", button);
//-------------------------------------------------------------------

//-------------------------------------------------------------------
const profileButton = new Button({
  style: 'error',
  title: 'Кнопка А',
  type: 'submit',
  withInternalID: true,
  events: {
    click: (e: Event) => console.log('click1!', e),
  }
});

const profile = new UserProfile(
  'div',
  {
    userName: 'userName',
    button: profileButton,
  },
);

setTimeout(() => {
  // Обновляем кнопку
  profileButton.setProps({ title: 'Кнопка Б' });
}, 5000);

render("#app", profile);
//-------------------------------------------------------------------


