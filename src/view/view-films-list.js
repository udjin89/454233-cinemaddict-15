import AbstractView from './abstract.js';

const createFilmsList = () => (
  `<section class="films-list">
    </section>
  `
);

export default class filmsList extends AbstractView {
  getTemplate() {

    return createFilmsList();
  }
}
