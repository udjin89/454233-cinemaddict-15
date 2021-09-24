import FooterStatView from './view/view-footer-statistics.js';

import FilmsModel from './model/movies.js';
import FilterModel from './model/filters.js';
import CommentsModel from './model/comments.js';
import FilmListPresenter from './presenter/film-list.js';
import FilterPresenter from './presenter/filters.js';
import ProfilePresenter from './presenter/profile.js';
import StatsPresenter from './presenter/stats.js';
import { RenderPosition, render } from './utils/render.js';

import Api from './api.js';

import { UpdateType, FilterType } from './const.js';

const AUTHORIZATION = 'Basic hS2sd999Swc99992j';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterStatistics = document.querySelector('.footer__statistics');

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();
const profilePresenter = new ProfilePresenter(siteHeaderElement, filmsModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
const filmsPresenter = new FilmListPresenter(siteMainElement, filmsModel, filterModel, commentsModel, api);
const statsPresenter = new StatsPresenter(siteMainElement, filmsModel);

const handleSiteMenuClick = (filterType) => {
  switch (filterType) {
    case FilterType.STATISTICS:
      filmsPresenter.hide();
      statsPresenter.init();
      statsPresenter.show();
      break;
    case FilterType.ALL:
    case FilterType.WATCHLIST:
    case FilterType.FAVORITES:
    case FilterType.HISTORY:
    default:
      filmsPresenter.show();
      statsPresenter.init();
      statsPresenter.hide();
  }
};

filterPresenter.setMenuClickHandler(handleSiteMenuClick);
profilePresenter.init();
filterPresenter.init();
filmsPresenter.init();

api.getFilms()
  .then((movies) => {
    filmsModel.setFilms(UpdateType.INIT, movies);
    render(siteFooterStatistics, new FooterStatView(filmsModel.getFilms().length), RenderPosition.BEFOREEND);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });

