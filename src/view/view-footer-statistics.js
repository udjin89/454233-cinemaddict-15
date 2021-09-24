import AbstractView from './abstract.js';

const createFooterStatistics = (countFilms) => (
  `<p>${countFilms} movies inside</p>
  `
);

export default class footerStat extends AbstractView {

  constructor(countFilms) {
    super();
    this.countFilms = countFilms;
  }

  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией

    return createFooterStatistics(this.countFilms);
  }
}
