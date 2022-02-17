export type TCallback = (...args: unknown[]) => void;

export type TEvents = Record <string, TCallback>;

export type TComponentProps = Record<string, unknown>;

export type TListeners = Record<string, TCallback[]>;

export type TEventBusInstance = {
  on: (s: string, cb: TCallback) => void,
  off: (s: string, cb: TCallback) => void,
  emit: (e: string, ...args: unknown[]) => void,
};
