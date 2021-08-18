import AbstractView from './abstract.js';

const createFilmsListContainer = () => (
  `<div class="films-list__container">

    </div>
  `
);
// Класс filmsListContainer, экспортируем по умолчанию, для удобства
export default class filmsListContainer extends AbstractView {

  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией
    return createFilmsListContainer();
  }
}
