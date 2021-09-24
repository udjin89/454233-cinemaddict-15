import { createElement } from '../utils/render.js';
import { VISUALLY_HIDDEN } from '../const.js';

// Класс Abstract, экспортируем по умолчанию, для удобства
export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      //Проверка в конструкторе на "new.target" позволит использовать абстрактный
      // класс только в качестве родительского класса. При попытке выполнить "new Abstract()" разработчик получит ошибку
      throw new Error('Can\'t instantiate Abstract, only concrete one.');
    }

    this._element = null; //здесь будет храниться DOM элемент
    this._callback = {};// обьект в котором будут храниться ссылки на обработчики, которые мы установим
  }
  // Метод getTemplate в качестве реализации будем бросать исключение, чтобы разработчик не забывал его переопределить

  getTemplate() {
    throw new Error('Abstract method not implemented: getTemplate');
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  show() {
    this.getElement().classList.remove(VISUALLY_HIDDEN);
  }

  hide() {
    this.getElement().classList.add(VISUALLY_HIDDEN);
  }
}
