import AbstractView from './abstract.js';

const createFilmsListContainer = () => (
  `<div class="films-list__container">

    </div>
  `
);
export default class ViewFilmsListContainer extends AbstractView {

  getTemplate() {
    return createFilmsListContainer();
  }
}
