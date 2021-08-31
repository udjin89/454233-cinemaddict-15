import AbstractView from './abstract.js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const createFilmDetails = (movie) => {

  //деструктуируем то что пришло в movie
  const { filmInfo, comments, isWatchlist, isWatched, isFavorite } = movie;
  const { title, alternativeTitle, totalRating, director, writers, actors, poster, ageRating, genre, runtime, release, description } = filmInfo;
  const runtimeView = `${Math.trunc(runtime / 60)}h ${(runtime - Math.trunc(runtime / 60) * 60)}m`;
  // console.log(genre);
  // console.log(comments);
  // let genres = genre.join();
  const writersView = writers.join();

  const genreTemplate = (genreElement) => `<span class="film-details__genre">${genreElement}</span>`;

  const genresItems = (genreParam) => {

    const genresItemsTemplate = genreParam.map((item, index) => genreTemplate(item, index)).join('');
    // console.log(genresItemsTemplate);
    return genresItemsTemplate;
  };

  const commentTemplate = (com) => (
    `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${com.emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${com.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${com.author}</span>
        <span class="film-details__comment-day">${dayjs().to(dayjs(com.date))}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
  );

  const commentsItems = (commentsItem) => {

    const commentsItemsTemplate = commentsItem.map((item, index) => commentTemplate(item, index)).join('');
    return commentsItemsTemplate;
  };
  const renderComents = commentsItems(comments);
  const renderGenres = genresItems(genre);

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

          <p class="film-details__age">${ageRating}+</p>
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
              <td class="film-details__cell">${release.date}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtimeView}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${release.release_country}</td>
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
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>
        <ul class="film-details__comments-list">
          ${renderComents}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>
`;
};

export default class popup extends AbstractView {
  constructor(movie) {
    super();
    this._movie = movie;

    this._clickClosePopup = this._clickClosePopup.bind(this);
  }

  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией

    return createFilmDetails(this._movie);
  }

  _clickWatchList(evt) {
    evt.preventDefault();
    this._callback.clickAddWatchList(); // метод записан с обьекте callback
  }

  setWatchListHandlerClick(callback) {
    this._callback.clickAddWatchList = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._clickWatchList);
  }

  _clickAsWatchedList(evt) {
    evt.preventDefault();
    this._callback.clickAddAsWatchedList(); // метод записан с обьекте callback
  }

  setAsWatchedListHandlerClick(callback) {
    this._callback.clickAddAsWatchedList = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._clickAsWatchedList);
  }

  _clickFavorite(evt) {
    evt.preventDefault();
    this._callback.clickAddFavorite(); // метод записан с обьекте callback
  }

  setFavoriteHandlerClick(callback) {
    this._callback.clickAddFavorite = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._clickFavorite);
  }

  _clickClosePopup(evt) {
    evt.preventDefault();
    this._callback.clickClosePopup(); //???
  }

  setClosePopup(callback) {
    this._callback.clickClosePopup = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._clickClosePopup);
  }
}

