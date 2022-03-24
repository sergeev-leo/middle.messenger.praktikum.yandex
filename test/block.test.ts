import { Block } from '../src/modules/Block/Block';


describe('модуль Block', () => {
  it('срабатывает getContent при вызове hide', () => {
    const Component = new Block({
      events: {},
    });

    const didMount = jest.spOn(Component, 'getContent');

    Component.hide();

    expect(didMount).toHaveBeenCalled();
  });

});
