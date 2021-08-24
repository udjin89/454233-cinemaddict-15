import FilmsListView from './view/view-films-list.js';
import NoFilms from './view/view-empty-list.js';
import FilmsListContainerView from './view/view-film-list-container.js';
import ButtonShowMoreView from './view/view-show-more.js';
import { RenderPosition, render } from './utils/render.js';
import FilmCardPresenter from './film-card.js';

const FILMS_BY_STEP = 5;

export default class FilmList {
  constructor(filmsContainer) {

    this._filmsContainer = filmsContainer;

    this._filmsList = new FilmsListView(); //films-list
    this._emptyList = new NoFilms();
    this._filmListContainer = new FilmsListContainerView();


  }

  init(films) {
    this._films = films.slice();
    // Метод для инициализации (начала работы) модуля,
    render(this._filmsContainer, this._filmsList, RenderPosition.BEFOREEND); // добавили секцию (пустая) films

    this._renderFilmList();
  }

  _renderProfile() {
    // Метод для рендеринга профайла с иконкой
  }

  _renderSort() {
    // Метод для рендеринга сортировки
  }

  _renderFilter() {
    //  Метод для рендеринга фильтров

  }

  _renderFilmCard(filmCard) {
    // Метод для рендеринга одного фильма
    const filmCardPresenter = new FilmCardPresenter(this._filmListContainer);
    filmCardPresenter.init(filmCard);
  }

  _renderFilmCards(from, to) {
    // Метод для рендеринга фильмов /from - с номера какого фильма отрисовываем, to - номер до какого отрисовываем
    for (let i = from; i < to; i++) {
      this._renderFilmCard(this._films[i]);
    }
  }

  _renderNoFilms(filterType) {
    // Метод для рендеринга заглушки
    switch (filterType) {

      case 'allMovies': render(this._filmsList, this._emptyList('allMovies'), RenderPosition.BEFOREEND); break;
      case 'watchlist': render(this._filmsList, this._emptyList('watchlist'), RenderPosition.BEFOREEND); break;
      case 'history': render(this._filmsList, this._emptyList('history'), RenderPosition.BEFOREEND); break;
      case 'favorites': render(this._filmsList, this._emptyList('favorites'), RenderPosition.BEFOREEND); break;
      default: render(this._filmsList, this._emptyList, RenderPosition.BEFOREEND); break;
    }

  }

  _renderButtonShowMore() {
    // Метод, куда уйдёт логика по отрисовке кнопки допоказа фильмов

    const buttonShowMore = new ButtonShowMoreView();
    render(this._filmsList, buttonShowMore, RenderPosition.BEFOREEND);

    let renderedFilmsCount = FILMS_BY_STEP;
    // console.log(siteFilmsList);
    //получаем разметку из класса и уже на нее вешаем обработчик события.
    buttonShowMore.setShowMore(() => {
      this._films.slice(renderedFilmsCount, renderedFilmsCount + FILMS_BY_STEP).forEach((movie) => renderCardFilm(this._filmListContainer, movie));

      renderedFilmsCount += FILMS_BY_STEP;

      if (renderedFilmsCount >= this._films.length) {
        buttonShowMore.getElement().remove(); // Как работает ? Почему удаляет из DOM ?
        buttonShowMore.removeElement();
      }
    });

  }

  _renderFilmList() {
    // Главный метод по отрисовке, который будет вызывать остальные
    if (!this._films.length) {
      this._renderNoFilms();
    }
    else {
      //создаем контейнер в films-list, в котором будут карточки фильмов
      render(this._filmsList, this._filmListContainer, RenderPosition.BEFOREEND);
      // вызываем метод отрисовки всех фильмов
      this._renderFilmCards(0, Math.min(this._films.length, FILMS_BY_STEP));

      if (this._films.length > FILMS_BY_STEP) {
        this._renderButtonShowMore();
      }
    }
  }
}
