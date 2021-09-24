import AbstractView from './abstract.js';

const createFilmsSection = () => (
  `<section class="films">
  </section>
  `
);

export default class filmsSection extends AbstractView {
  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией

    return createFilmsSection();
  }
}

