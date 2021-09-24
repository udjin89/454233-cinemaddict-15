import AbstractView from './abstract.js';

const createButtonShowMore = () => (
  `<button class="films-list__show-more">Show more</button>
  `
);

export default class buttonShow extends AbstractView {
  constructor() {
    super();
    this._clickButtonShowMore = this._clickButtonShowMore.bind(this);
  }

  getTemplate() {
    return createButtonShowMore();
  }

  _clickButtonShowMore(evt) {
    evt.preventDefault();
    this._callback.clickButtonShowMore();
  }

  setShowMore(callback) {
    this._callback.clickButtonShowMore = callback;
    this.getElement().addEventListener('click', this._clickButtonShowMore);
  }
}

