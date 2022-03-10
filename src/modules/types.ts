export type TCallback = (...args: unknown[]) => void;

export type TEvents = Record <string, TCallback>;

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TComponent = any;
export type TComponentChildren = Record<string, TComponent | TComponent[]>;
export type TIndexed = Record <string, unknown>;
export type TComponentProps = Record <string, unknown>;

export type TListeners = Record<string, TCallback[]>;

export type TEventBusInstance = {
  on: (s: string, cb: TCallback) => void,
  off: (s: string, cb: TCallback) => void,
  emit: (e: string, ...args: unknown[]) => void,
};

export type TFormDataObject = Record<string, FormDataEntryValue>;


export type TStore = {
  user?: {
    id: number | string,
    login: string,
    email: string,
    phone: string,
    firstName: string,
    secondName: string,
    displayName: string,
    avatar: string,
  },
};
