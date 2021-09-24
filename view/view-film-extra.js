import AbstractView from './abstract.js';

const createFilmExtraList = (title) => (
  `<section class="films-list films-list--extra">
  <h2 class="films-list__title">${title}</h2>
  </section>
  `
);
export default class filmExtraList extends AbstractView {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией

    return createFilmExtraList(this._title);
  }
}

