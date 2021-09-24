import dayjs from 'dayjs';
import { ShowPeriod } from '../const';


const RATING_WATCHED = [
  { count: 21, rate: 'movie buff' },
  { count: 11, rate: 'fan' },
  { count: 1, rate: 'novice' },
  { count: 0, rate: '' },
];

const getWatchedFilms = (films) => films.filter((film) => film.isWatched);

const getCountGenres = (genres, genre) => {
  const count = genres[genre];
  genres[genre] = count === undefined ? 1 : count + 1;
  return genres;
};

const getSortedGenre = (genres) => Object.entries(genres).map(([key, value]) => ({ genre: key, count: value })).sort((a, b) => b.count - a.count);


const getWatchedInfo = (films) => films.reduce((info, film) => {

  if (film.isWatched) {
    info.watched += 1;
    info.allTime += film.filmInfo.runtime;
    info.genres = film.filmInfo.genre.reduce(getCountGenres, info.genres);
  }

  return info;
}, {
  watched: 0,
  allTime: 0,
  genres: {

  },
});

const countWatchedFilms = (films) => films.reduce((count, film) => film.isWatched ? ++count : count, 0);

const getRatingUser = (count = 0) => (RATING_WATCHED.find((item) => item.count <= count).rate);

const filterWachedFilmsInPeriod = ({ films, period }) => {
  if (period === ShowPeriod.ALL_TIME) {
    return films;
  }

  return films.filter((film) => {
    const dateNow = dayjs();
    return dayjs(film.watchingDate).isSame(dateNow, period);
  });
};

export { getRatingUser, getWatchedFilms, countWatchedFilms, filterWachedFilmsInPeriod, getWatchedInfo, getSortedGenre };
