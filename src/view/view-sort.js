import AbstractView from './abstract.js';

const createSort = () => (
  `<ul class="sort">
  <li><a href="#" class="sort__button">Sort by default</a></li>
  <li><a href="#" class="sort__button">Sort by date</a></li>
  <li><a href="#" class="sort__button sort__button--active">Sort by rating</a></li>
</ul>
`);
// Класс sort, экспортируем по умолчанию, для удобства
export default class sort extends AbstractView {
  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией

    return createSort();
  }
}
