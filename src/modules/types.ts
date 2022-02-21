export type TCallback = (...args: unknown[]) => void;

export type TEvents = Record <string, TCallback>;

export type TComponentProps = any;

export type TListeners = Record<string, TCallback[]>;

export type TEventBusInstance = {
  on: (s: string, cb: TCallback) => void,
  off: (s: string, cb: TCallback) => void,
  emit: (e: string, ...args: unknown[]) => void,
};
