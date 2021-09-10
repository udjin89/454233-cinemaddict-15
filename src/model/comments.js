import AbstractObserver from './abstract-observer.js';

export default class Comments extends AbstractObserver {
  constructor() {
    super();
    this._comments = []; // храним тут список фильмов
  }

  setComments(comments) {
    this._comments = comments.slice(); //записываем массив обьектов(фильмов), получение данных
  }

  getComments() {
    return this._comments; //возвращаем список фильмов, тем кто вызовет этот метод
  }

  addComment(updateType, update) {

  }

  deleteComment(updateType, update) {

  }
}
