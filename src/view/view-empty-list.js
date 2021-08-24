import AbstractView from './abstract.js';

const FILTERTYPES = {
  'allMovies': 'There are no movies in our database',
  'watchlist': 'There are no movies to watch now',
  'history': 'There are no watched movies now',
  'favorites': 'There are no favorite movies now',
};

const createEmptyList = (filterType) => (
  `<section class="films-list">
  <h2 class="films-list__title">${FILTERTYPES[filterType]}</h2>

  <!--
    Значение отображаемого текста зависит от выбранного фильтра:
      * All movies – 'There are no movies in our database'
      * Watchlist — 'There are no movies to watch now';
      * History — 'There are no watched movies now';
      * Favorites — 'There are no favorite movies now'.
  -->
</section>

  `
);

// Класс noFilms, экспортируем по умолчанию, для удобства
// Делаем его потомком от class Abstract
export default class noFilms extends AbstractView {
  constructor(filterType = 'allMovies') {
    super();
    this._filterType = filterType; //сохраняем преданные данные
  }

  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией

    return createEmptyList(this._filterType);
  }
}
