import AbstractView from './abstract.js';

const createFooterStatistics = (countFilms) => (
  `<p>${countFilms} movies inside</p>
  `
);

export default class ViewFooterStatistics extends AbstractView {

  constructor(countFilms) {
    super();
    this.countFilms = countFilms;
  }

  getTemplate() {

    return createFooterStatistics(this.countFilms);
  }
}
