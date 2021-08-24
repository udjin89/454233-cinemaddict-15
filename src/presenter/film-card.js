
import { RenderPosition, render } from './utils/render.js';

export default class FilmCard {

  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;

    this._filmsList = new FilmsListView();
    this._emptyList = new NoFilms();

  }

  init(film) {

  }

  _renderfilm() {
    // Метод для рендеринга одного фильма
  }

  _renderFilmCard() {
    // Главный метод по отрисовке, который будет вызывать остальные
  }
}
