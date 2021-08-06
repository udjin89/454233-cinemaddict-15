import { generateComments } from '../mock/generate-comments.js';
import { getRandomInteger, getRandomFloat } from '../mock/utils.js';
import dayjs from 'dayjs';
const MIN_COUNT_DESCRIPTION = 1;
const MAX_COUNT_DESCRIPTION = 5;
const MIN_TIME = 30;
const MAX_TIME = 360;

const generateDate = () => {
  const maxDaysGap = 50;
  const daysGap = getRandomInteger(-maxDaysGap, 0);
  // console.log(dayjs().add(daysGap, 'year'));
  return dayjs().add(daysGap, 'year').format('YYYY');
};

const generatePoster = () => {
  const poster = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-dance-of-life.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];
  const randomIndex = getRandomInteger(0, poster.length - 1);
  return poster[randomIndex];
}
const generateTitle = () => {
  const title = [
    'The Dance of Life',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians',
    'Popeye the Sailor Meets Sindbad the Sailor',
    'The Great Flamarion',
    'Made for Each Other',
  ];
  const randomIndex = getRandomInteger(0, title.length - 1);
  return title[randomIndex];
}
const generateDescription = () => {
  const texts = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  const randomCountSentence = getRandomInteger(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION);

  let description = '';
  for (let i = 0; i < randomCountSentence; i++) {
    const randomIndex = getRandomInteger(0, texts.length - 1);
    description += texts[randomIndex];
  }

  return description;
}

const generateDirector = () => {
  const director = [
    'Tom Ford',
    'Anthony Mann',
    'Frank Darabont',
    'Peter Robert Jackson',
  ];
  const randomIndex = getRandomInteger(0, director.length - 1);
  return director[randomIndex];
}

const generateAlterTitle = () => {
  const title = [
    'Laziness Who Sold Themselves',
    'Alternative title',
    'Alternative title 2',
    'Alternative title 3',
    'Original: The Great Flamarion',
  ];
  const randomIndex = getRandomInteger(0, title.length - 1);
  return title[randomIndex];
}
const generateWriters = () => {
  const writer = [
    'Takeshi Kitano',
    'Anne Wigton',
    'Richard Weil',
    'Heinz Herald',
  ];
  // const randomIndex = getRandomInteger(0, writer.length - 1);
  // return writer[randomIndex];

  const randomCountWriters = getRandomInteger(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION);

  let writers = [];
  for (let i = 0; i < randomCountWriters; i++) {
    const randomIndex = getRandomInteger(0, writer.length - 1);
    // console.log(writer[randomIndex]);
    let exist = writers.find((elem) => { return elem == writer[randomIndex] });
    if (!exist) {
      writers.push(writer[randomIndex]);
    }

  }
  // console.log(writers);
  return writers;
}
const generateActors = () => {
  const actor = [
    'Morgan Freeman',
    'Erich von Stroheim',
    'Mary Beth Hughes',
    'Dan Duryea',
    'James Stewart',
    'Frank Sinatra',
    'John Mason',

  ];
  // const randomIndex = getRandomInteger(0, writer.length - 1);
  // return writer[randomIndex];

  const randomCountWriters = getRandomInteger(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION);

  let actors = [];
  for (let i = 0; i < randomCountWriters; i++) {
    const randomIndex = getRandomInteger(0, actor.length - 1);
    // console.log(writer[randomIndex]);
    let exist = actors.find((elem) => { return elem == actor[randomIndex] });
    if (!exist) {
      actors.push(actor[randomIndex]);
    }

  }
  // console.log(actors);
  return actors;
}
const generateCountry = () => {
  const country = [
    'Angola',
    'Vietnam',
    'Gibraltar',
    'Iraq',
    'Ireland',
    'Italy',
    'Canada',
    'Malaysia',
    'Nepal',
    'Turkey',
  ];
  const randomIndex = getRandomInteger(0, country.length - 1);
  return country[randomIndex];
}
const generateGenres = () => {
  const genre = [
    'Comedy',
    'Musical',
    'Western',
    'Drama',
    'Cartoon',
    'Film-Noir',
    'Mystery',

  ];
  const randomCountWriters = getRandomInteger(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION);

  let genres = [];
  for (let i = 0; i < randomCountWriters; i++) {
    const randomIndex = getRandomInteger(0, genre.length - 1);
    // console.log(writer[randomIndex]);
    let exist = genres.find((elem) => { return elem == genre[randomIndex] });
    if (!exist) {
      genres.push(genre[randomIndex]);
    }

  }
  return genres;
}

const generateMovie = () => ({
  "id": getRandomInteger(0, 5000000),
  "comments": generateComments(),
  "film_info": {
    "title": generateTitle(),
    "alternative_title": generateAlterTitle(),
    "total_rating": getRandomFloat(),
    "poster": generatePoster(),
    "age_rating": getRandomInteger(0, 18),
    "director": generateDirector(),
    "writers": generateWriters(),
    "actors": generateActors(),
    "release": {
      "date": generateDate(),
      "release_country": generateCountry(),
    },
    "runtime": getRandomInteger(MIN_TIME, MAX_TIME),
    "genre": generateGenres(),
    "description": generateDescription(),
  },
  "user_details": {
    "watchlist": Boolean(getRandomInteger(0, 1)),
    "already_watched": Boolean(getRandomInteger(0, 1)),
    "watching_date": generateDate(),
    "favorite": Boolean(getRandomInteger(0, 1)),
  }
});

export { generateMovie };
