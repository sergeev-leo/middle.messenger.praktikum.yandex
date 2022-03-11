import { set } from '../../utils/set';
import { TStore } from '../types';
import { EventBus } from '../EventBus/EventBus';


export enum StoreEvents {
  Updated = 'updated',
}


const INITIAL_STORE_VALUE = {
  user: {
    id: 1,
    login: 'login',
    phone: '123456789',
    email: '123@gmail.com',
    firstName: 'a',
    secondName: 'b',
    displayName: 'c',
    avatar: '/user.png',
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
