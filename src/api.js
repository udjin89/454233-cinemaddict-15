import MoviesModel from './model/movies.js';
import CommentModel from './model/comments.js';
import { sortType, UpdateType, UserAction, FilterType } from './const.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint; //ссылка на адрес сервера
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({ url: 'movies' })
      .then(Api.toJSON)
      .then((movies) => movies.map(MoviesModel.adaptToClient));
  }

  updateFilm(movie) {
    return this._load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(MoviesModel.adaptToServer(movie)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
      .then(Api.toJSON)
      .then(MoviesModel.adaptToClient);
  }


  getComments(filmID) {
    return this._load({ url: `comments/${filmID}`})
      .then(Api.toJSON)
      // .then((comment) => comment.map(CommentModel.adaptToClient));
  }

  addComment(filmID, comment) {
    return this._load({
      url: `comments/${filmID}`,
      method: Method.POST,
      body: JSON.stringify(CommentModel.adaptToServer(comment)),
      headers: new Headers({ 'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(({movie, comments}) => ({
        movie: MoviesModel.adaptToClient(movie),
        comments: CommentModel.adaptToClient(comments),
      }));
  }

  removeComment(commentId) {
    return this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE,
    });
  }


  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    return fetch(
      `${this._endPoint}/${url}`,
      { method, body, headers },
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
