import AbstractObserver from './abstract-observer.js';

export default class Films extends AbstractObserver {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {

    this._films = films.slice();

    this._notify(updateType, films);
  }

  getFilms() {
    return this._films;
  }

  updateFilmById(updateType, update) {
    const index = this._films.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }
    this._films = [...this._films.slice(0, index), update, ...this._films.slice(index + 1)];
    this._notify(updateType, update);
  }

  isEmpty() {
    return this._films.length === 0;
  }

  static adaptToClient(film) {

    const info = film.film_info;
    const release = film.film_info.release;
    const details = film.user_details;
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        watchingDate: details.watching_date !== null ? new Date(film.user_details.watching_date) : film.user_details.watching_date, // На клиенте дата хранится как экземпляр Date
        isWatched: details['already_watched'],
        isFavorite: details['favorite'],
        isWatchlist: details['watchlist'],

        filmInfo: {
          title: info.title,
          alternativeTitle: info.alternative_title,
          totalRating: info.total_rating,
          poster: info.poster,
          ageRating: info.age_rating,
          director: info.director,
          writers: info.writers,
          actors: info.actors,
          date: release.date !== null ? new Date(release.date) : release.date,
          country: release.release_country,
          runtime: info.runtime,
          genre: info.genre,
          description: info.description,
        },
      },
    );

    delete adaptedFilm['due_date'];
    delete adaptedFilm['is_archived'];
    delete adaptedFilm['is_favorite'];
    delete adaptedFilm['repeating_days'];
    delete adaptedFilm['film_info'];
    delete adaptedFilm['user_details'];


    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        ['user_details']: {
          'favorite': film.isFavorite,
          'already_watched': film.isWatched,
          'watchlist': film.isWatchlist,
          'watching_date': film.watchingDate instanceof Date ? film.watchingDate.toISOString() : film.watchingDate,
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
          'release': {
            'date': film.filmInfo.date instanceof Date ? film.filmInfo.date.toISOString() : film.filmInfo.date,
            'release_country': film.filmInfo.country,
          },
          'runtime': film.filmInfo.runtime,
          'genre': film.filmInfo.genre,
          'description': film.filmInfo.description,

        },
      },
    );
    delete adaptedFilm.watchingDate;
    delete adaptedFilm.isWatched;
    delete adaptedFilm.isFavorite;
    delete adaptedFilm.isWatchlist;
    delete adaptedFilm.filmInfo;
    delete adaptedFilm.isWatchlist;
    return adaptedFilm;
  }
}
