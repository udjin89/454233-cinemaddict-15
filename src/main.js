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
import PopupView from './view/view-popup.js';

import { generateMovie } from './mock/generate-movie.js';
import { RenderPosition, render } from './mock/utils.js';

const FILMS_COUNT = 7;
const FILMS_BY_STEP = 5;

const siteBody = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterStatistics = document.querySelector('.footer__statistics');


//------------------------------------------------------
//+++++++++++ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ ФИЛЬМА ++++++++++
//------------------------------------------------------
const renderCardFilm = (container, movie) => {
  const cardFilm = new FilmCardView(movie); //Создаем класс с карточкой фильма
  const cardPopup = new PopupView(movie);   //Создаем класс Попап из того же фильма

  const openCardPopup = () => {
    // render(siteBody, new PopupView(movie).getElement(), RenderPosition.BEFOREEND);
    siteBody.appendChild(cardPopup.getElement());
    siteBody.classList.add('hide-overflow');
  };

  const removeCardPopup = () => {
    siteBody.removeChild(cardPopup.getElement());
    siteBody.classList.remove('hide-overflow');
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      removeCardPopup();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  cardFilm.getElement().querySelector('.film-card__poster').addEventListener('click', () => {
    openCardPopup();
    document.addEventListener('keydown', onEscKeyDown);
  });
  cardFilm.getElement().querySelector('.film-card__title').addEventListener('click', () => {
    openCardPopup();
    document.addEventListener('keydown', onEscKeyDown);
  });
  cardFilm.getElement().querySelector('.film-card__comments').addEventListener('click', () => {
    openCardPopup();
    document.addEventListener('keydown', onEscKeyDown);
  });
  cardPopup.getElement().querySelector('.film-details__close-btn').addEventListener('click', () => {
    removeCardPopup();
  });
  render(container.getElement(), cardFilm.getElement(), RenderPosition.BEFOREEND);
};

//------------------------------------------------------
//----генерация массива с карточками фильмов -----------
//------------------------------------------------------
const movies = new Array(FILMS_COUNT).fill().map(generateMovie);
//------------------------------------------------------
//+++++++++++++++++++++ ПРОФАЙЛ ++++++++++++++++++++++++
//------------------------------------------------------
render(siteHeaderElement, new ProfileView().getElement(), RenderPosition.BEFOREEND);
//------------------------------------------------------
//++++++++++++++++++++++ MAIN ++++++++++++++++++++++++++
//------------------------------------------------------
//Вставляем в .main класс меню, создаем экземпляр класса, а метод getElement возвращает разметку, которая храниться в this._element
render(siteMainElement, new FilterView(movies).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

//------------------------------------------------------
//++++++++++++++++++++++  Секция ФИЛЬМОВ  ++++++++++++++
//------------------------------------------------------

const sectionFilms = new FilmsSectionView(); // сохраняем в переменную класс с секцией, что бы потом обращаться к разметке методом getElement
render(siteMainElement, sectionFilms.getElement(), RenderPosition.BEFOREEND); // добавили секцию (пустая)

//создаем секцию со списком, в которой будет еще контейнер
const filmsList = new FilmsListView();
// добавляем в секцию films, новую секцию films-list
render(sectionFilms.getElement(), filmsList.getElement(), RenderPosition.BEFOREEND);

if (!movies.length) {
  render(filmsList.getElement(), new NoFilms().getElement(), RenderPosition.BEFOREEND);
}
else {
  //создаем контейнер в films-list, в котором будут карточки фильмов
  const filmListContainer = new FilmsListContainerView();
  render(filmsList.getElement(), filmListContainer.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < Math.min(movies.length, FILMS_BY_STEP); i++) {
    // console.log(movies[i]);
    // render(filmListContainer.getElement(), new FilmCardView(movies[i]).getElement(), RenderPosition.BEFOREEND);
    renderCardFilm(filmListContainer, movies[i]);
  }
  //------------------------------------------------------
  //++++++++++++++++++++++  КНОПКА показать больше  ++++++
  //------------------------------------------------------
  if (movies.length > FILMS_BY_STEP) {

    const buttonShowMore = new ButtonShowMoreView(); // сохраняем класс с кнопкой для обращения по методу getElement()
    render(filmsList.getElement(), buttonShowMore.getElement(), RenderPosition.BEFOREEND);

    let renderedFilmsCount = FILMS_BY_STEP;
    // console.log(siteFilmsList);
    //получаем разметку из класса и уже на нее вешаем обработчик события.
    buttonShowMore.getElement().addEventListener('click', (evt) => {
      evt.preventDefault();
      movies.slice(renderedFilmsCount, renderedFilmsCount + FILMS_BY_STEP)
        .forEach((movie) => render(filmListContainer.getElement(), new FilmCardView(movie).getElement(), RenderPosition.BEFOREEND));

      renderedFilmsCount += FILMS_BY_STEP;

      if (renderedFilmsCount >= movies.length) {
        buttonShowMore.getElement().remove(); // Как работает ? Почему удаляет из DOM ?
        buttonShowMore.removeElement();
      }
    });
  }
}

//------------------------------------------------------
//++++++++++++++++++++++  EXTRA LIST  ++++++++++++++++++
//------------------------------------------------------
// создаем два экстра списка в секции films
// const sectionFilmsExtra =
const topFilmRate = new FilmExtraListView('Top rates');
// добавляем в секцию films -> films-list--extra
render(sectionFilms.getElement(), topFilmRate.getElement(), RenderPosition.BEFOREEND);
//создаем контейнер в films-list, в котором будут карточки фильмов
const filmListContainerExtra = new FilmsListContainerView();
//Добавляем контейнер в films-list--extra
render(topFilmRate.getElement(), filmListContainerExtra.getElement(), RenderPosition.BEFOREEND);
render(filmListContainerExtra.getElement(), new FilmCardView(movies[0]).getElement(), RenderPosition.BEFOREEND);
render(filmListContainerExtra.getElement(), new FilmCardView(movies[1]).getElement(), RenderPosition.BEFOREEND);

const mostComment = new FilmExtraListView('Most commented');
render(sectionFilms.getElement(), mostComment.getElement(), RenderPosition.BEFOREEND);


//------------------------------------------------------
//++++++++++++++++++++++  FOOTER  ++++++++++++++++++++++
//------------------------------------------------------

render(siteFooterStatistics, new FooterStatView().getElement(), RenderPosition.BEFOREEND);

//------------------------------------------------------
//++++++++++++++++++++++  POPUP  ++++++++++++++++++++++
//------------------------------------------------------
// render(siteBody, new PopupView(movies[0]).getElement(), RenderPosition.BEFOREEND);
