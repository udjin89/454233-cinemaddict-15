import FilterView from './view/view-filter.js'; // Импортируем класс menu как MenuView
import SortView from './view/view-sort.js';
import ProfileView from './view/view-profile.js';
import FilmsSectionView from './view/view-films.js';
import FilmsListView from './view/view-films-list.js';
import FilmsListContainerView from './view/view-film-list-container.js';
import NoFilms from './view/view-empty-list.js';
import FilmCardView from './view/view-film-card.js';
import FooterStatView from './view/view-footer-statistics.js';
import ButtonShowMoreView from './view/view-show-more.js';
import FilmExtraListView from './view/view-film-extra.js';
import StatsView from './view/view-stats.js';

import FilmsModel from './model/movies.js';
import FilterModel from './model/filters.js';
import FilmListPresenter from './presenter/film-list.js';
import FilterPresenter from './presenter/filters.js';
import ProfilePresenter from './presenter/profile.js';
import StatsPresenter from './presenter/stats.js';
import { generateMovie } from './mock/generate-movie.js';
import { RenderPosition, render } from './utils/render.js';

import Api from './api.js';

import { sortType, UpdateType, UserAction, FilterType } from './const.js';

const FILMS_COUNT = 11;
const FILMS_BY_STEP = 5;
const AUTHORIZATION = 'Basic hS2sd999Swc99992j';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';

const siteBody = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterStatistics = document.querySelector('.footer__statistics');

const movies = new Array(FILMS_COUNT).fill().map(generateMovie);

const api = new Api(END_POINT, AUTHORIZATION);



const filmsModel = new FilmsModel(); // создаем класс модели списка фильмов
// filmsModel.setFilms(movies); // передаем в модель данные

const filterModel = new FilterModel();

const profilePresenter = new ProfilePresenter(siteHeaderElement, filmsModel);
profilePresenter.init();


const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
filterPresenter.init();

//siteMainElement - куда рендерим
//filmsModelм модель с данными (фильмов)
const filmsPresenter = new FilmListPresenter(siteMainElement, filmsModel, filterModel);
filmsPresenter.init(); //теперь мы не будем напрямую передавать данные, презентер сам возьмет их из модели

const statsPresenter = new StatsPresenter(siteMainElement, filmsModel);

const handleSiteMenuClick = (filterType) => {
  switch (filterType) {
    case FilterType.STATISTICS:
      filmsPresenter.hide();
      statsPresenter.show();
      break;
    case FilterType.ALL:
    case FilterType.WATCHLIST:
    case FilterType.FAVORITES:
    case FilterType.HISTORY:
      filmsPresenter.show();
      statsPresenter.hide();
  }

};
filterPresenter.setMenuClickHandler(handleSiteMenuClick);
statsPresenter.init();

//------------------------------------------------------
//++++++++++++++++++++++  EXTRA LIST  ++++++++++++++++++
//------------------------------------------------------
// создаем два экстра списка в секции films
// const sectionFilmsExtra =
// const topFilmRate = new FilmExtraListView('Top rates');
// // добавляем в секцию films -> films-list--extra
// render(sectionFilms, topFilmRate, RenderPosition.BEFOREEND);
// //создаем контейнер в films-list, в котором будут карточки фильмов
// const filmListContainerExtra = new FilmsListContainerView();
// //Добавляем контейнер в films-list--extra
// render(topFilmRate, filmListContainerExtra, RenderPosition.BEFOREEND);
// render(filmListContainerExtra.getElement(), new FilmCardView(movies[0]).getElement(), RenderPosition.BEFOREEND);
// render(filmListContainerExtra.getElement(), new FilmCardView(movies[1]).getElement(), RenderPosition.BEFOREEND);

// const mostComment = new FilmExtraListView('Most commented');
// render(sectionFilms.getElement(), mostComment.getElement(), RenderPosition.BEFOREEND);
// //создаем контейнер в films-list, в котором будут карточки фильмов
// const filmListContainerExtra2 = new FilmsListContainerView();
// render(mostComment.getElement(), filmListContainerExtra2.getElement(), RenderPosition.BEFOREEND);
// render(filmListContainerExtra2.getElement(), new FilmCardView(movies[4]).getElement(), RenderPosition.BEFOREEND);
// render(filmListContainerExtra2.getElement(), new FilmCardView(movies[5]).getElement(), RenderPosition.BEFOREEND);
//------------------------------------------------------
//++++++++++++++++++++++  FOOTER  ++++++++++++++++++++++
//------------------------------------------------------

render(siteFooterStatistics, new FooterStatView(), RenderPosition.BEFOREEND);

//------------------------------------------------------
//++++++++++++++++++++++  POPUP  ++++++++++++++++++++++
//------------------------------------------------------
// render(siteBody, new PopupView(movies[0]).getElement(), RenderPosition.BEFOREEND);

api.getFilms()
  .then((movies) => {
    console.log(movies);
    console.log('update INIT!');
    filmsModel.setFilms(UpdateType.INIT, movies);// передаем в модель данные
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });
