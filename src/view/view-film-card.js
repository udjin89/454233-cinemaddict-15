import AbstractView from './abstract.js';

const createFilmCard = (movie) => {
  //деструктуируем то что пришло в movie
  const { filmInfo, comments, isWatchlist, isWatched, isFavorite } = movie;
  const { title, totalRating, poster, genre, runtime, release } = filmInfo;
  const countComments = comments.length;

  //если более 140 символов, добавляем "..."
  const curDescription = filmInfo.description.length > 140 ? filmInfo.description.slice(0, 139).concat('...') : filmInfo.description;

  const runtimeView = `${Math.trunc(runtime / 60)}h ${(runtime - Math.trunc(runtime / 60) * 60)}m`;

  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${totalRating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${release.date}</span>
    <span class="film-card__duration">${runtimeView}</span>
    <span class="film-card__genre">${genre[0]}</span>
  </p>
  <img src="https://15.ecmascript.pages.academy/cinemaddict/${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${curDescription}</p>
  <a class="film-card__comments">${countComments}</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isWatchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${isFavorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
  </div>
  </article>
  `;
};
// Класс filmCard, экспортируем по умолчанию, для удобства
// filmCard делаем дочерним от Abstract, и он наследует все методы
export default class filmCard extends AbstractView {
  constructor(movie) {
    super(); // наследуем конструктор из class Abstract
    this._movieCard = movie;

    this._clickFilm = this._clickFilm.bind(this); //?????
    this._clickWatchList = this._clickWatchList.bind(this);
    this._clickAsWatchedList = this._clickAsWatchedList.bind(this);
    this._clickFavorite = this._clickFavorite.bind(this);
  }

  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией
    return createFilmCard(this._movieCard);
  }

  _clickWatchList(evt) {
    evt.preventDefault();
    this._callback.clickAddWatchList(); // метод записан с обьекте callback
  }

  setWatchListHandlerClick(callback) {
    this._callback.clickAddWatchList = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._clickWatchList);
  }

  _clickAsWatchedList(evt) {
    evt.preventDefault();
    this._callback.clickAddAsWatchedList(); // метод записан с обьекте callback
  }

  setAsWatchedListHandlerClick(callback) {
    this._callback.clickAddAsWatchedList = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._clickAsWatchedList);
  }

  _clickFavorite(evt) {
    evt.preventDefault();
    this._callback.clickAddFavorite(); // метод записан с обьекте callback
  }

  setFavoriteHandlerClick(callback) {
    this._callback.clickAddFavorite = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._clickFavorite);
  }

  _clickFilm(evt) {
    evt.preventDefault();
    this._callback.clickFilm(); //???
  }

  setClickFilm(callback) {
    this._callback.clickFilm = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._clickFilm);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._clickFilm);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._clickFilm);
  }
}

