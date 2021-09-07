import AbstractView from './abstract.js';
import { sortType } from '../const.js';

const createSort = () => (
  `<ul class="sort">
  <li><a href="#" class="sort__button" data-sort-type="${sortType.DEFAULT}">Sort by default</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${sortType.DATE}">Sort by date</a></li>
  <li><a href="#" class="sort__button sort__button--active" data-sort-type="${sortType.RATING}">Sort by rating</a></li>
</ul>
`);
// Класс sort, экспортируем по умолчанию, для удобства
export default class sort extends AbstractView {
  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией

    return createSort();
  }

  _sortTypeChangeHandler(evt) {

    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this.getElement().querySelectorAll('.sort__button').forEach((elem) => {
      elem.classList.remove('sort__button--active');
    });
    evt.target.classList.add('sort__button--active');
    // console.log(evt.target);
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
