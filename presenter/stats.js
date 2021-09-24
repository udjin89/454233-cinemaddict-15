import {ShowPeriod} from '../const';
import { removeComponent, render, RenderPosition, replace } from '../utils/render';
import { countWatchedFilms, getRatingUser } from '../utils/stats';
import StatsView from '../view/view-stats';

export default class Stats {
  constructor( container, filmsModel) {
    this._container = container;
    this._filmModel = filmsModel;
    this._statsView = null;
    // this._handleModelEvent = this._handleModelEvent.bind(this);
    // this._filmModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._state = {
      films: this._getFilms(),
      period: ShowPeriod.ALL_TIME,
    };

    this._render();
    // render(this._container, this._statsView);
    // this._container.append(this._statsView.getElement())
    // console.log(this._statsView.getElement());
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
    return getRatingUser(countWatchedFilms(this._getFilms()));
  }

  _getFilms() {
    return this._filmModel.getFilms();
  }

  _render () {
    const prevStatsView = this._statsView;
    this._statsView = new StatsView(this._state, this._getStatus());

    if(prevStatsView === null) {
      render(this._container, this._statsView, RenderPosition.BEFOREEND);
      return;
    }

    // render(this._container, this._statsView, RenderPosition.BEFOREEND);


    replace(this._statsView, prevStatsView);
    removeComponent(prevStatsView);
  }
}
