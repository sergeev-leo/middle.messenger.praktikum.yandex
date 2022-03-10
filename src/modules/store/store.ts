import { set } from '../../utils/set';
import { TStore } from '../types';
import { EventBus } from '../EventBus/EventBus';


export enum StoreEvents {
  Updated = 'updated',
}


const INITIAL_STORE_VALUE = {
  user: {
    id: 1,
    login: 'asdf',
    phone: '123134524',
    email: 'sdfsd@gmail.com',
    firstName: "sdfsdf",
    secondName: 'sdf435245',
    displayName: 'sf34236t',
    avatar: 'sdf436',
  },
};

class Store extends EventBus {
  private state: TStore = INITIAL_STORE_VALUE;

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }
}

export const store = new Store();
