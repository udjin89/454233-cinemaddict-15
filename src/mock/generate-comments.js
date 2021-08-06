import { getRandomInteger } from '../mock/utils.js';
import dayjs from 'dayjs';

const MIN_COUNT_COMMENTS = 0;
const MAX_COUNT_COMMENTS = 5;

const generateDateComent = () => {
  const maxDaysGap = 50;
  const daysGap = getRandomInteger(-maxDaysGap, 0);
  // console.log(dayjs().add(daysGap, 'year'));
  return dayjs().add(daysGap, 'year').format('YYYY/M/D');
};

const generateEmotion = () => {
  const emotions = ["smile", "sleeping", "puke", "angry"];
  const randomIndex = getRandomInteger(0, emotions.length - 1);
  return emotions[randomIndex];
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
  "id": i,
  "author": "Ilya O'Reilly",
  "comment": "111a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.",
  "date": generateDateComent(),
  "emotion": generateEmotion(),
});
export { generateComments };
