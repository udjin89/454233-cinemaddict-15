import FilmCardView from '../view/view-film-card.js';
import { UpdateType, UserAction } from '../const.js';
import { RenderPosition, render, replace, removeComponent } from '../utils/render.js';

export default class FilmCard {

  constructor(filmContainer, changeData, changeMode) {
    this._filmContainer = filmContainer;
    this._changeData = changeData;
    this._view = null;
    this._changeMode = changeMode;

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleAsWatchedClick = this._handleAsWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleClickFilm = this._handleClickFilm.bind(this);

  }

  init(film) {
    const prevFilmView = this._view;

    this._film = film;
    this._view = new FilmCardView(this._film);
    this._view.setWatchListHandlerClick(this._handleWatchListClick);
    this._view.setAsWatchedListHandlerClick(this._handleAsWatchedClick);
    this._view.setFavoriteHandlerClick(this._handleFavoriteClick);

    this._view.setClickFilm(this._handleClickFilm);

    if (prevFilmView === null) {
      this._renderFilm();
      return;
    }
    replace(this._view, prevFilmView);
    removeComponent(prevFilmView);
  }

  destroy() {
    removeComponent(this._view);
  }

  _handleWatchListClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          isWatchlist: !(this._film.isWatchlist),
        },
      ),
      this._mode,
    );
  }

  _handleAsWatchedClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          isWatched: !(this._film.isWatched),
        },
      ),
      this._mode,
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !(this._film.isFavorite),
        },
      ),
      this._mode,
    );
  }

  _handleClickFilm() {
    this._changeMode(this._film);
  }

  _renderFilm() {
    render(this._filmContainer, this._view, RenderPosition.BEFOREEND);
  }
}
