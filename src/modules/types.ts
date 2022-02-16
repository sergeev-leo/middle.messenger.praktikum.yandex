export type TCallback = (...args: any[]) => void;

export type TComponentProps = Record<string, any>;

export type TListeners = Record<string, TCallback[]>;

export type TEventBusInstance = {
  on: (s: string, cb: TCallback) => void,
  off: (s: string, cb: TCallback) => void,
  emit: (e: string, args?: any[]) => void,
};
