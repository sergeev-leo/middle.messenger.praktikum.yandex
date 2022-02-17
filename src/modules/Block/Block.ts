import { EventBus } from '../EventBus/EventBus';
import { TComponentProps, TEventBusInstance, TEvents, TListeners } from "../types";
import { v4 as makeUUID } from 'uuid';


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
  _listeners: TListeners;
  _id: string | null = null;
  _children: any;

  eventBus: () => TEventBusInstance;
  props: TComponentProps;

  constructor(tagName = "div", propsWithChildren: TComponentProps = {}) {
    /*
    * создаем экземпляр EventBus, с помощью которого будем реализовывать работу с событиями в пределах компонента
    * */
    const eventBus = new EventBus();

    /*
    * отфильтровываем в children дочерние компоненты из пропсов компонента
    * */
    const {
      children,
      props,
    } = this._getChildren(propsWithChildren);

    this._children = children;

    /*
    * сохраняем данные о теге и пропсах компонента
    * */
    this._meta = {
      tagName,
      props
    };

    /*
    * каждый компонент получает свой уникальный идентификатор UUID V4
    * */
    this._id = makeUUID();

    /*
    * формируем объект listeners для хранения массивов обработчиков событий создаваемого компонента в разрезе событий
    * */
    this._listeners = {};

    /*
    * расширяем логику работы с пропсами компонента + добавляем уникальный идентификатор
    * */
    this.props = this._makePropsProxy({
      ...props,
      _id: this._id,
    });

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

  /*
  * выделяем из переданных пропсов экземпляры класса Block и сохраняем их в this._children, оставшиеся пропсы - в props
  * */
  _getChildren(propsWithChildren: TComponentProps) {
    const children: TComponentProps = {};
    const props: TComponentProps = {};

    Object
      .keys(propsWithChildren)
      .forEach((key: string) => {
        const value = propsWithChildren[key];

        if(value instanceof Block) {
          children[key] = value;
        } else {
          props[key] = value;
        }
      });

    return {
      children,
      props,
    };
  }

  /*
  * метод вызывает формирование строки из шаблона с подставлением заглушек вместо элементов children
  * вместо children формируем заглушки в объекте с пропсами
  * */
  compile(
    template: (props: TComponentProps) => string,
    props: TComponentProps,
  ) : DocumentFragment {
    // делаем копию, чтобы не изменять оригинальный объект пропсов
    const propsCopy = { ...props };

    /*
    * добавляем заглушки с _id атрибутами для всех элементов из children в объект с пропсами
    * */
    const propsWithStubs = Object
      .keys(this._children)
      .reduce(
        (acc: TComponentProps, key: string) => {
          const child = this._children[key];

          acc[key] = `<div data-id="${child._id}">zaglushka</div>`;
          return acc;
        },
        propsCopy,
      );

    /*
    * создаем временный элемент-контейнер и добавляем туда содержимое шаблона с актуальными пропсами и заглушками
    * вместо children.
    * Используем именно template, т.к. корневым элементом для template является DocumentFragment, который удобно
    * использовать, когда нужно построить часть DOM-дерева вне страницы.
    * */
    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = template(propsWithStubs);

    /*
    * заменяем в созданном временном контейнере все заглушки на актуальные компоненты из children
    * */
    Object
      .keys(this._children)
      .forEach((key: string) => {
        const child = this._children[key]

        /*
        * ищем элемент-заглушку с необходимым идентификатором в контейнере и заменяем ее на реальный элемент из child
        * */
        const stubElement = fragment.content.querySelector(`[data-id="${child._id}"]`);

        /*
        * если элемент заглушка с таким идентификатором найден (хотя его отсутствие маловероятно) то заменяем его на
        * содержимое элемента child
        * */
        if(stubElement) {
          stubElement.replaceWith(child.getContent());
        }
      });

    return fragment.content;
  }

  /*
  * метод добавляет в eventBus обработчики для событий жизненного цикла компонента из Block.EVENTS
  * */
  _registerEvents(eventBus: TEventBusInstance) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  /*
  * обработчик, запускающий инициализацию компонента, триггер события в конструкторе.
  * - создает элемент тега компонента
  * - делает вызов события первоначальной отрисовки
  * */
  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  /*
  * инициация поля _element элементом с заданным тегом
  * */
  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  /*
  * непосредственное создание элемента с заданным тегом + назначение ему уникального идентификатора в поле _id
  * */
  _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);

    if(this._id !== null) {
      element.setAttribute('data-id', this._id);
    }

    return element;
  }

  /*
  * Назначение обработчиков событий на элемент компонента. Обработчики передаются строго в props.events, где ключи -
  * события DOM-элементов, а значения - функции обработчиков.
  * */
  _addEvents() {
    const {
      events = {} as TEvents,
    } = this.props;

    Object
      .keys(events)
      .forEach(eventName => {
        if(!this._listeners[eventName]) {
          this._listeners[eventName] = [];
        }

        /*
        * сохраняем обработчики событий чтобы была возможность их позже удалить
        * */
        this._listeners[eventName].push(events[eventName]);

        /*
        * добавляем обработчики на созданный элемент
        * */
        this._element.addEventListener(eventName, events[eventName]);
      });
  }

  /*
  * удаление всех назначенных обработчиков событий
  * */
  _removeEvents() {
    Object
      .keys(this._listeners)
      .forEach(eventName => {
        const handlersArray = this._listeners[eventName];

        handlersArray.forEach(handler => this._element.removeEventListener(eventName, handler));
      });
  }

  /*
  * метод жизненного цикла компонента, вызывается при триггере события из вспомогательной функции modules/render,
  * которая вызывает данное событие сразу после вставки компонента в DOM
  * Метод внутри себя:
  * - вызывает переопределенный метод непосредственно у компонента-экземпляра
  * - делает триггер события монтирования для всех children компонента-экземпляра
  * */
  _componentDidMount() {
    this.componentDidMount(this.props);

    Object
      .keys(this._children)
      .forEach(key => {
        const child = this._children[key];

        child.dispatchComponentDidMount();
      });
  }

  componentDidMount(oldProps: TComponentProps) {
    console.log('componentDidMount', oldProps);
  }

  /*
  * метод для вызова события монтирования компонента, используется в служебной функции render
  * */
  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  /*
  * метод жизненного цикла компонента. Вызывается при обновлении значений пропсов.
  * */
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

  /*
  * данный метод нужен для доступа извне, например когда компонент-родитель вызывает setProps для компонента потомка и
  * передает ему обновленные данные
  * */
  setProps = (nextProps: TComponentProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  /*
  * метод жизненного цикла компонента. Вызывается, когда наступает событие перерисовки.
  * Триггер данного события срабатывает при первоначальной инициализации и в рамках метода жизненного цикла componentDidUpdate
  * */
  _render() {
    console.log('render', this.props);

    /*
    * получаем итоговую разметку компонента
    * */
    const block: Node | null = this.render();

    if(!block) {
      return;
    }

    /*
    * удаляем потенциально существующие обработчики событий
    * */
    this._removeEvents();

    /*
    * очищаем все вложенные узлы компонента и вставляем итоговую разметку
    * */
    console.log('children', this._children)
    this._element.innerHTML = '';
    this._element.appendChild(block);

    /*
    * добавляем новые обработчики событий
    * */
    this._addEvents();
  }

  render(): Node | null { return null }

  /*
  * метод для запроса DOM-элемента
  * */
  getContent() {
    return this.element;
  }
  get element() {
    return this._element;
  }

  /*
  * метод создает proxy-обертку для работы с props компонента. Она выполняет следующие функции:
  * - привязка контекста (this.props) для переданных функций
  * - запрет на удаление любых свойств
  * - при обновлении значений пропсов вызов componentDidUpdate
  * */
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
        set: (target, prop: string, value: unknown) => {
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

  /*
  *
  * */
  show() {
    this.getContent().style.display = "block";
  }

  /*
  *
  * */
  hide() {
    this.getContent().style.display = "none";
  }
}
