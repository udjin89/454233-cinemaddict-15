import FilmsListView from '../view/view-films-list.js';
import SortView from '../view/view-sort.js';
import NoFilms from '../view/view-empty-list.js';
import FilmsListContainerView from '../view/view-film-list-container.js';
import ButtonShowMoreView from '../view/view-show-more.js';
import { RenderPosition, render, removeComponent, replace } from '../utils/render.js';
import FilmCardPresenter from './film-card.js';
import { updateFilmById, sortByDate, sortByRating } from '../utils/common.js';
import { sortType } from '../const.js';

const FILMS_BY_STEP = 5;
const Mode = {
  CLOSE: 'CLOSE',
  OPEN: 'OPEN',
};


export default class FilmList {
  constructor(filmsContainer) {

    this._filmsContainer = filmsContainer;

    this._renderedFilmsCount = FILMS_BY_STEP; //хранит количество отрисованных фильмов
    this._currentSortType = sortType.DEFAULT;
    this._filmCardPresenter = {};//

    this._filmsList = new FilmsListView(); //films-list
    this._emptyList = new NoFilms();
    this._filmListContainer = new FilmsListContainerView();
    this._buttonShowMore = new ButtonShowMoreView();
    this._sortComponent = new SortView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleChangeFilm = this._handleChangeFilm.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

  }

  init(films) {
    // Метод для инициализации (начала работы) модуля
    this._renderSort();
    this._defaultFilms = films.slice();
    this._films = films.slice();
    render(this._filmsContainer, this._filmsList, RenderPosition.BEFOREEND); // добавили секцию (пустая) films

    this._renderFilmList();
  }

  _handleChangeFilm(updateFilm, modePopup) {
    this._films = updateFilmById(this._films, updateFilm);
    this._filmCardPresenter[updateFilm.id].init(updateFilm);
    if (modePopup === Mode.OPEN) {
      console.log('State OPEn POPUP');
      this._filmCardPresenter[updateFilm.id].replacePopup();
      // this._filmCardPresenter[updateFilm.id].setButtonClosePopup();
    }
  }

  _clearFilmsList() {
    Object.values(this._filmCardPresenter).forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};
    this._renderedFilmsCount = FILMS_BY_STEP;
    removeComponent(this._buttonShowMore);
  }

  _sortFilms(type) {
    // console.log(type);
    switch (type) {
      case sortType.DATE: this._films.sort(sortByDate); break;
      case sortType.RATING: this._films.sort(sortByRating); break;
      default: this._films = this._defaultFilms.slice(); break;
    }
    this._currentSortType = type;
    // console.log('sort');
  }

  _handleSortTypeChange(type) {
    console.log(type);
    if (this._currentSortType === type) {
      return;
    }
    this._sortFilms(type);
    this._clearFilmsList();
    this._renderFilmList();
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    render(this._filmsContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilter() {
    //  Метод для рендеринга фильтров

  }

  _handleModeChange() {
    // console.log(this._filmCardPresenter);
    Object.values(this._filmCardPresenter).forEach((presenter) => { presenter.closePopup(); });
  }

  _renderFilmCard(filmCard) {
    // Метод для рендеринга одного фильма
    const filmCardPresenter = new FilmCardPresenter(this._filmListContainer, this._handleChangeFilm, this._handleModeChange);
    filmCardPresenter.init(filmCard);
    //записываем в массив презентеры по id
    this._filmCardPresenter[filmCard.id] = filmCardPresenter;
  }

  _renderFilmCards(from, to) {
    // Метод для рендеринга фильмов /from - с номера какого фильма отрисовываем, to - номер до какого отрисовываем
    //из списка всех фильмов "вырезаем" слайсом, те фильмы которые нужно отрендерить
    // потом с помощью forEach для каждого фильма вызываем рендер
    // !!! Важная особенность если to больше чем есть фильмов, то метод slice не создаст еще элеметов
    this._films.slice(from, to).forEach((elem) => {
      this._renderFilmCard(elem);
    });
  }

  _renderNoFilms() {
    // Метод для рендеринга заглушки
    render(this._filmsList, this._emptyList, RenderPosition.BEFOREEND);
    // switch (filterType) {

    //   case 'allMovies': render(this._filmsList, this._emptyList('allMovies'), RenderPosition.BEFOREEND); break;
    //   case 'watchlist': render(this._filmsList, this._emptyList('watchlist'), RenderPosition.BEFOREEND); break;
    //   case 'history': render(this._filmsList, this._emptyList('history'), RenderPosition.BEFOREEND); break;
    //   case 'favorites': render(this._filmsList, this._emptyList('favorites'), RenderPosition.BEFOREEND); break;
    //   default: render(this._filmsList, this._emptyList, RenderPosition.BEFOREEND); break;
    // }

  }

  _handleShowMoreButtonClick() {
    //отрисовываем карточки фильмов
    this._renderFilmCards(this._renderedFilmsCount, this._renderedFilmsCount + FILMS_BY_STEP);
    // прибавляем к счетчику
    this._renderedFilmsCount += FILMS_BY_STEP;
    // проверяем отрисованы ли все карточки фильмов
    if (this._renderedFilmsCount >= this._films.length) {
      removeComponent(this._buttonShowMore);
    }
  }

  _renderButtonShowMore() {
    // Отрисовка кнопки
    render(this._filmsList, this._buttonShowMore, RenderPosition.BEFOREEND);
    //на созданый класс кнопки вызываем метод, который определен внутри кнопки. Передаем туда колбек(он выполнится при клике)
    this._buttonShowMore.setShowMore(this._handleShowMoreButtonClick);

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
