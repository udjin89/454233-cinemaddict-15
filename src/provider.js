import FilmsModel from './model/movies.js';
import { isOnline } from './utils/common.js';
import { Method } from './const.js';

const getSyncedTasks = (items) =>
  items
    .filter(({ success }) => success)
    .map(({ payload }) => payload.task);

const createStoreStructure = (items) =>
  items
    .reduce((acc, current) => Object.assign({}, acc, {
      [current.id]: current,
    }), {});


export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const items = createStoreStructure(films.map(FilmsModel.adaptToServer));
          this._store.setItems(items);
          return films;
        });
    }

    const storeFilms = Object.values(this._store.getItems());

    return Promise.resolve(storeFilms.map(FilmsModel.adaptToClient));

  }

  getComments(filmID) {

    if (isOnline()) {
      return this._api.getComments(filmID)
        .then((films) => {
          // const items = createStoreStructure(films.map(FilmsModel.adaptToServer));
          this._store.setItems(films);
          return films;
        });
    }

    const storeFilms = Object.values(this._store.getItems());

    return Promise.resolve(storeFilms.map(FilmsModel.adaptToClient));
  }

  updateFilm(movie) {

    if (isOnline()) {
      return this._api.updateFilm(movie)
        .then((updateFilm) => {
          this._store.setItem(updateFilm.id, FilmsModel.adaptToServer(updateFilm));
          return updateFilm;
        });
    }

    this._store.setItem(movie.id, FilmsModel.adaptToServer(Object.assign({}, movie)));

    return Promise.resolve(movie);
  }

  sync() {
    if (isOnline()) {
      const storeFilms = Object.values(this._store.getItems());

      return this._api.sync(storeFilms)
        .then((response) => {
          // Забираем из ответа синхронизированные задачи
          const createdTasks = getSyncedTasks(response.created);
          const updatedTasks = getSyncedTasks(response.updated);

          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент.
          const items = createStoreStructure([...createdTasks, ...updatedTasks]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error('Sync data failed'));
  }
}
