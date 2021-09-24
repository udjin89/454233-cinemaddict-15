import AbstractView from './abstract.js';

const createFilmsListContainer = () => (
  `<div class="films-list__container">

    </div>
  `
);

export default class filmsListContainer extends AbstractView {

  getTemplate() {
    return createFilmsListContainer();
  }
}
