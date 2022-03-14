import { set } from '../../utils/set';
import { EventBus } from '../EventBus/EventBus';
import { TChatResponseData } from '../api/chatAPI';


export enum StoreEvents {
  Updated = 'updated',
}


const INITIAL_STORE_VALUE = {
  user: {
    data: null,
    error: null,
  },
  chat: {
    dialogs: [],
    error: null,
  },
};

export type TStore = {
  user: {
    data: {
      id: number | string,
      login: string,
      email: string,
      phone: string,
      firstName: string,
      secondName: string,
      displayName?: string,
      avatar?: string,
    } | null,
    error: string | null,
  },
  chat: {
    dialogs: TChatResponseData[] | [],
  },
};

class Store extends EventBus {
  private state: TStore;

  constructor(initialValue: TStore) {
    super();
    this.state = initialValue;
  }

  public getState() {
    console.log('getState', this.state);
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    console.log('setState', this.state);

    this.emit(StoreEvents.Updated);
  }
}

export const store = new Store(INITIAL_STORE_VALUE);
