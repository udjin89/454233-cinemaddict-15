import AbstractView from './abstract.js';

const createProfile = () => (
  `<section class="header__profile profile">
  <p class="profile__rating">Movie buff</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
  `
);
// Класс profile, экспортируем по умолчанию, для удобства
export default class profile extends AbstractView {

  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией

    return createProfile();
  }
}
