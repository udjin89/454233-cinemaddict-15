import { createElement } from '../mock/utils.js';

const createFilmCard = (movie) => {
  //деструктуируем то что пришло в movie
  const { filmInfo, comments, isWatchlist, isWatched, idFavorite } = movie;
  const { title, totalRating, poster, genre, runtime, release } = filmInfo;
  // const { x } = user_details;
  // console.log(movie);
  // console.log(comments);
  const countComments = comments.length;
  // console.log(countComments);
  //если более 140 символов, добавляем "..."
  const curDescription = filmInfo.description.length > 140 ? filmInfo.description.slice(0, 139).concat('...') : filmInfo.description;

  const runtimeView = Math.trunc(runtime / 60) + "h " + (runtime - Math.trunc(runtime / 60) * 60) + "m";

  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${totalRating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${release.date}</span>
    <span class="film-card__duration">${runtimeView}</span>
    <span class="film-card__genre">${genre[0]}</span>
  </p>
  <img src="./images/posters/${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${curDescription}</p>
  <a class="film-card__comments">${countComments}</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isWatchlist ? "film-card__controls-item--active" : ""}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isWatched ? "film-card__controls-item--active" : ""}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${idFavorite ? "film-card__controls-item--active" : ""}" type="button">Mark as favorite</button>
  </div>
  </article>
  `;
};
// Класс filmCard, экспортируем по умолчанию, для удобства
export default class filmCard {
  constructor(movie) {
    this._movieCard = movie;
    this._element = null; //здесь будет храниться DOM элемент
  }

  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией

    return createFilmCard(this._movieCard);
  }

  getElement() {
    if (!this._element) { //Если в поле _element, ничего нет то мы присваиваем результат функции createElement
      //в createElement отправляем разметку
      //Разметка из метода getTemplate, который вызывает createMenuTemplate
      // console.log(filter);

      this._element = createElement(this.getTemplate());
    }
    // Если уже что то находится в  _element, просто возвращаем это
    // console.log(this._element);
    return this._element;
  }

  removeElement() {
    this._element = null; //затираем значение(разметку которая там)
  }
}

