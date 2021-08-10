import { createMenu } from './view/view-menu.js';
import { createProfile } from './view/view-profile.js';
import { createSort } from './view/view-sort.js';
import { createFooterStatistics } from './view/view-footer-statistics.js';
import { createFilmCard } from './view/view-film-card.js';
import { createFilmsListEmpty } from './view/view-films-list.js';
import { createButtonShowMore } from './view/view-show-more.js';
import { createFilmExtraList } from './view/view-film-extra.js';
import { createFilmsSection } from './view/view-films.js';
import { createFilmDetails } from './view/view-popup.js';
import { generateMovie } from './mock/generate-movie.js';
import { generateFilter } from './mock/filter.js';
const FILMS_COUNT = 16;
const FILMS_BY_STEP = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterStatistics = document.querySelector('.footer__statistics');
//генерация массива с карточками фильмов -------------------------------------------------
const movies = new Array(FILMS_COUNT).fill().map(generateMovie);
const filter = generateFilter(movies);
// console.log(filter);


//header
render(siteHeaderElement, createProfile(), 'beforeend');
//main -------------------------------------------------
render(siteMainElement, createMenu(filter), 'beforeend');
render(siteMainElement, createSort(), 'beforeend');
//секция фильмов -------------------------------------------------
render(siteMainElement, createFilmsSection(), 'beforeend');

const siteFilmsSection = siteMainElement.querySelector('.films');

render(siteFilmsSection, createFilmsListEmpty(), 'beforeend');

const siteFilmsList = siteFilmsSection.querySelector('.films-list');
const siteFilmsListContainer = siteFilmsList.querySelector('.films-list__container');



for (let i = 0; i < Math.min(movies.length, FILMS_BY_STEP); i++) {
  // console.log(movies[i]);
  render(siteFilmsListContainer, createFilmCard(movies[i]), 'beforeend');
}
// кнопка показать больше -------------------------------------------------
if (movies.length > FILMS_BY_STEP) {

  render(siteFilmsList, createButtonShowMore(), 'beforeend');

  let renderedFilmsCount = FILMS_BY_STEP;

  const loadMoreFilms = siteFilmsList.querySelector('.films-list__show-more');

  loadMoreFilms.addEventListener('click', (evt) => {
    evt.preventDefault();
    movies.slice(renderedFilmsCount, renderedFilmsCount + FILMS_BY_STEP)
      .forEach((movie) => render(siteFilmsListContainer, createFilmCard(movie), 'beforeend'));

    renderedFilmsCount += FILMS_BY_STEP;

    if (renderedFilmsCount >= movies.length) {
      loadMoreFilms.remove();
    }
  });
}




// создаем два экстра списка в секции films
render(siteFilmsSection, createFilmExtraList(), 'beforeend');
render(siteFilmsSection, createFilmExtraList(), 'beforeend');

const siteFilmExtra = siteFilmsSection.querySelectorAll('.films-list--extra');
for (const film of siteFilmExtra) {
  const extraContainer = film.querySelector('.films-list__container');
  // render(extraContainer, createFilmCard(), 'beforeend');
  // render(extraContainer, createFilmCard(), 'beforeend');
}
//footer
render(siteFooterStatistics, createFooterStatistics(), 'beforeend');
//++++++++++++++++++++
// console.log('Start generate movie');
// console.log(generateMovie());

render(siteFooterStatistics, createFilmDetails(movies[0]), 'beforeend');

// console.log(movies[0]);
