import FilmCardView from '../view/view-film-card.js';
import PopupView from '../view/view-popup.js';
import { RenderPosition, render, replace } from '../utils/render.js';

const Mode = {
  CLOSE: 'CLOSE',
  OPEN: 'OPEN',
};

export default class FilmCard {

  constructor(filmContainer, changeData, changeMode) {
    this._filmContainer = filmContainer;
    this._changeData = changeData;
    this._view = null;
    this._mode = Mode.CLOSE;
    this._changeMode = changeMode;

    // ----привязывваем контекст функций------
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleAsWatchedClick = this._handleAsWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._openCardPopup = this._openCardPopup.bind(this);
    this._removeCardPopup = this._removeCardPopup.bind(this);
    this._handleClickFilm = this._handleClickFilm.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this.closePopup = this.closePopup(this);
    // ---------------------------------------
  }

  init(film) {
    // console.log(film);
    const prevFilmView = this._view;
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

    if (prevFilmView === null) {
      this._renderFilm();
      return;
    }
    replace(this._view, prevFilmView);


  }

  closePopup() {
    console.log('start change mode for all preseter');
    if (this._mode === Mode.OPEN) {
      this._removeCardPopup();
    }

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
      this._mode = Mode.CLOSE;
      document.removeEventListener('keydown', this._onEscKeyDown);
    }
  }

  fuck() {
    console.log('fuck');
  }



  _removeCardPopup() {
    document.querySelector('body').removeChild(this._viewPopup.getElement());
    document.querySelector('body').classList.remove('hide-overflow');
    this._mode = Mode.CLOSE;
  }

  _openCardPopup() {
    console.log('open Popup: ', this._mode);

    this._changeMode();
    document.querySelector('body').appendChild(this._viewPopup.getElement());
    document.querySelector('body').classList.add('hide-overflow');
    this._mode = Mode.OPEN;
    console.log('Popup succesful: ', this._mode);
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
