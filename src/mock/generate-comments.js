import { getRandomInteger } from '../mock/utils.js';

const MIN_COUNT_COMMENTS = 0;
const MAX_COUNT_COMMENTS = 5;

const generateEmotion = () => {
  const emotions = ["smile", "sleeping", "puke", "angry"];
  const randomIndex = getRandomInteger(0, emotions.length - 1);
  return emotions[randomIndex];
};

const generateComments = () => ({
  "id": "42",
  "author": "Ilya O'Reilly",
  "comment": "a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.",
  "date": "2019-05-11T16:12:32.554Z",
  "emotion": generateEmotion(),
});

export { generateComments };
