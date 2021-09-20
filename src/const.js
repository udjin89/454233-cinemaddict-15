const VISUALLY_HIDDEN = 'visually-hidden';

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
  MONTH: 'month',
  YEAR: 'year',
};
export { sortType, UserAction, UpdateType, FilterType, ShowPeriod, VISUALLY_HIDDEN };
