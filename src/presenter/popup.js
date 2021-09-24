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
<<<<<<< HEAD

=======
>>>>>>> 051a8c2
  }

  init(film) {
    this._film = film;
    this._renderPopup();
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

  _handleInputChange(evt) {
    if (isControlEnterEvent(evt)) {
      evt.preventDefault();
      const comment = this._view.getInput();

      this._changeData(
        UserAction.ADD_COMMENT,
        UpdateType.PATCH,
        {
          idFilm: this._film.id,
          comment,
        },
      );
    }
  }

  _onEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._closeCardPopup();
    }
  }

  _setPopupHandlers() {
    this._view.setWatchListHandlerClick(this._handleWatchListClick);
    this._view.setAsWatchedListHandlerClick(this._handleAsWatchedClick);
    this._view.setFavoriteHandlerClick(this._handleFavoriteClick);
    this._view.setDeleteCommentHandler(this._handleDeleteComment);
<<<<<<< HEAD

=======
>>>>>>> 051a8c2
    this._view.setClosePopup(() => {
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
      .finally(() => {
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
<<<<<<< HEAD

=======
>>>>>>> 051a8c2
    render(document.body, this._view, RenderPosition.BEFOREEND);

    this._setPopupHandlers();

    document.addEventListener('keydown', this._onEscKeyDown);
    document.addEventListener('keydown', this._handleInputChange);
    document.body.classList.add(HIDE_CLASS);
  }

  _updateComment() {
    const film = this._film;
    if (this._commentsModel.has(film.id)) {
      const comments = this._commentsModel.getComments(film.id);
      this._view.update(film, comments);
    } else {
      this._loadComments();
      this._view.update(film);
    }
  }

  _loadComments() {
    const film = this._film;

    this._api.getComments(film.id)
      .then((commentsData) => {
        this._commentsModel.setComments(UpdateType.PATCH, film.id, commentsData);
        if (this.isOpen(film)) {
          this._view.update(film, commentsData);
        }
      })
<<<<<<< HEAD
      .catch((err) => (`Запрос за комментариями вызвал ошибку ${err}`));
=======
      .catch();
>>>>>>> 051a8c2
  }

  _closeCardPopup() {
    removeComponent(this._view);
    this._view = null;
    document.removeEventListener('keydown', this._onEscKeyDown);
    document.removeEventListener('keydown', this._handleInputChange);
    document.body.classList.remove(HIDE_CLASS);
  }

  setDefaultState() {
    this._view.setState(PopupState.DEFAULT);
  }

  setDisabledState() {
    this._view.setState(PopupState.DISABLED);
  }

  setDeletedState() {
    this._view.setState(PopupState.DELETE);
  }

  setRejectedState() {
    this._view.setState(PopupState.REJECTED);
  }

  shakeInputForm() {
    this._view.shakeInputForm();
  }

  resetInput() {
    this._view.resetInput();
  }

  isOpen(film) {
    return this._view !== null && this._film.id === film.id;
  }
}
