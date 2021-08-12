import { createElement } from '../mock/utils.js';

const createButtonShowMore = () => (
  `<button class="films-list__show-more">Show more</button>
  `
);
// Класс sort, экспортируем по умолчанию, для удобства
export default class buttonShow {
  constructor() {
    this._element = null; //здесь будет храниться DOM элемент
  }

  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией

    return createButtonShowMore();
  }

  getElement() {
    if (!this._element) { //Если в поле _element, ничего нет то мы присваиваем результат функции createElement
      //в createElement отправляем разметку
      //Разметка из метода getTemplate, который вызывает createMenuTemplate
      // console.log(filter);
      this._element = createElement(this.getTemplate());
    }
    // Если уже что то находится в  _element, просто возвращаем это
    // console.log(this._element);
    return this._element;
  }

  removeElement() {
    this._element = null; //затираем значение(разметку которая там)
  }
}

