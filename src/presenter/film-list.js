import FilmsListView from '../view/view-films-list.js';
import SortView from '../view/view-sort.js';
import StatsView from '../view/view-stats.js';
import ChartsView from '../view/view-chart.js';
import NoFilms from '../view/view-empty-list.js';
import LoadingView from '../view/view-loading.js';
import FilmsListContainerView from '../view/view-film-list-container.js';
import ButtonShowMoreView from '../view/view-show-more.js';
import { RenderPosition, render, removeComponent, replace } from '../utils/render.js';
import FilmCardPresenter from './film-card.js';
import PopupPresenter from './popup.js';
import { updateFilmById, sortByDate, sortByRating } from '../utils/common.js';
import { sortType, UpdateType, UserAction, FilterType } from '../const.js';
import { AbstractObserver } from '../model/abstract-observer.js';
import { filterTypeToFilterFilms } from '../utils/filter.js';

const siteMainElement = document.querySelector('.main');
const FILMS_BY_STEP = 5;
const Mode = {
  CLOSE: 'CLOSE',
  OPEN: 'OPEN',
};


export default class FilmList {
  constructor(filmsContainer, filmsModel, filterModel, api) {
    // console.log(api)
    this._filmsModel = filmsModel; //данные
    this._filmsContainer = filmsContainer; //контейнер куда рендерим
    this._filterModel = filterModel; //данные фильтра
    this._api = api;

    this._renderedFilmsCount = FILMS_BY_STEP; //хранит количество отрисованных фильмов
    this._currentSortType = sortType.DEFAULT;
    this._filterType = FilterType.ALL;
    this._filmCardPresenter = {};//
    this._isLoading = true;

    this._filmsList = new FilmsListView(); //films-list
    this._emptyList = new NoFilms(this._filterType);
    this._filmListContainer = new FilmsListContainerView();
    this._loadingComponent = new LoadingView();
    this._buttonShowMore = null;
    this._sortComponent = null;
    this._popupPresenter = null;

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

    if (filtredFilms.length === 0) {
      this._renderNoFilms(filterType);
    }

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

  _handleViewAction(actionType, updateType, update, mode) {
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    // mode - открыт ли попап
    // console.log('go-> ' + mode);
    // console.log(actionType, updateType, update);
    // this._filmsModel.updateFilmById(UpdateType.MINOR, update);
    // Здесь будем вызывать обновление модели.
    switch (actionType) {
      case UserAction.UPDATE_FILM:

        this._api.updateFilm(update).then((response) => {
          this._filmsModel.updateFilmById(updateType, response);
        });
        // this._filmsModel.updateFilmById(updateType, update);
        // this._filmCardPresenter[filmCard.id].replacePopup();
        break;
      case UserAction.ADD_COMMENT:
        // this._filmsModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        // this._filmsModel.deleteTask(updateType, update);
        break;
    }


  }

  _handleModelEvent(updateType, data) { // колбек, который предается в модель, она будет выполнена при изменении модели
    // console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:

    switch (updateType) {
      case UpdateType.PATCH:
        this._updatePopup(data);
        this._updateCard(data);
        break;
      case UpdateType.MINOR:
        // - обновить список, когда добавили в избранное, просмотренное или в список желаний
        // добавление и удаление комментария
        this._updatePopup(data);
        this._clearFilmsList();
        this._renderFilmList();
        // this._renderFilmCards();
        break;
      case UpdateType.MAJOR:
        // - обновить всё, когда поменяли фильтр
        // console.log('major data -> ' + data);

        this._clearFilmsList({ resetRenderedFilmsCount: true, resetSortType: true });

        const profile = new StatsView();
        const stats = new ChartsView(this._filmsModel);

        if (data === 'stats') {
          // this._clearFilmsList();

          render(siteMainElement, profile, RenderPosition.BEFOREEND);
          // const stats = new ChartsView(this._filmsModel);
          render(siteMainElement, stats, RenderPosition.BEFOREEND);
          return;
        }

        // removeComponent(profile);
        // removeComponent(stats);
        this._renderFilmList();

        // this._renderFilmCards();
        break;

      case UpdateType.INIT:
        this._isLoading = false;
        removeComponent(this._loadingComponent);
        this._renderFilmList();
        break;
    }
  }

  _updateCard(filmCard) {
    const presenter = this._filmCardPresenter[filmCard.id] || null;
    if (presenter !== null) {
      presenter.init(filmCard);
    }
  }

  _updatePopup(filmCard) {
    const presenter = this._popupPresenter;
    // console.log(presenter.isOpen(filmCard));
    if (presenter !== null && presenter.isOpen(filmCard)) {
      // presenter.init(filmCard);
      presenter.init(filmCard);
    }
  }

  _clearFilmsList({ resetRenderedFilmsCount = false, resetSortType = false } = {}) {
    Object.values(this._filmCardPresenter).forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};
    this._resetRenderedFilmsCount = resetRenderedFilmsCount ? FILMS_BY_STEP : Math.min(this._getFilmsList().length + FILMS_BY_STEP, this._renderedFilmsCount);
    // this._renderedFilmsCount = FILMS_BY_STEP;
    if (resetSortType) {
      this._currentSortType = sortType.DEFAULT;
    }
    removeComponent(this._emptyList);
    removeComponent(this._sortComponent);
    removeComponent(this._buttonShowMore);
  }

  _handleSortTypeChange(type) {
    if (this._currentSortType === type) {
      return;
    }
    this._currentSortType = type;
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

  _handleModeChange(film) {
    this._renderPopup(film);
    // console.log(this._filmCardPresenter);
    // Object.values(this._filmCardPresenter).forEach((presenter) => { presenter.closePopup(); });
  }

  _renderFilmCard(filmCard) {
    // Метод для рендеринга одного фильма
    const filmCardPresenter = new FilmCardPresenter(this._filmListContainer, this._handleViewAction, this._handleModeChange);
    filmCardPresenter.init(filmCard);
    //записываем в массив презентеры по id
    this._filmCardPresenter[filmCard.id] = filmCardPresenter;
  }

  _renderFilmCards(films) {
    // передали фильмы, которые нужно отрисовать
    films.forEach((film) => { this._renderFilmCard(film); });
  }

  _renderNoFilms() {
    removeComponent(this._loadingComponent);
    // Метод для рендеринга заглушки
    render(this._filmsList, this._emptyList, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    // console.log('work');
    render(siteMainElement, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {

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
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    // Главный метод по отрисовке, который будет вызывать остальные
    if (this._filmsModel.isEmpty()) {
      this._renderNoFilms();
      console.log('no film');
      return;
    }
    else {

      // получаем уже отсортированные фильмы с помощью this._getFilmsList()
      const films = this._getFilmsList();
      // получаем количество фильмов из модели
      const filmsCount = films.length;
      //рисуем вью сортировки
      this._renderSort();
      // вызываем метод отрисовки всех фильмов
      // console.log(films);
      this._renderFilmCards(films.slice(0, Math.min(filmsCount, FILMS_BY_STEP)));

      render(this._filmsContainer, this._filmsList, RenderPosition.BEFOREEND);
      render(this._filmsList, this._filmListContainer, RenderPosition.BEFOREEND);
      // this._renderSort();
      if (filmsCount > FILMS_BY_STEP) {
        this._renderButtonShowMore();
      }
    }
  }

  _renderPopup(film) {
    if (this._popupPresenter === null) {
      this._popupPresenter = new PopupPresenter(document.body, this._handleViewAction);
    }

    this._popupPresenter.init(film);
  }

  show() {
    this._emptyList.show();
    this._sortComponent.show();
    this._buttonShowMore.show();
    this._filmsList.show();
  }

  hide() {
    this._emptyList.hide();
    this._sortComponent.hide();
    this._buttonShowMore.hide();
    this._filmsList.hide();
  }

  _renderFilter() {
    //  Метод для рендеринга фильтров

  }
}
