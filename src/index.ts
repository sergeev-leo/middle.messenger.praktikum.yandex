import { Button } from "./components/button/button";
import { render } from "./modules/renderDOM";


const button = new Button({
  style: 'error',
  title: 'prettyAwesome',
  type: 'submit',
  events: {
    click: (e: Event) => console.log('click1!', e),
  }
});

const button2 = new Button({
  style: 'error',
  title: 'prettyAwesome',
  type: 'submit',
  withInternalID: true,
  events: {
    click: (e: Event) => console.log('click1!', e),
  }
});

render("#app", button);
render("#app", button2);

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

