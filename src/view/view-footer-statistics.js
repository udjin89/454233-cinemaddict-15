import AbstractView from './abstract.js';

const createFooterStatistics = () => (
  `<p>130 23391 movies inside</p>
  `
);

export default class footerStat extends AbstractView {

  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией

    return createFooterStatistics();
  }
}
