import { EventBus } from '../EventBus/EventBus';
import {TCallback, TComponentProps, TEventBusInstance, TListeners} from "../types";


type TMeta = {
  tagName: string,
  props: TComponentProps,
};

export class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  _element: HTMLElement;
  _meta: TMeta;

  listeners: TListeners;
  eventBus: () => TEventBusInstance;

  props: TComponentProps;

  constructor(tagName = "div", props: TComponentProps = {}) {
    const eventBus = new EventBus();

    /*
    * сохраняем данные о теге и пропсах компонента
    * */
    this._meta = {
      tagName,
      props
    };

    /*
    * формируем объект listeners для хранения массивов обработчиков событий создаваемого компонента в разрезе событий
    * */
    this.listeners = {};

    /*
    * расширяем логику работы с пропсами компонента
    * */
    this.props = this._makePropsProxy(props);

    /*
    * сохраняем eventBus в замыкании, чтобы каждый компонент работал со своим экземпляром
    * */
    this.eventBus = () => eventBus;

    /*
    * подключаем обработку событий жизненного цикла для созданного компонента
    * */
    this._registerEvents(eventBus);

    /*
    * запускаем жизненный цикл
    * */
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: TEventBusInstance) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _addEvents() {
    const {
      events = {} as Record <string, TCallback>,
    } = this.props;

    Object
      .keys(events)
      .forEach(eventName => {
        if(!this.listeners[eventName]) {
          this.listeners[eventName] = [];
        }

        /*
        * сохраняем обработчики событий чтобы была возможность их позже удалить
        * */
        this.listeners[eventName].push(events[eventName]);

        /*
        * добавляем обработчики на созданный элемент
        * */
        this._element.addEventListener(eventName, events[eventName]);
      });
  }

  _removeEvents() {
    Object
      .keys(this.listeners)
      .forEach(eventName => {
        const handlersArray = this.listeners[eventName];

        handlersArray.forEach(handler => this._element.removeEventListener(eventName, handler));
      });
  }

  _componentDidMount() {
    this.componentDidMount(this.props);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  componentDidMount(oldProps: TComponentProps) {
    console.log('componentDidMount', oldProps);
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: TComponentProps, newProps: TComponentProps) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if(response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: TComponentProps, newProps: TComponentProps) {
    console.log('componentDidUpdate', oldProps, newProps);
    return true;
  }

  setProps = (nextProps: TComponentProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  _render() {
    console.log('render', this.props);
    const block = this.render();

    this._removeEvents();

    this._element.innerHTML = block;

    this._addEvents();
  }

  render(): string { return '' }

  getContent() {
    return this.element;
  }

  get element() {
    return this._element;
  }

  _makePropsProxy(props: TComponentProps) {
    return new Proxy(
      props,
      {
        get(target, prop: string) {
          const value = target[prop];
          return typeof value === "function" ?
            value.bind(target) :
            value;
        },
        set: (target, prop: string, value: any) => {
          target[prop] = value;

          console.log('propsChanged');

          this.eventBus().emit(Block.EVENTS.FLOW_CDU, [{...target}]);

          return true;
        },
        deleteProperty() {
          throw new Error('нет доступа')
        },
      },
    );
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}
