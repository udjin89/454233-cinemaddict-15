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
import { generateMovie } from './mock/generate-movie.js';
import { RenderPosition, render } from './utils/render.js';
import { FilterType } from './const.js';

const FILMS_COUNT = 11;
const FILMS_BY_STEP = 5;

const siteBody = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterStatistics = document.querySelector('.footer__statistics');


//------------------------------------------------------
//+++++++++++ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ ФИЛЬМА ++++++++++
//------------------------------------------------------
// const renderCardFilm = (container, movie) => {
//   const cardFilm = new FilmCardView(movie); //Создаем класс с карточкой фильма
//   const cardPopup = new PopupView(movie);   //Создаем класс Попап из того же фильма

//   const openCardPopup = () => {
//     // render(siteBody, new PopupView(movie).getElement(), RenderPosition.BEFOREEND);
//     siteBody.appendChild(cardPopup.getElement());
//     siteBody.classList.add('hide-overflow');
//   };

//   const removeCardPopup = () => {
//     siteBody.removeChild(cardPopup.getElement());
//     siteBody.classList.remove('hide-overflow');
//   };

//   const onEscKeyDown = (evt) => {
//     if (evt.key === 'Escape' || evt.key === 'Esc') {
//       evt.preventDefault();
//       removeCardPopup();
//       document.removeEventListener('keydown', onEscKeyDown);
//     }
//   };

//   cardFilm.setClickFilm(() => {
//     openCardPopup();
//     document.addEventListener('keydown', onEscKeyDown);
//   });

//   cardPopup.setClosePopup(() => {
//     removeCardPopup();
//   });
//   render(container, cardFilm, RenderPosition.BEFOREEND);
// };

//------------------------------------------------------
//----генерация массива с карточками фильмов -----------
//------------------------------------------------------
const movies = new Array(FILMS_COUNT).fill().map(generateMovie);


const filmsModel = new FilmsModel(); // создаем класс модели списка фильмов
filmsModel.setFilms(movies); // передаем в модель данные

const filterModel = new FilterModel();
// console.log(filmsModel.getFilms());
//------------------------------------------------------
//+++++++++++++++++++++ ПРОФАЙЛ ++++++++++++++++++++++++
//------------------------------------------------------
// console.log(filmsModel);
const profilePresenter = new ProfilePresenter(siteHeaderElement, filmsModel);
profilePresenter.init();

// render(siteHeaderElement, new ProfileView(), RenderPosition.BEFOREEND);


// const statsPresenter = new StatsPresenter();
// statsPresenter.init();
//------------------------------------------------------
//++++++++++++++++++++++ MAIN ++++++++++++++++++++++++++
//------------------------------------------------------
//Вставляем в .main класс меню, создаем экземпляр класса, а метод getElement возвращает разметку, которая храниться в this._element

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
filterPresenter.init();

// render(siteMainElement, new FilterView(movies, FilterType.ALL), RenderPosition.BEFOREEND);
// render(siteMainElement, new SortView(), RenderPosition.BEFOREEND);
// render(siteMainElement, new StatsView(), RenderPosition.BEFOREEND);
//------------------------------------------------------
//++++++++++++++++++++++  Секция ФИЛЬМОВ  ++++++++++++++
//------------------------------------------------------
//siteMainElement - куда рендерим
//filmsModelм модель с данными (фильмов)
const filmsPresenter = new FilmListPresenter(siteMainElement, filmsModel, filterModel);
filmsPresenter.init(); //теперь мы не будем напрямую передавать данные, презентер сам возьмет их из модели
// filmsPresenter.init(movies);
// const sectionFilms = new FilmsSectionView(); // сохраняем в переменную класс с секцией, что бы потом обращаться к разметке методом getElement
// render(siteMainElement, sectionFilms, RenderPosition.BEFOREEND); // добавили секцию (пустая)

// //создаем секцию со списком, в которой будет еще контейнер
// const filmsList = new FilmsListView();
// // добавляем в секцию films, новую секцию films-list
// render(sectionFilms, filmsList, RenderPosition.BEFOREEND);

// if (!movies.length) {
//   render(filmsList, new NoFilms(), RenderPosition.BEFOREEND);
// }
// else {
//   //создаем контейнер в films-list, в котором будут карточки фильмов
//   const filmListContainer = new FilmsListContainerView();
//   render(filmsList, filmListContainer, RenderPosition.BEFOREEND);

//   for (let i = 0; i < Math.min(movies.length, FILMS_BY_STEP); i++) {
//     // console.log(movies[i]);
//     // render(filmListContainer.getElement(), new FilmCardView(movies[i]).getElement(), RenderPosition.BEFOREEND);
//     renderCardFilm(filmListContainer, movies[i]);
//   }
//------------------------------------------------------
//++++++++++++++++++++++  КНОПКА показать больше  ++++++
//------------------------------------------------------
// if (movies.length > FILMS_BY_STEP) {

//   const buttonShowMore = new ButtonShowMoreView(); // сохраняем класс с кнопкой для обращения по методу getElement()
//   render(filmsList, buttonShowMore, RenderPosition.BEFOREEND);

//   let renderedFilmsCount = FILMS_BY_STEP;
//   // console.log(siteFilmsList);
//   //получаем разметку из класса и уже на нее вешаем обработчик события.
//   buttonShowMore.setShowMore(() => {
//     movies.slice(renderedFilmsCount, renderedFilmsCount + FILMS_BY_STEP).forEach((movie) => renderCardFilm(filmListContainer, movie));

//     renderedFilmsCount += FILMS_BY_STEP;

//     if (renderedFilmsCount >= movies.length) {
//       buttonShowMore.getElement().remove(); // Как работает ? Почему удаляет из DOM ?
//       buttonShowMore.removeElement();
//     }
//   });
// }
// }

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
