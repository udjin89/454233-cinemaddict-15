import FilmCardView from '../view/view-film-card.js';
import PopupView from '../view/view-popup.js';
import { sortType, UpdateType, UserAction } from '../const.js';
import { RenderPosition, render, replace, removeComponent } from '../utils/render.js';

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
    this.closePopup = this.closePopup.bind(this);
    // ---------------------------------------

  }

  init(film) {
    // console.log(film.comments);
    const prevFilmView = this._view;
    const prevPopup = this._viewPopup;

    this._film = film; // тут передан фильм- объект со всей информацией о нем
    this._view = new FilmCardView(this._film); // создаем экземпляр класса, то есть карточку фильма: разметка, методы
    //устанавливаю обработчик, через метод setWatchListHandlerClick(он есть у каждой карточки), предаю this._handleWatchListClick - логику, что он будет делать при клике
    this._view.setWatchListHandlerClick(this._handleWatchListClick);
    this._view.setAsWatchedListHandlerClick(this._handleAsWatchedClick);
    this._view.setFavoriteHandlerClick(this._handleFavoriteClick);

    this._view.setClickFilm(this._handleClickFilm);

    this._viewPopup = new PopupView(this._film);
    this._setPopupHandlers();



    if (prevFilmView === null) {
      this._renderFilm();
      return;
    }
    replace(this._view, prevFilmView);
    replace(this._viewPopup, prevPopup);
  }


  _setPopupHandlers() {
    this._viewPopup.setWatchListHandlerClick(this._handleWatchListClick);
    this._viewPopup.setAsWatchedListHandlerClick(this._handleAsWatchedClick);
    this._viewPopup.setFavoriteHandlerClick(this._handleFavoriteClick);

    //this._viewPopup.setFormSubmitHandler();
    this._viewPopup.setClosePopup(() => {
      // console.log(this);
      this._removeCardPopup();
    });
  }

  _restoreHandlers() {
    this._setPopupHandlers();

  }

  setButtonClosePopup() {
    console.log('tttttttttttttttttt');
  }

  destroy() {
    // console.log('destroy');
    removeComponent(this._view);
    removeComponent(this._viewPopup);
    this._removeCardPopup();
  }

  replacePopup() {
    console.log('replacePopup');
    this._removeCardPopup();
    this._openCardPopup();
    this._restoreHandlers();
  }

  closePopup() {
    if (this._mode === Mode.OPEN) {
      console.log('Mode.OPEN - do closePopup');
      this._removeCardPopup();
      // this._viewPopup.destroy();
      // this.destroy();
    }
  }

  _handleWatchListClick() {
    // в this._changeData хранится колбек, переданный из film-list.js при создании презентера карточки фильма
    //_handleViewAction(actionType, updateType, update)
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
    // в this._changeData хранится колбек, переданный из film-list.js при создании презентера карточки фильма
    //_handleViewAction(actionType, updateType, update)
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
    // в this._changeData хранится колбек, переданный из film-list.js при создании презентера карточки фильма
    //_handleViewAction(actionType, updateType, update)
    // console.log(this._film);
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
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

  _onEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._removeCardPopup();
      //this._mode = Mode.CLOSE;
      //document.removeEventListener('keydown', this._onEscKeyDown);
    }
  }

  _removeCardPopup() {
    removeComponent(this._viewPopup);
    // this.destroy();
    document.querySelector('body').classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._onEscKeyDown);

    this._viewPopup.reset(this._film);
    this._mode = Mode.CLOSE;
  }

  _openCardPopup() {
    // console.log('open Popup: ', this._mode);

    this._changeMode();
    document.querySelector('body').appendChild(this._viewPopup.getElement());
    document.querySelector('body').classList.add('hide-overflow');
    this._mode = Mode.OPEN;
    // setWatchListHandlerClick();
    // console.log('Popup succesful: ', this._mode);
  }

  _handleClickFilm() {
    this._openCardPopup();
    this._restoreHandlers();
    document.addEventListener('keydown', this._onEscKeyDown);
  }

  _renderFilm() {
    render(this._filmContainer, this._view, RenderPosition.BEFOREEND);
  }

  _renderFilmCard() {
    // Главный метод по отрисовке, который будет вызывать остальные
  }
}
