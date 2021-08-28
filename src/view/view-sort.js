import AbstractView from './abstract.js';
import { SortType } from '../const.js';

const createSort = () => (
  `<ul class="sort">
  <li><a href="#" class="sort__button data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
  <li><a href="#" class="sort__button data-sort-type="${SortType.DATA}">Sort by date</a></li>
  <li><a href="#" class="sort__button data-sort-type="${SortType.RATING} sort__button--active">Sort by rating</a></li>
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
    evt.target.addClassList('sort__button--active');
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
