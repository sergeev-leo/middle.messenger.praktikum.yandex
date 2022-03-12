import { set } from '../../utils/set';
import { TStore } from '../types';
import { EventBus } from '../EventBus/EventBus';


export enum StoreEvents {
  Updated = 'updated',
}


const INITIAL_STORE_VALUE = {
  user: null,
};

class Store extends EventBus {
  private state: TStore;

  constructor(initialValue: TStore) {
    super();
    this.state = initialValue;
  }

  public getState() {
    console.log('getState', this.state)
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    console.log('setState', this.state);

    this.emit(StoreEvents.Updated);
  }
}

export const store = new Store(INITIAL_STORE_VALUE);
