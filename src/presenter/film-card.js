import FilmCardView from '../view/view-film-card.js';
import PopupView from '../view/view-popup.js';
import { RenderPosition, render } from '../utils/render.js';

export default class FilmCard {

  constructor(filmContainer) {
    this._filmContainer = filmContainer;

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
  }

  init(film) {
    // console.log(film);
    this._film = film; // тут передан фильм- объект со всей информацией о нем
    this._view = new FilmCardView(this._film); // создаем экземпляр класса, то есть карточку фильма: разметка, методы
    //устанавливаю обработчик, через метод setWatchListHandlerClick(он есть у каждой карточки), предаю this._handleWatchListClick - логику, что он будет делать при клике
    this._view.setWatchListHandlerClick(this._handleWatchListClick);
    this._view.setAsWatchedListHandlerClick(this._handleAsWatchedClick);
    this._view.setFavoriteHandlerClick(this._handleFavoriteClick);

    this._view.setClickFilm(this._handleClickFilm);

    this._viewPopup = new PopupView(this._film);

    this._viewPopup.setClosePopup(() => {
      this._removeCardPopup();
    });
    this._renderFilm();
  }

  _changeData(updateFilm) {

  }

  _handleWatchListClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatchlist: !(this._film.isWatchlist),
        },
      ),
    );
  }

  _handleAsWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatched: !(this._film.isWatched),
        },
      ),
    );
  }

  _handleFavoriteClick() {
    // console.log(this._film);
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !(this._film.isFavorite),
        },
      ),
    );
  }

  _onEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._removeCardPopup();
      document.removeEventListener('keydown', this._onEscKeyDown);
    }
  }

  _removeCardPopup() {
    document.querySelector('body').removeChild(this._viewPopup.getElement());
    document.querySelector('body').classList.remove('hide-overflow');
  }

  _openCardPopup() {
    document.querySelector('body').appendChild(this._viewPopup.getElement());
    document.querySelector('body').classList.add('hide-overflow');
  }

  _handleClickFilm() {
    this._openCardPopup();
    document.addEventListener('keydown', this._onEscKeyDown);

  }

  _renderFilm() {
    render(this._filmContainer, this._view, RenderPosition.BEFOREEND);
  }

  _renderFilmCard() {
    // Главный метод по отрисовке, который будет вызывать остальные
  }
}
