import { generateComments } from '../mock/generate-comments.js';
import { getRandomInteger } from '../mock/utils.js';

const MIN_COUNT_DESCRIPTION = 1;
const MAX_COUNT_DESCRIPTION = 5;


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

const generateMovie = () => ({
  "id": "0",
  "comments": generateComments(),
  "film_info": {
    "title": "A Little Pony Without The Carpet",
    "alternative_title": "Laziness Who Sold Themselves",
    "total_rating": 5.3,
    "poster": "images/posters/blue-blazes.jpg",
    "age_rating": 0,
    "director": "Tom Ford",
    "writers": [
      "Takeshi Kitano"
    ],
    "actors": [
      "Morgan Freeman"
    ],
    "release": {
      "date": "2019-05-11T00:00:00.000Z",
      "release_country": "Finland"
    },
    "runtime": 77,
    "genre": [
      "Comedy"
    ],
    "description": generateDescription(),
  },
  "user_details": {
    "watchlist": false,
    "already_watched": true,
    "watching_date": "2019-04-12T16:12:32.554Z",
    "favorite": false
  }
});

export { generateMovie };
