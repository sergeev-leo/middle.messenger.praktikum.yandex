import { set } from '../../utils/set';
import { EventBus } from '../EventBus/EventBus';
import { TChatDialog } from '../api/chatAPI';


export enum StoreEvents {
  Updated = 'updated',
}

export type TChatMessage = {
  id: number | string,
  content: string,
  is_read: boolean,
  time: string,
  user_id: number | string,
};

const INITIAL_STORE_VALUE = {
  user: {
    data: null,
    error: null,
  },
  chat: {
    dialogFilter: '',
    selectedChatId: null,
    dialogs: [],
    messages: {},
    error: null,
  },
};

export type TUserStore = {
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
};

export type TChatStore = {
  dialogFilter: string,
  selectedChatId: number | null,
  dialogs: TChatDialog[] | [],
  messages: Record<number | string, TChatMessage[]>,
  error: null,
};

export type TStore = {
  user: TUserStore,
  chat: TChatStore,
};

class Store extends EventBus {
  private state: TStore;

  constructor(initialValue: TStore) {
    super();
    this.state = { ...initialValue };
  }

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }
}

export const store = new Store(INITIAL_STORE_VALUE);
