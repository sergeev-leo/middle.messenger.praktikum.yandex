export const render = (query: string, block: any) => {
  // eslint-disable-next-line no-undef
  const root = document.querySelector(query);

  if(!root) {
    return null;
  }

  root.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
};
