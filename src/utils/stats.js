

const RATING_WATCHED = [
  { count: 1, rate: 'novice' },
  { count: 11, rate: 'fan' },
  { count: 21, rate: 'movie buff' },
];

const getWatchedFilms = (films) => {

};

const getRatingUser = (films) => {
  let counter = 0;
  films.reduce((accumulator, currentValue) => {
    console.log(currentValue.isWatched);
    if (currentValue.isWatched) {
      counter++;
    }
  });
  console.log('getRatingUser - count->>' + counter);
  if (counter === 0) { return ''; }
  if (counter > 20) {
    console.log('movie buff');
    return 'movie buff';
  }
  if (counter < 21 && counter > 10) {
    console.log('fan');
    return 'fan';
  }
  if (counter < 11 && counter > 0) {
    console.log('novice');
    return 'novice';
  }
};

export { getRatingUser };
