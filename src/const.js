const VISUALLY_HIDDEN = 'visually-hidden';

const Emojis = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const sortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};
const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
  STATISTICS: 'stats',
};

const ShowPeriod = {
  ALL_TIME: 'all-time',
  DAY: 'day',
  WEEK: 'week',
  MOUTH: 'month',
  YEAR: 'year',
};

const PopupState = {
  DELETE: 'deleted',
  DISABLED: 'disabled',
  REJECTED: 'rejected',
  DEFAULT: 'default',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export { sortType, UserAction, UpdateType, FilterType, ShowPeriod, VISUALLY_HIDDEN, Emojis, PopupState, Method };
