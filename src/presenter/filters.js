import FilterView from '../view/view-filter.js';
import { RenderPosition, render, removeComponent, replace } from '../utils/render.js';
import { FilterType, UpdateType } from '../const.js';
import { filterTypeToFilterFilms } from '../utils/filter.js';
// const filterTypeToFilterFilms = {
//   [FilterType.ALL]: (films) => films.length,
//   [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isWatchlist).length,
//   [FilterType.HISTORY]: (films) => films.filter((film) => film.isWatched).length,
//   [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite).length,
// };

export default class Filter {

  constructor(container, filterModel, filmsModel) {
    this._container = container;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filterModel.addObserver(this._handleModelEvent);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();

    const prevFilterComponent = this._filterComponent;
    //
    this._filterComponent = new FilterView(filters, this._filterModel.getFilter());

    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._container, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._container, prevFilterComponent);
    removeComponent(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  // _handleItemTypeClick(filterType) {

  // }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType && this._filterModel.getFilter() !== 'STATISTICS') { return; }
    if (this._filterModel.getFilter() === 'STATISTICS') {
      console.log('Stat open');
    }
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();
    return [
      {
        type: FilterType.ALL,
        name: 'All Movies',
        count: films.length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filterTypeToFilterFilms[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filterTypeToFilterFilms[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filterTypeToFilterFilms[FilterType.FAVORITES](films).length,
      },
    ];
  }


}


