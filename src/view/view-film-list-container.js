import { createElement } from '../mock/utils.js';

const createFilmsListContainer = () => (
  `<div class="films-list__container">

    </div>
  `
);
// Класс filmsListContainer, экспортируем по умолчанию, для удобства
export default class filmsListContainer {
  constructor() {
    this._element = null; //здесь будет храниться DOM элемент
  }

  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией
    return createFilmsListContainer();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null; //затираем значение(разметку которая там)
  }
}
