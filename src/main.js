import { createNavigation } from './view/view-menu.js';
import { createProfile } from './view/view-profile.js';
import { createSort } from './view/view-sort.js';
import { createFooterStatistics } from './view/view-footer-statistics.js';
import { createFilmCard } from './view/view-film-card.js';
import { createFilmsListEmpty } from './view/view-films-list.js';
import { createButtonShowMore } from './view/view-show-more.js';
import { createFilmExtraList } from './view/view-film-extra.js';

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
render(siteMainElement, createFilmsListEmpty(), 'beforeend');

const siteFilmsList = siteMainElement.querySelector('.films-list__container');

for (let i = 0; i < 5; i++) {
  render(siteFilmsList, createFilmCard(), 'beforeend');
}

render(siteMainElement, createButtonShowMore(), 'beforeend');

render(siteMainElement, createFilmExtraList(), 'beforeend');
render(siteMainElement, createFilmExtraList(), 'beforeend');

//footer
render(siteFooterStatistics, createFooterStatistics(), 'beforeend');
