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


render("#app", button);

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

