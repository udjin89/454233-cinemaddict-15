import AbstractObserver from './abstract-observer.js';
import { sortType, UpdateType, UserAction, FilterType } from '../const.js';

export default class Films extends AbstractObserver {
  constructor() {
    super();
    this._films = []; // храним тут список фильмов
  }

  setFilms(updateType, films) {
    this._films = films.slice(); //записываем массив обьектов(фильмов), получение данных
    this._notify(updateType, films);
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

  isEmpty() {
    return this._films.length === 0;
  }

  static adaptToClient(film) {
    // console.log('DATA -> ' + film.film_info.title);
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        watchingDate: film.user_details.watching_date !== null ? new Date(film.user_details.watching_date) : film.user_details.watching_date, // На клиенте дата хранится как экземпляр Date
        isWatched: film.user_details['already_watched'],
        isFavorite: film.user_details['favorite'],
        isWatchlist: film.user_details['watchlist'],
        filmInfo: {
          title: film.film_info.title,
        },
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedFilm['due_date'];
    delete adaptedFilm['is_archived'];
    delete adaptedFilm['is_favorite'];
    delete adaptedFilm['repeating_days'];

    return adaptedFilm;
  }

  static adaptToServer(task) {
    // console.log('DATA' + task.dueDate);
    const adaptedTask = Object.assign(
      {},
      task,
      {
        'due_date': task.dueDate instanceof Date ? task.dueDate.toISOString() : null, // На сервере дата хранится в ISO формате
        'is_archived': task.isArchive,
        'is_favorite': task.isFavorite,
        'repeating_days': task.repeating,
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedTask.dueDate;
    delete adaptedTask.isArchive;
    delete adaptedTask.isFavorite;
    delete adaptedTask.repeating;

    return adaptedTask;
  }
}
