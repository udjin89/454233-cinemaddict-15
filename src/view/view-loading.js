import AbstractView from './abstract.js';

const createLoadingList = () => (
  `<section class="films-list">
  <h2 class="films-list__title">Loading...</h2>
  </section>

  `
);

export default class ViewLoading extends AbstractView {
  getTemplate() {
    return createLoadingList();
  }
}
