import AbstractView from './abstract.js';

const createFiltersTemplate = (filters, currentFilterType) => (
  `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" data-type="all" class="main-navigation__item ${currentFilterType === 'all' ? 'main-navigation__item--active' : ''}">All movies</a>
    <a href="#watchlist" data-type="watchlist" class="main-navigation__item ${currentFilterType === 'watchlist' ? 'main-navigation__item--active' : ''}">Watchlist <span class="main-navigation__item-count">${filters.find((filterType) => filterType.type === 'watchlist').count}</span></a>
    <a href="#history" data-type="history" class="main-navigation__item ${currentFilterType === 'history' ? 'main-navigation__item--active' : ''}">History <span class="main-navigation__item-count">${filters.find((filterType) => filterType.type === 'history').count}</span> </a>
  <a href="#favorites" data-type="favorites" class="main-navigation__item ${currentFilterType === 'favorites' ? 'main-navigation__item--active' : ''}">Favorites <span class="main-navigation__item-count">${filters.find((filterType) => filterType.type === 'favorites').count}</span></a>
  </div >
  <a href="#stats" data-type="stats" class="main-navigation__additional ${currentFilterType === 'stats' ? 'main-navigation__item--active' : ''}">Stats</a>
</nav > `);


export default class filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._filters, this._currentFilterType);
  }

  _filterTypeChangeHandler(evt) {

    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this.getElement().querySelectorAll('.main-navigation__item').forEach((elem) => {
      elem.classList.remove('main-navigation__item--active');
    });
    evt.target.classList.add('main-navigation__item--active');

    this._callback.filterTypeChange(evt.target.dataset.type);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}
