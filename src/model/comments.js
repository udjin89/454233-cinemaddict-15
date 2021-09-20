import AbstractObserver from './abstract-observer.js';

export default class Comments extends AbstractObserver {
  constructor() {
    super();
    this._comments = []; // храним тут список фильмов
  }

  setComments(updateType, comments) {
    this._comments = comments.slice(); //записываем массив обьектов(фильмов), получение данных
    this._notify(updateType, comments);
  }

  getComments() {
    return this._comments; //возвращаем список фильмов, тем кто вызовет этот метод
  }

  addComment(updateType, update) {

  }

  deleteComment(updateType, update) {

  }
}
