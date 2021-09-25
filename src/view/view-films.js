import AbstractView from './abstract.js';

const createFilmsSection = () => (
  `<section class="films">
  </section>
  `
);

export default class ViewFilms extends AbstractView {
  getTemplate() {

    return createFilmsSection();
  }
}

