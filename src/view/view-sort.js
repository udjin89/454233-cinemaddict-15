import AbstractView from './abstract.js';
import { sortType } from '../const.js';

const createSortItem = (type, name, isActive = false) => {
  const activeClass = isActive ? 'sort__button--active' : '';
  return `<li><a href="#" class="sort__button ${activeClass}" data-sort-type="${type}">Sort by ${name}</a></li>`;
};

const createSortList = (initialSortType) => (
  `<ul class="sort">
  ${createSortItem(sortType.DEFAULT, 'default', initialSortType === sortType.DEFAULT)}
  ${createSortItem(sortType.DATE, 'date', initialSortType === sortType.DATE)}
  ${createSortItem(sortType.RATING, 'rating', initialSortType === sortType.RATING)}

</ul>
`);
// Класс sort, экспортируем по умолчанию, для удобства
export default class sort extends AbstractView {
  constructor(initialSortType) {
    super();
    this._initialSortType = initialSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией

    return createSortList(this._initialSortType);
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
