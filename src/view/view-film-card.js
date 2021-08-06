// let activeClass = "film-card__controls-item--active";
const createFilmCard = (movie) => {

  //деструктуируем то что пришло в movie
  const { film_info, comments, user_details } = movie;
  const { title, total_rating, poster, genre, runtime, release } = film_info;
  const { watchlist, already_watched, favorite } = user_details;
  // console.log(movie);
  // console.log(comments);
  const countComments = comments.length;
  // console.log(countComments);
  //если более 140 символов, добавляем "..."
  const curDescription = film_info.description.length > 140 ? film_info.description.slice(0, 139).concat('...') : film_info.description;
  let activeClassWatch, activeClassAlready, activeClassFavorite;
  // watchlist ? activeClassWatch = "film-card__controls-item--active" : activeClassWatch = "";
  // already_watched ? activeClassAlready = "film-card__controls-item--active" : activeClassWatch = "";
  // favorite ? activeClassFavorite = "film-card__controls-item--active" : activeClassWatch = "";

  const runtimeView = Math.trunc(runtime / 60) + "h " + (runtime - Math.trunc(runtime / 60) * 60) + "m";

  return `
  <article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${total_rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${release.date}</span>
    <span class="film-card__duration">${runtimeView}</span>
    <span class="film-card__genre">${genre[0]}</span>
  </p>
  <img src="./images/posters/${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${curDescription}</p>
  <a class="film-card__comments">${countComments}</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlist ? "film-card__controls-item--active" : ""}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${already_watched ? "film-card__controls-item--active" : ""}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${favorite ? "film-card__controls-item--active" : ""}" type="button">Mark as favorite</button>
  </div>
  </article>
  `;
}


export { createFilmCard };
