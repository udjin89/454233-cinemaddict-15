import { createElement } from '../utils/render.js';
import { VISUALLY_HIDDEN } from '../const.js';

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error('Can\'t instantiate Abstract, only concrete one.');
    }

    this._element = null;
    this._callback = {};
  }


  getTemplate() {
    throw new Error('Abstract method not implemented: getTemplate');
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  show() {
    this.getElement().classList.remove(VISUALLY_HIDDEN);
  }

  hide() {
    this.getElement().classList.add(VISUALLY_HIDDEN);
  }
}
