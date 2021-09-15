import AbstractView from './abstract.js';


const filmToFilterMap = {
  watchlist: (films) => films.filter((film) => film.isWatchlist).length,
  history: (films) => films.filter((film) => film.isWatched).length,
  favorites: (films) => films.filter((film) => film.isFavorite).length,
};

const generateFilter = (films) => Object.entries(filmToFilterMap).map(([filterName, countfilms]) => ({
  name: filterName,
  count: countfilms(films),
}),
);

const createFiltersTemplate = (filters, currentFilterType) => {
  console.log(filters);
  // const filmFilter = generateFilter(filters);
  // console.log(currentFilterType);
  // console.log(filmFilter.find((filter) => { return filter.name === 'watchlist' }).count);
  // console.log(filmFilter.find((filter) => { return filter.name === 'history' }).count);
  // console.log(filmFilter.find((filter) => { return filter.name === 'favorites' }).count);
  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" data-type="all" class="main-navigation__item ${currentFilterType === 'all' ? 'main-navigation__item--active' : ''}">All movies</a>
    <a href="#watchlist" data-type="watchlist" class="main-navigation__item ${currentFilterType === 'watchlist' ? 'main-navigation__item--active' : ''}">Watchlist <span class="main-navigation__item-count">${filters.find((filterType) => { return filterType.type === 'watchlist' }).count}</span></a>
    <a href="#history" data-type="history" class="main-navigation__item ${currentFilterType === 'history' ? 'main-navigation__item--active' : ''}">History <span class="main-navigation__item-count">${filters.find((filterType) => { return filterType.type === 'history' }).count}</span> </a>
  <a href="#favorites" data-type="favorites" class="main-navigation__item ${currentFilterType === 'favorites' ? 'main-navigation__item--active' : ''}">Favorites <span class="main-navigation__item-count">${filters.find((filterType) => { return filterType.type === 'favorites' }).count}</span></a>
  </div >
  <a href="#stats" data-type="stats" class="main-navigation__additional">Stats</a>
</nav > `;
};
// Класс filter, экспортируем по умолчанию, для удобства
export default class filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters; //сохраняем преданные данные
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией
    return createFiltersTemplate(this._filters, this._currentFilterType);
  }

  _filterTypeChangeHandler(evt) {
    console.log('clisck');
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
