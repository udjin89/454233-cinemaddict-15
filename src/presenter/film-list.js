import FilmsListView from '../view/view-films-list.js';
import SortView from '../view/view-sort.js';
import NoFilms from '../view/view-empty-list.js';
import FilmsListContainerView from '../view/view-film-list-container.js';
import ButtonShowMoreView from '../view/view-show-more.js';
import { RenderPosition, render, removeComponent, replace } from '../utils/render.js';
import FilmCardPresenter from './film-card.js';
import { updateFilmById, sortByDate, sortByRating } from '../utils/common.js';
import { sortType, UpdateType, UserAction, FilterType } from '../const.js';
import { AbstractObserver } from '../model/abstract-observer.js';
import { filterTypeToFilterFilms } from '../utils/filter.js';
const FILMS_BY_STEP = 5;
const Mode = {
  CLOSE: 'CLOSE',
  OPEN: 'OPEN',
};


export default class FilmList {
  constructor(filmsContainer, filmsModel, filterModel) {
    this._filmsModel = filmsModel; //данные
    this._filmsContainer = filmsContainer; //контейнер куда рендерим
    this._filterModel = filterModel; //данные фильтра

    this._renderedFilmsCount = FILMS_BY_STEP; //хранит количество отрисованных фильмов
    this._currentSortType = sortType.DEFAULT;
    this._filterType = FilterType.ALL;
    this._filmCardPresenter = {};//

    this._filmsList = new FilmsListView(); //films-list

    this._filmListContainer = new FilmsListContainerView();

    // this._buttonShowMore = new ButtonShowMoreView();
    // this._sortComponent = new SortView();

    this._buttonShowMore = null;
    this._sortComponent = null;

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleChangeFilm = this._handleChangeFilm.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);



  }

  init() {
    this._filterModel.addObserver(this._handleModelEvent);
    this._filmsModel.addObserver(this._handleModelEvent);
    // Метод для инициализации (начала работы) модуля
    this._renderSort();
    // console.log('init');
    // console.log(this._filmsModel.getFilms());
    // this._defaultFilms = films.slice();
    // this._films = films.slice();
    render(this._filmsContainer, this._filmsList, RenderPosition.BEFOREEND); // добавили секцию (пустая) films

    this._renderFilmList();
  }

  destroy() {
    this._clearFilmsList();
    this._filterModel.removeObserver(this._handleModelEvent);
    this._filmsModel.removeObserver(this._handleModelEvent);
  }

  _getFilmsList() {
    const filterType = this._filterModel.getFilter(); //забираем из модели тип фильтра
    const filmData = this._filmsModel.getFilms().slice();
    const filtredFilms = filterTypeToFilterFilms[filterType](filmData);

    // console.log(this._currentSortType);
    switch (this._currentSortType) {
      case sortType.DATE: return filtredFilms.sort(sortByDate);
      case sortType.RATING: return filtredFilms.sort(sortByRating);
      //default://получаем из модели, с помощью метода getFilms данные, то есть обьект со всеми фильмами
    }

    return filtredFilms.slice();
  }

  _handleChangeFilm(updateFilm, modePopup) {
    // здесь вызываем обновление модели

    this._films = updateFilmById(this._films, updateFilm);
    this._filmCardPresenter[updateFilm.id].init(updateFilm);

    if (modePopup === Mode.OPEN) {
      console.log('State OPEn POPUP');
      this._filmCardPresenter[updateFilm.id].replacePopup();
      console.log('State OPEn POPUPEdn');
      // this._filmCardPresenter[updateFilm.id].setButtonClosePopup();
    }
  }

  _handleViewAction(actionType, updateType, update) {
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    // console.log('go');
    console.log(actionType, updateType, update);
    this._filmsModel.updateFilmById(UpdateType.MINOR, update);
    // Здесь будем вызывать обновление модели.
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilmById(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        // this._filmsModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        // this._filmsModel.deleteTask(updateType, update);
        break;
    }


  }

  _handleModelEvent(updateType, data) {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        break;
      case UpdateType.MINOR:
        // - обновить список, когда добавили в избранное, просмотренное или в список желаний
        // добавление и удаление комментария
        this._clearFilmsList();
        this._renderFilmList();
        // this._renderFilmCards();
        break;
      case UpdateType.MAJOR:
        // - обновить всё, когда поменяли фильтр
        this._clearFilmsList();
        this._renderFilmList();
        // this._renderFilmCards();
        break;
    }
  }

  _clearFilmsList() {
    Object.values(this._filmCardPresenter).forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};
    this._renderedFilmsCount = FILMS_BY_STEP;
    removeComponent(this._buttonShowMore);
  }

  // _sortFilms(type) {
  //   // console.log(type);
  //   switch (type) {
  //     case sortType.DATE: this._films.sort(sortByDate); break;
  //     case sortType.RATING: this._films.sort(sortByRating); break;
  //     default: this._films = this._defaultFilms.slice(); break;
  //   }
  //   this._currentSortType = type;
  //   // console.log('sort');
  // }

  _handleSortTypeChange(type) {
    // console.log(type);
    if (this._currentSortType === type) {
      return;
    }
    this._currentSortType = type;
    // this._sortFilms(type);
    this._clearFilmsList();
    this._renderFilmList();
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    // render(this._filmsContainer, this._sortComponent, RenderPosition.BEFOREEND);
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._filmsContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderFilter() {
    //  Метод для рендеринга фильтров

  }

  _handleModeChange() {
    //this._renderPopup(film);
    // console.log(this._filmCardPresenter);
    Object.values(this._filmCardPresenter).forEach((presenter) => { presenter.closePopup(); });
  }
  //_renderPopup(film){
  //  this._popupPresenter = new FilmPopup()
  //}

  _renderFilmCard(filmCard) {
    // Метод для рендеринга одного фильма
    const filmCardPresenter = new FilmCardPresenter(this._filmListContainer, this._handleViewAction, this._handleModeChange);
    filmCardPresenter.init(filmCard);
    //записываем в массив презентеры по id
    this._filmCardPresenter[filmCard.id] = filmCardPresenter;
  }

  // _renderFilmCards(from, to) {
  //   // Метод для рендеринга фильмов /from - с номера какого фильма отрисовываем, to - номер до какого отрисовываем
  //   //из списка всех фильмов "вырезаем" слайсом, те фильмы которые нужно отрендерить
  //   // потом с помощью forEach для каждого фильма вызываем рендер
  //   // !!! Важная особенность если to больше чем есть фильмов, то метод slice не создаст еще элеметов
  //   this._films.slice(from, to).forEach((elem) => {
  //     this._renderFilmCard(elem);
  //   });
  // }
  _renderFilmCards(films) {
    // передали фильмы, которые нужно отрисовать
    films.forEach((film) => { this._renderFilmCard(film); });
  }

  _renderNoFilms() {
    // Метод для рендеринга заглушки
    this._emptyList = new NoFilms(this._filterType);


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
    // this._renderFilmCards(this._renderedFilmsCount, this._renderedFilmsCount + FILMS_BY_STEP);
    // прибавляем к счетчику
    // const newRenderedFilmsCount = Math.min(filmsCount, this._renderedFilmsCount + FILMS_BY_STEP);
    // получаем количество всех фильмов
    const filmsCount = this._getFilmsList().length;
    // вычисляем номер последнего фильма который надо дорисовать
    const newRenderedFilmsCount = Math.min(filmsCount, this._renderedFilmsCount + FILMS_BY_STEP);
    console.log(`отрисованные ${this._renderedFilmsCount}, отрисовать до ${newRenderedFilmsCount}`);
    // "вырезаем" из всего массива фильмов те, которые надо дорисовать
    const films = this._getFilmsList().slice(this._renderedFilmsCount, newRenderedFilmsCount);
    this._renderFilmCards(films);
    this._renderedFilmsCount = newRenderedFilmsCount;
    // проверяем отрисованы ли все карточки фильмов
    if (this._renderedFilmsCount >= filmsCount) {
      removeComponent(this._buttonShowMore);
    }
  }

  _renderButtonShowMore() {
    //создаем кнопку
    this._buttonShowMore = new ButtonShowMoreView();

    //на созданый класс кнопки вызываем метод, который определен внутри кнопки. Передаем туда колбек(он выполнится при клике)
    this._buttonShowMore.setShowMore(this._handleShowMoreButtonClick);
    // Отрисовка кнопки
    render(this._filmsList, this._buttonShowMore, RenderPosition.BEFOREEND);
  }

  _renderFilmList() {
    // Главный метод по отрисовке, который будет вызывать остальные
    if (this._filmsModel.isEmpty()) {
      this._renderNoFilms();
    }
    else {
      //создаем контейнер в films-list, в котором будут карточки фильмов
      render(this._filmsList, this._filmListContainer, RenderPosition.BEFOREEND);
      // получаем уже отсортированные фильмы с помощью this._getFilmsList()
      const films = this._getFilmsList();
      // получаем количество фильмов из модели
      const filmsCount = films.length;
      // вызываем метод отрисовки всех фильмов
      this._renderFilmCards(films.slice(0, Math.min(filmsCount, FILMS_BY_STEP)));
      // this._renderSort();
      if (filmsCount > FILMS_BY_STEP) {
        this._renderButtonShowMore();
      }
    }
  }


}
