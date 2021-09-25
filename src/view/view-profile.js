import AbstractView from './abstract.js';

const createProfile = (status) => (
  `<section class="header__profile profile">
    <p class="profile__rating">${status}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
   </section>
  `
);

export default class ViewProfile extends AbstractView {
  constructor(status) {
    super();
    this._status = status;
  }

  getTemplate() {
    return createProfile(this._status);
  }
}
