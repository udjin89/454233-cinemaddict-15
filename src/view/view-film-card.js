

const createFilmCard = (movie) => {

  //деструктуируем то что пришло в movie
  const { film_info, comments } = movie;
  console.log(movie);
  console.log(movie.comments);
  const countComments = comments.length;
  console.log(countComments);
  //если более 140 символов, добавляем "..."
  const curDescription = film_info.description.length > 140 ? film_info.description.slice(0, 139).concat('...') : film_info.description;

  return `
  <article class="film-card">
  <h3 class="film-card__title">${film_info.title}</h3>
  <p class="film-card__rating">${film_info.total_rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${film_info.release.date}</span>
    <span class="film-card__duration">${film_info.runtime}</span>
    <span class="film-card__genre">${film_info.genre[0]}</span>
  </p>
  <img src="./images/posters/the-man-with-the-golden-arm.jpg" alt="" class="film-card__poster">
  <p class="film-card__description">${curDescription}</p>
  <a class="film-card__comments">${countComments}</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
  </article>
  `;
}


export { createFilmCard };
