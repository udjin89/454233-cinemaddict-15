import SmartView from './smart.js';
import commentListTemplate from './comment-list.js';
import { formatDateToRelease } from '../utils/formating-date.js';
import { PopupState } from '../const.js';
import { shake } from '../utils/common.js';

const createFilmDetails = (movie) => {
  const {
    filmInfo,
    currentComments: comments,
    isWatchlist,
    isWatched,
    isFavorite,
    currentEmoji = '',
    currentText = '',
    isDeleted,
    isDisabled,
    commentId,
  } = movie;

  const {
    title,
    alternativeTitle,
    totalRating,
    director,
    writers,
    actors,
    poster,
    ageRating,
    genre,
    runtime,
    date,
    description,
    country,
  } = filmInfo;

  const runtimeView = `${Math.trunc(runtime / 60)}h ${(runtime - Math.trunc(runtime / 60) * 60)}m`;
  const writersView = writers.join();

  const genreTemplate = (genreElement) => `<span class="film-details__genre">${genreElement}</span>`;
  const genresItems = (genreParam) => {

    const genresItemsTemplate = genreParam.map((item, index) => genreTemplate(item, index)).join('');
    return genresItemsTemplate;
  };

  const renderGenres = genresItems(genre);

  return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class ="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">${alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writer${writers.length > 1 ? 's' : ''}</td>
                  <td class="film-details__cell">${writersView}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formatDateToRelease(date)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${runtimeView}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genre${genre.length > 1 ? 's' : ''}</td>
                  <td class="film-details__cell">${renderGenres}</td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <button type="button" class="film-details__control-button film-details__control-button--watchlist ${isWatchlist ? 'film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
            <button type="button" class="film-details__control-button  film-details__control-button--watched ${isWatched ? 'film-details__control-button--active' : ''}" id="watched" name="watched">Already watched</button>
            <button type="button" class="film-details__control-button film-details__control-button--favorite ${isFavorite ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
          </section>
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
            ${commentListTemplate(comments, { currentEmoji, currentText, isDeleted, isDisabled, commentId })}
          </section>
       </div>
      </form>
    </section>
    `;
};

export default class popup extends SmartView {
  constructor(movie) {
    super();
    this._movie = movie;
    this._data = popup.parseInfoToState(movie);
    this._clickClosePopup = this._clickClosePopup.bind(this);
    this._clickWatchList = this._clickWatchList.bind(this);
    this._clickAsWatchedList = this._clickAsWatchedList.bind(this);
    this._clickFavorite = this._clickFavorite.bind(this);
    this._descriptionInputHandler = this._descriptionInputHandler.bind(this);
    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);
    this._commentsClickHandler = this._commentsClickHandler.bind(this);
    this._setInnerHandlers = this._setInnerHandlers.bind(this);
    this._onDeleteKeyDown = this._onDeleteKeyDown.bind(this);

    this._descriptionChangeHandler = this._descriptionChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFilmDetails(this._data);
  }

  setState(state, commentId) {
    switch (state) {
      case PopupState.DISABLED:
        this.updateData(
          {
            isDisabled: true,
          },
          false,
        );
        break;
      case PopupState.DELETE:
        this.updateData(
          {
            isDeleted: true,
            commentId,
          },
          false,
        );
        break;
      case PopupState.REJECTED:
        this.updateData(
          {
            isDeleted: false,
            isDisabled: false,
          },
          false,
        );
        break;
      case PopupState.DEFAULT:
        this.updateData(
          {
            isDeleted: false,
            isDisabled: false,
          },
          false,
        );
        break;

    }
  }

  shakeInputForm() {
    const commentInput = this.getElement().querySelector('.film-details__comment-input');
    shake(commentInput);
  }

  update(data, comments = []) {
    this.updateData({
      data,
      currentComments: comments,
    }, false);
  }

  resetInput() {
    this.updateData({
      currentText: '',
      currentEmoji: '',
    }, false);
  }

  getInput() {
    const {
      currentText: comment,
      currentEmoji: emotion,
    } = this._data;
    return {
      comment,
      emotion,
    };
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _descriptionInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      currentText: evt.target.value,
    }, true);
  }

  _descriptionChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      currentText: evt.target.value,
    }, false);
  }

  _emojiChangeHandler(evt) {
    this._movie.comments.emotion = evt.target.value;
    evt.preventDefault();
    this.updateData({
      currentEmoji: this._movie.comments.emotion,
    }, false);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.film-details__comment-input').addEventListener('change', this._descriptionInputHandler);
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._descriptionInputHandler);
    this.getElement().querySelectorAll('.film-details__emoji-item').forEach((item) => {
      item.addEventListener('change', this._emojiChangeHandler);
    });

    this.setWatchListHandlerClick(this._callback.clickAddWatchList);
    this.setAsWatchedListHandlerClick(this._callback.clickAddAsWatchedList);
    this.setFavoriteHandlerClick(this._callback.clickAddFavorite);
    this.setDeleteCommentHandler(this._callback.clickListCommentDelete);

    this.getElement().querySelector('.film-details__comment-input').addEventListener('keydown', this._onDeleteKeyDown);
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._clickClosePopup);


  }

  _onDeleteKeyDown(evt) {
    if (evt.key === 'Delete') {
      evt.preventDefault();
      this.updateData({
        currentText: '',
        currentEmoji: '',
      }, false);
    }
  }

  _clickWatchList(evt) {
    evt.preventDefault();
    this._callback.clickAddWatchList();
  }

  setWatchListHandlerClick(callback) {
    this._callback.clickAddWatchList = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._clickWatchList);
  }

  _clickAsWatchedList(evt) {
    evt.preventDefault();
    this._callback.clickAddAsWatchedList();
  }

  setAsWatchedListHandlerClick(callback) {
    this._callback.clickAddAsWatchedList = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._clickAsWatchedList);
  }

  _clickFavorite(evt) {
    evt.preventDefault();
    this._callback.clickAddFavorite();
  }

  setFavoriteHandlerClick(callback) {
    this._callback.clickAddFavorite = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._clickFavorite);
  }

  _clickClosePopup(evt) {
    evt.preventDefault();
    this._callback.clickClosePopup();
  }

  setClosePopup(callback) {
    this._callback.clickClosePopup = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._clickClosePopup);
  }

  _commentsClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('film-details__comment-delete')) {
      this._commentId = evt.target.dataset.id;
      this._callback.clickListCommentDelete(this._commentId);
    }
  }

  setDeleteCommentHandler(callback) {
    this._callback.clickListCommentDelete = callback;
    this.getElement().querySelector('.film-details__comments-list').addEventListener('click', this._commentsClickHandler);
  }

  static parseInfoToState(movie) {
    return Object.assign(
      {},
      movie,
      {
        currentComments: [],
        currentText: '',
        currentEmoji: '',
        isDeleted: false,
        isDisabled: false,
        commentId: null,
      },
    );
  }


}
