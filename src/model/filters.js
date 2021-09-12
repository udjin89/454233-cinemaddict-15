import AbstractObserver from './abstract-observer.js';
import { FilterType } from '../const.js';

export default class Filter extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }

  getFilter1() {
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
        count: filterTypeToFilterFilms[FilterType.FAVORITE](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filterTypeToFilterFilms[FilterType.FAVORITE](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filterTypeToFilterFilms[FilterType.FAVORITE](films).length,
      },
    ];
  }
}
