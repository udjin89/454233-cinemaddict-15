import { getRandomInteger } from '../utils/utils.js';
import dayjs from 'dayjs';

const MIN_COUNT_COMMENTS = 0;
const MAX_COUNT_COMMENTS = 5;

const generateDateComent = () => {
  const maxDaysGap = 7500;
  const daysGap = getRandomInteger(0, maxDaysGap);
  // console.log(dayjs().add(daysGap, 'year'));
  return dayjs().subtract(daysGap, 'minute').format('YYYY/M/D hh:mm');
};

const generateEmotion = () => {
  const emotions = ['smile', 'sleeping', 'puke', 'angry'];
  const randomIndex = getRandomInteger(0, emotions.length - 1);
  return emotions[randomIndex];
};


const generateAuthor = () => {
  const author = [
    'Tim Macoveev',
    'John Doe',
    'jim Boom',
    'Peter Smith',
  ];
  const randomIndex = getRandomInteger(0, author.length - 1);
  return author[randomIndex];
};
const generateDescriprtion = () => {
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

  const randomCountSentence = getRandomInteger(1, 4);

  let description = '';
  for (let i = 0; i < randomCountSentence; i++) {
    const randomIndex = getRandomInteger(0, texts.length - 1);
    description += texts[randomIndex];
  }

  return description;
};
const generateComments = () => {
  const randomCount = getRandomInteger(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS);
  let comments = [];
  for (let i = 0; i < randomCount; i++) {
    comments.push(generateComment(i));
  }
  return comments;
};
const generateComment = (i) => ({
  'id': i,
  'author': generateAuthor(),
  'comment': generateDescriprtion(),
  'date': generateDateComent(),
  'emotion': generateEmotion(),
});
export { generateComments };
