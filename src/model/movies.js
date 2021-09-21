import AbstractObserver from './abstract-observer.js';
import { sortType, UpdateType, UserAction, FilterType } from '../const.js';

export default class Films extends AbstractObserver {
  constructor() {
    super();
    this._films = []; // храним тут список фильмов
  }

  setFilms(updateType, films) {
    // debugger;
    this._films = films.slice(); //записываем массив обьектов(фильмов), получение данных
    // console.log(this._films);
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
          alternativeTitle: film.film_info.alternative_title,
          totalRating: film.film_info.total_rating,
          poster: film.film_info.poster,
          ageRating: film.film_info.age_rating,
          director: film.film_info.director,
          writers: film.film_info.writers,
          actors: film.film_info.actors,
          release: film.film_info.release,
          runtime: film.film_info.runtime,
          genre: film.film_info.genre,
          description: film.film_info.description,
        },
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedFilm['due_date'];
    delete adaptedFilm['is_archived'];
    delete adaptedFilm['is_favorite'];
    delete adaptedFilm['repeating_days'];
    delete adaptedFilm['film_info'];
    delete adaptedFilm['user_details'];


    return adaptedFilm;
  }

  static adaptToServer(film) {
    // console.log('DATA' + task.dueDate);
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        ['user_details']: {
          'favorite': film.isFavorite,
          'already_watched': film.isWatched,
          'watchlist': film.isWatchlist,
          'watching_date': film.watchingDate,
        },

        ['film_info']: {
          'title': film.filmInfo.title,
          'alternative_title': film.filmInfo.alternativeTitle,
          'total_rating': film.filmInfo.totalRating,
          'poster': film.filmInfo.poster,
          'age_rating': film.filmInfo.ageRating,
          'director': film.filmInfo.director,
          'writers': film.filmInfo.writers,
          'actors': film.filmInfo.actors,
          'release': film.filmInfo.release,
          'runtime': film.filmInfo.runtime,
          'genre': film.filmInfo.genre,
          'description': film.filmInfo.description,

        },
        'due_date': film.dueDate instanceof Date ? film.dueDate.toISOString() : null, // На сервере дата хранится в ISO формате
        'is_archived': film.isArchive,
        // 'is_favorite': film.isFavorite,
        'repeating_days': film.repeating,
      },
    );
    console.log(adaptedFilm);
    // Ненужные ключи мы удаляем
    delete adaptedFilm.watchingDate;
    delete adaptedFilm.isWatched;
    delete adaptedFilm.isFavorite;
    delete adaptedFilm.isWatchlist;
    delete adaptedFilm.filmInfo;
    delete adaptedFilm.isWatchlist;
    return adaptedFilm;
  }
}
