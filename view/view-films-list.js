import AbstractView from './abstract.js';

const createFilmsList = () => (
  `<section class="films-list">
    </section>
  `
);
// Класс filmsList, экспортируем по умолчанию, для удобства
export default class filmsList extends AbstractView {
  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией

    return createFilmsList();
  }
}
