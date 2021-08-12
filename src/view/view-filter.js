import { createElement } from '../mock/utils.js';

const filmToFilterMap = {
  watchlist: (films) => films.filter((film) => film.isWatchlist).length,
  history: (films) => films.filter((film) => film.isWatched).length,
  favorites: (films) => films.filter((film) => film.idFavorite).length,
};

const generateFilter = (films) => Object.entries(filmToFilterMap).map(([filterName, countfilms]) => ({
  name: filterName,
  count: countfilms(films),
}),
);

const createFiltersTemplate = (filters) => {
  const filmFilter = generateFilter(filters);
  // console.log(filmFilter);
  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filmFilter[0].count}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filmFilter[1].count}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filmFilter[2].count}</span></a>
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};
// Класс filter, экспортируем по умолчанию, для удобства
export default class filter {
  constructor(filters) {
    this._filters = filters; //сохраняем преданные данные
    this._element = null; //здесь будет храниться DOM элемент
  }

  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией
    return createFiltersTemplate(this._filters);
  }

  getElement() {
    if (!this._element) { //Если в поле _element, ничего нет то мы присваиваем результат функции createElement
      //в createElement отправляем разметку
      //Разметка из метода getTemplate, который вызывает createFiltersTemplate
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
