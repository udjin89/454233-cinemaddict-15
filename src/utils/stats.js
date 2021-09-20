import dayjs from "dayjs";
import { ShowPeriod } from '../const.js';

const RATING_WATCHED = [
  { count: 1, rate: 'novice' },
  { count: 11, rate: 'fan' },
  { count: 21, rate: 'movie buff' },
];

const getWatchedFilms = (films) => (films.filter((film) => film.isWatched));

const countWatchedFilms = (films) => films.reduce((count, film) => film.isWatched && count++, 0);

const getRatingUser = (count) => RATING_WATCHED.find((item) => item.count >= count).rate;

const filterWatchedFilmsInPeriod = ({ films, period }) => {
  if (period === ShowPeriod.ALL_TIME) {
    return films;
  }
  films.filter((film) => {
    const dateNow = dayjs();
    return dayjs(film.watchingDate).isSame(dateNow, period);
  });
};

export { getRatingUser, countWatchedFilms, getWatchedFilms, filterWatchedFilmsInPeriod };
