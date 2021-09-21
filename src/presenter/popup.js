import PopupView from '../view/view-popup.js';
import { RenderPosition, render, removeComponent } from '../utils/render.js';
import { UpdateType, UserAction } from '../const.js';


export default class Popup {

  constructor(filmContainer, changeData) {
    this._filmContainer = filmContainer;
    this._changeData = changeData;

    this._view = null;

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleAsWatchedClick = this._handleAsWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    // this.closePopup = this.closePopup.bind(this);

  }

  init(film) {
    console.log('FILM POPUP', film);
    this._film = film;
    this._renderPopup();
  }

  // replacePopup() {
  //   console.log('replacePopup');
  //   // this._removeCardPopup();
  //   this._openCardPopup();
  //   this._restoreHandlers();
  // }

  // closePopup() {
  //   if (this._mode === Mode.OPEN) {
  //     // console.log('Mode.OPEN - do closePopup');
  //     this._removeCardPopup();
  //     // this._view.destroy();
  //     // this.destroy();
  //   }
  // }

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

  _onEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._closeCardPopup();
      //this._mode = Mode.CLOSE;
      //document.removeEventListener('keydown', this._onEscKeyDown);
    }
  }

  _setPopupHandlers() {
    this._view.setWatchListHandlerClick(this._handleWatchListClick);
    this._view.setAsWatchedListHandlerClick(this._handleAsWatchedClick);
    this._view.setFavoriteHandlerClick(this._handleFavoriteClick);

    //this._view.setFormSubmitHandler();
    this._view.setClosePopup(() => {
      // console.log(this);
      this._closeCardPopup();
    });
  }

  _renderPopup() {
    if (this._view !== null) {
      this._view.updateData(this._film);
      return;
    }


    this._view = new PopupView(this._film);
    console.log(this._view);
    render(document.body, this._view, RenderPosition.BEFOREEND);

    this._setPopupHandlers();

    document.addEventListener('keydown', this._onEscKeyDown);
    document.querySelector('body').classList.add('hide-overflow');
  }

  _closeCardPopup() {
    removeComponent(this._view);
    this._view = null;
    // this.destroy();
    document.querySelector('body').classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._onEscKeyDown);

    // this._view.reset(this._film);
    // this._mode = Mode.CLOSE;
  }

  isOpen(film) {
    return this._view !== null && this._film.id === film.id;
  }
}
