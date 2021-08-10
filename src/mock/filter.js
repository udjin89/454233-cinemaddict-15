const filmToFilterMap = {
  watchlist: (films) => films.filter((film) => film.isWatchlist).length,
  history: (films) => films.filter((film) => film.isWatched).length,
  favorites: (films) => films.filter((film) => film.idFavorite).length,
};

const generateFilter = (films) => Object.entries(filmToFilterMap).map(([filterName, countfilms]) => ({
  name: filterName,
  count: countfilms(films),
}),
);
export { generateFilter };
