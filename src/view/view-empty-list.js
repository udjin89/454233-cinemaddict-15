import AbstractView from './abstract.js';
import { FilterType } from '../const.js';

const FILTERTYPES = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
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
  constructor(filterType = FilterType.ALL) {
    super();
    this._filterType = filterType; //сохраняем преданные данные
  }

  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией

    return createEmptyList(this._filterType);
  }
}
