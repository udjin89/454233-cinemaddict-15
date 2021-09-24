import AbstractObserver from './abstract-observer.js';
import { FilterType } from '../const.js';

export default class Filter extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    console.log('setFilter MODEL');
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
