// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloat = (a = 0, b = 10) => {
  return (Math.random() * 10).toFixed(1);
};

const getAttributeChecked = (isChecked = false) =>  isChecked ? 'checked' : '';

export { getRandomInteger, getRandomFloat, getAttributeChecked };
