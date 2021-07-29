import { createNavigation } from './view/view-menu.js';
import { createProfile } from './view/view-profile.js';
import { createSort } from './view/view-sort.js';
import { createFooterStatistics } from './view/view-footer-statistics.js';
import { createFilmCard } from './view/view-film-card.js';
import { createFilmsListEmpty } from './view/view-films-list.js';
import { createButtonShowMore } from './view/view-show-more.js';
import { createFilmExtraList } from './view/view-film-extra.js';
import { createFilmsSection } from './view/view-films.js';

const FILMS_COUNT = 5;


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterStatistics = document.querySelector('.footer__statistics');

//header
render(siteHeaderElement, createProfile(), 'beforeend');
//main
render(siteMainElement, createNavigation(), 'beforeend');
render(siteMainElement, createSort(), 'beforeend');
//секция фильмов
render(siteMainElement, createFilmsSection(), 'beforeend');

const siteFilmsSection = siteMainElement.querySelector('.films');

render(siteFilmsSection, createFilmsListEmpty(), 'beforeend');

const siteFilmsList = siteFilmsSection.querySelector('.films-list');
const siteFilmsListContainer = siteFilmsList.querySelector('.films-list__container');

for (let i = 0; i < FILMS_COUNT; i++) {
  render(siteFilmsListContainer, createFilmCard(), 'beforeend');
}
// кнопка показать больше
render(siteFilmsList, createButtonShowMore(), 'beforeend');
// создаем два экстра списка в секции films
render(siteFilmsSection, createFilmExtraList(), 'beforeend');
render(siteFilmsSection, createFilmExtraList(), 'beforeend');

//footer
render(siteFooterStatistics, createFooterStatistics(), 'beforeend');
