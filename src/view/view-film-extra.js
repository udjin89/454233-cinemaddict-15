import { createElement } from '../mock/utils.js';

const createFilmExtraList = () => (
  `<section class="films-list films-list--extra">
  <h2 class="films-list__title">Top rated</h2>
  <div class="films-list__container">
  </div>
  </section>
  `
);
export default class filmExtraList {
  constructor() {
    this._element = null; //здесь будет храниться DOM элемент
  }

  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией

    return createFilmExtraList();
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

