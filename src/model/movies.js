import AbstractObserver from './abstract-observer.js';

export default class Films extends AbstractObserver {
  constructor() {
    super();
    this._films = []; // храним тут список фильмов
  }

  setFilms(films) {
    this._films = films.slice(); //записываем массив обьектов(фильмов), получение данных
  }

  getFilms() {
    return this._films; //возвращаем список фильмов, тем кто вызовет этот метод
  }

  updateFilmById(updateType, update) {
    // смотрим есть ли в нашем массиве из фильмов, фильм который нужно обновить
    // возвращаем индекс фильма, который мы должны обновить
    const index = this._films.findIndex((item) => item.id === update.id);

    //если не нашли
    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }
    // обновляем данные в нашей модели
    this._films = [...this._films.slice(0, index), update, ...this._films.slice(index + 1)];
    // вызываем метод, который уведомит всех подписчиков о изменении в модели
    // этот метод наследуется от абстрактного
    this._notify(updateType, update);
  }
}
