import { TComponent } from './types';


export const render = (query: string, block: TComponent) => {
  // eslint-disable-next-line no-undef
  const root = document.querySelector(query);

  if(!root) {
    return null;
  }
  root.innerHTML = '';
  root.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
};
