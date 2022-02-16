import { TCallback, TListeners } from "../types";


export class EventBus {
  readonly listeners: TListeners;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: TCallback) {
    if(!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: TCallback) {
    if(!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter(eventHandler => eventHandler !== callback);
  }

  emit(event: string, ...args: never[]) {
    if(!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event]
      .forEach((eventHandler: TCallback) => eventHandler(...args))
  }
}
