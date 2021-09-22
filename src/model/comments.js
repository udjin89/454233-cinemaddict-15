import AbstractObserver from './abstract-observer.js';

export default class Comments extends AbstractObserver {
  constructor() {
    super();
    this._comments = {};
  }

  setComments(updateType, filmId, comments) {
    this._comments[filmId] = comments; //записываем массив обьектов(фильмов), получение данных
    this._notify(updateType, comments);
  }

  getComments(filmId) {
    return this._comments[filmId] || []; //возвращаем список фильмов, тем кто вызовет этот метод
  }

  has(filmId) {
    return this._comments[filmId];
  }

  removeComment(updateType, filmId, commentId) {
    const comments = this._comments[filmId];

    const index = comments.findIndex(({ id }) => id === commentId);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this._comments[filmId] = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1),
    ];


    this._notify(updateType, {
      filmId,
      comments: this._comments[filmId],
    });
  }

  static adaptToClient(comments) {
    return comments.map(({
      date,
      ...props
    }) => Object.assign({},
      props,
      {
        date: date === null ? date : new Date(date),
      },
    ));
  }

  static adaptToServer(comment) {
    return {
      comment: comment.comment,
      emotion: comment.emotion,
    };
  }

}
