import FilmsListView from '../view/view-films-list.js';
import SortView from '../view/view-sort.js';
import ViewEmptyList from '../view/view-empty-list.js';
import LoadingView from '../view/view-loading.js';
import FilmsListContainerView from '../view/view-film-list-container.js';
import ButtonShowMoreView from '../view/view-show-more.js';
import { RenderPosition, render, removeComponent } from '../utils/render.js';
import FilmCardPresenter from './film-card.js';
import PopupPresenter from './popup.js';
import { updateFilmById, sortByDate, sortByRating, isOnline } from '../utils/common.js';
import { sortType, UpdateType, UserAction, FilterType } from '../const.js';
import { filterTypeToFilterFilms } from '../utils/filter.js';

const siteMainElement = document.querySelector('.main');
const FILMS_BY_STEP = 5;
const Mode = {
  CLOSE: 'CLOSE',
  OPEN: 'OPEN',
};


export default class FilmList {
  constructor(filmsContainer, filmsModel, filterModel, commentsModel, api, statsPresenter) {
    this._statsPresenter = statsPresenter;
    this._filmsModel = filmsModel;
    this._filmsContainer = filmsContainer;
    this._filterModel = filterModel;
    this._commentsModel = commentsModel;
    this._api = api;

    this._renderedFilmsCount = FILMS_BY_STEP;
    this._currentSortType = sortType.DEFAULT;
    this._filterType = FilterType.ALL;
    this._filmCardPresenter = {};
    this._isLoading = true;

    this._filmsList = new FilmsListView();
    this._emptyList = new ViewEmptyList(this._filterType);
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
    const filterType = this._filterModel.getFilter();
    const filmData = this._filmsModel.getFilms().slice();
    const filtredFilms = filterTypeToFilterFilms[filterType](filmData);

    if (filtredFilms.length === 0) {
      this._renderNoFilms(filterType);
    }

    switch (this._currentSortType) {
      case sortType.DATE: return filtredFilms.sort(sortByDate);
      case sortType.RATING: return filtredFilms.sort(sortByRating);
    }

    return filtredFilms.slice();
  }

  _handleChangeFilm(updateFilm, modePopup) {
    this._films = updateFilmById(this._films, updateFilm);
    this._filmCardPresenter[updateFilm.id].init(updateFilm);

    if (modePopup === Mode.OPEN) {
      this._filmCardPresenter[updateFilm.id].replacePopup();

    }
  }

  _handleViewAction(actionType, updateType, update) {

    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._api.updateFilm(update).then((response) => {
          this._filmsModel.updateFilmById(updateType, response);
        });
        break;
      case UserAction.ADD_COMMENT:
        this._popupPresenter.setDisabledState();
        this._api.addComment(update.idFilm, update.comment)
          .then(({ movie, comments }) => {
            this._commentsModel.setComments(updateType, movie.id, comments);
            this._filmsModel.updateFilmById(updateType, movie);
            this._popupPresenter.resetInput();
          })
          .catch(() => {
            this._popupPresenter.setRejectedState();
            this._popupPresenter.shakeInputForm();
          })
          .finally(() => {
            setTimeout(this._popupPresenter.setDefaultState, 300);
          });
        break;
      case UserAction.DELETE_COMMENT:
        this._filmsModel.updateFilmById(updateType, update);
        break;
    }


  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._updatePopup(data);
        this._updateCard(data);
        break;
      case UpdateType.MINOR:
        this._updatePopup(data);
        this._clearFilmsList({ resetRenderedFilmsCount: false, resetSortType: false });
        this._renderFilmList();
        break;
      case UpdateType.MAJOR:
        this._clearFilmsList({ resetRenderedFilmsCount: true, resetSortType: true });
        this._renderFilmList();
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
    if (presenter !== null && presenter.isOpen(filmCard)) {
      presenter.init(filmCard);
    }
  }

  _clearFilmsList({ resetRenderedFilmsCount = false, resetSortType = false } = {}) {
    Object.values(this._filmCardPresenter).forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};
    this._renderedFilmsCount = resetRenderedFilmsCount ? FILMS_BY_STEP : Math.min(this._getFilmsList().length + FILMS_BY_STEP, this._renderedFilmsCount);

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
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._filmsContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _handleModeChange(film) {
    this._renderPopup(film);
  }

  _renderFilmCard(filmCard) {
    const filmCardPresenter = new FilmCardPresenter(this._filmListContainer, this._handleViewAction, this._handleModeChange);
    filmCardPresenter.init(filmCard);
    this._filmCardPresenter[filmCard.id] = filmCardPresenter;
  }

  _renderFilmCards(films) {
    films.forEach((film) => { this._renderFilmCard(film); });
  }

  _renderNoFilms() {
    removeComponent(this._loadingComponent);
    this._emptyList.setFilter(this._filterModel.getFilter());
    render(this._filmsList, this._emptyList, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    render(siteMainElement, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    const filmsCount = this._getFilmsList().length;
    const newRenderedFilmsCount = Math.min(filmsCount, this._renderedFilmsCount + FILMS_BY_STEP);
    const films = this._getFilmsList().slice(this._renderedFilmsCount, newRenderedFilmsCount);
    this._renderFilmCards(films);
    this._renderedFilmsCount = newRenderedFilmsCount;

    if (this._renderedFilmsCount >= filmsCount) {
      removeComponent(this._buttonShowMore);
    }
  }

  _renderButtonShowMore() {
    this._buttonShowMore = new ButtonShowMoreView();
    this._buttonShowMore.setShowMore(this._handleShowMoreButtonClick);

    render(this._filmsList, this._buttonShowMore, RenderPosition.BEFOREEND);
  }

  _renderFilmList() {
    if (this._isLoading) {

      this._renderLoading();
      return;
    }

    if (this._filmsModel.isEmpty()) {
      this._renderNoFilms();
    }
    else {
      const films = this._getFilmsList();
      const filmsCount = films.length;

      this._renderSort();
      this._renderFilmCards(films.slice(0, Math.min(filmsCount, this._renderedFilmsCount)));

      render(this._filmsContainer, this._filmsList, RenderPosition.BEFOREEND);
      render(this._filmsList, this._filmListContainer, RenderPosition.BEFOREEND);

      if (filmsCount > this._renderedFilmsCount) {
        this._renderButtonShowMore();
      }
    }
  }

  _renderPopup(film) {
    if (this._popupPresenter === null) {
      this._popupPresenter = new PopupPresenter(document.body, this._handleViewAction, this._commentsModel, this._api);
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

}
