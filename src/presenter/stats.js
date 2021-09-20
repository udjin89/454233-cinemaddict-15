import { ShowPeriod } from '../const.js';
import { removeComponent, render, replace } from '../utils/render.js';
import { getRatingUser, countWatchedFilms } from '../utils/stats.js';
import StatsView from '../view/view-stats.js';

export default class Stats {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._statsView = null;

    this._films = this._filmsModel.getFilms().slice();

    this._state = {
      films: this._films,
      range: ShowPeriod.ALL_TIME,
    };

    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  init() {

    this._filmsModel.addObserver(this._handleModelEvent);

    this._render();
  }

  show() {
    this._statsView.show();
  }

  hide() {
    this._statsView.hide();
  }

  _handleModelEvent() {
    this.init();
  }

  _getStatus() {
    return getRatingUser(countWatchedFilms(this._films));
  }

  _render() {
    const prevStatsView = this._statsView;
    this._statsView = new StatsView(this._state, this._getStatus());

    if (prevStatsView === null) {
      render(this._container, this._statsView);
      return;
    }
    replace(this._statsView, prevStatsView);
    removeComponent(prevStatsView);
  }

  setMenuClickHandler() {

  }
}
