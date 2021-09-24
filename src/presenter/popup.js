import PopupView from '../view/view-popup.js';
import { RenderPosition, render, removeComponent } from '../utils/render.js';
import { PopupState, UpdateType, UserAction } from '../const.js';

const isControlEnterEvent = (evt) => evt.key === 'Enter' && (evt.ctrlKey || evt.metaKey);

const HIDE_CLASS = 'hide-overflow';
export default class Popup {

  constructor(filmContainer, changeData, commentsModel, api) {
    this._filmContainer = filmContainer;
    this._changeData = changeData;
    this._commentsModel = commentsModel;
    this._api = api;

    this._view = null;

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleAsWatchedClick = this._handleAsWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleDeleteComment = this._handleDeleteComment.bind(this);
    this.setDefaultState = this.setDefaultState.bind(this);

    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    // this.closePopup = this.closePopup.bind(this);

  }

  init(film) {
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

  _handleInputChange(evt) {
    if(isControlEnterEvent(evt)){
      evt.preventDefault();
      const comment = this._view.getInput();

      this._changeData(
        UserAction.ADD_COMMENT,
        UpdateType.PATCH,
        {
          idFilm:  this._film.id,
          comment,
        },
      );
    }
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
    this._view.setDeleteCommentHandler(this._handleDeleteComment);

    //this._view.setFormSubmitHandler();
    this._view.setClosePopup(() => {
      // console.log(this);
      this._closeCardPopup();
    });
  }

  _handleDeleteComment(commentId) {
    this._view.setState(PopupState.DELETE, commentId);
    this._api.removeComment(commentId)
      .then(() => {
        this._commentsModel.removeComment(UpdateType.PATCH, this._film.id, commentId);
        const comments = this._film.comments.slice();
        comments.splice(comments.indexOf(commentId), 1);

        this._changeData(
          UserAction.DELETE_COMMENT,
          UpdateType.PATCH,
          Object.assign(
            {},
            this._film,
            {
              comments,
            },
          ),
        );
      })
      .catch(() => {
        this._view.setState(PopupState.REJECTED);
      })
      .finally(()=>{
        this._view.setState(PopupState.DEFAULT);
      });
  }

  _renderPopup() {
    if (this._view !== null) {
      this._updateComment();
      this._view.updateData(this._film);
      return;
    }

    this._view = new PopupView(this._film);
    this._loadComments();
    // console.log(this._view);
    render(document.body, this._view, RenderPosition.BEFOREEND);

    this._setPopupHandlers();

    document.addEventListener('keydown', this._onEscKeyDown);
    document.addEventListener('keydown', this._handleInputChange);
    document.body.classList.add(HIDE_CLASS);
  }

  _updateComment () {
    const film = this._film;
    if(this._commentsModel.has(film.id)) {
      // console.log('Обновляем');
      const comments = this._commentsModel.getComments(film.id);
      this._view.update(film, comments);
    } else {
      // console.log('Создаем');
      this._loadComments();
      this._view.update(film);
    }
  }

  _loadComments() {
    const film = this._film;

    this._api.getComments(film.id)
      .then((commentsData) => {
        this._commentsModel.setComments(UpdateType.PATCH, film.id, commentsData);
        if(this.isOpen(film)){
          this._view.update(film, commentsData);
        }
      })
      .catch((err)=> console.log('Запрос за комментариями вызвал ошибку', err));
  }

  _closeCardPopup() {
    removeComponent(this._view);
    this._view = null;
    // this.destroy();
    document.removeEventListener('keydown', this._onEscKeyDown);
    document.removeEventListener('keydown', this._handleInputChange);
    document.body.classList.remove(HIDE_CLASS);
    // this._view.reset(this._film);
    // this._mode = Mode.CLOSE;
  }

  setDefaultState(){
    this._view.setState(PopupState.DEFAULT);
  }

  setDisabledState(){
    this._view.setState(PopupState.DISABLED);
  }

  setDeletedState(){
    this._view.setState(PopupState.DELETE);
  }

  setRejectedState(){
    this._view.setState(PopupState.REJECTED);
    console.log(this._view.getElement());

  }

  shakeInputForm(){
    this._view.shakeInputForm();
  }

  resetInput() {
    this._view.resetInput();
  }

  isOpen(film) {
    return this._view !== null && this._film.id === film.id;
  }
}
