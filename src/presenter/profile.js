import ProfileView from '../view/view-profile.js';
import { RenderPosition, render, removeComponent } from '../utils/render.js';
import { getRatingUser, countWatchedFilms } from '../utils/stats.js';
export default class Profile {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._profile = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  init() {
    this._filmsModel.addObserver(this._handleModelEvent);
    this._renderProfile();
  }

  _renderProfile() {

    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    const status = this.getStatus();
    this._profile = new ProfileView(status);
    render(this._container, this._profile, RenderPosition.BEFOREEND);
  }

  _handleModelEvent() {
    removeComponent(this._profile);
    this.init();
  }

  _getFilms() {
    return this._filmsModel.getFilms();
  }

  getStatus() {

    const films = this._getFilms();
    return getRatingUser(countWatchedFilms(films));
  }

}
