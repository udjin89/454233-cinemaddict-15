import { createElement } from '../mock/utils.js';

const createSort = () => (
  `<ul class="sort">
  <li><a href="#" class="sort__button">Sort by default</a></li>
  <li><a href="#" class="sort__button">Sort by date</a></li>
  <li><a href="#" class="sort__button sort__button--active">Sort by rating</a></li>
</ul>
`);
// Класс sort, экспортируем по умолчанию, для удобства
export default class sort {
  constructor() {
    this._element = null; //здесь будет храниться DOM элемент
  }

  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией

    return createSort();
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
