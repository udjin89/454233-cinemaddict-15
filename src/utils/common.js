import dayjs from 'dayjs';
export const updateFilmById = (items, update) => {
  // смотрим есть ли в нашем массиве из фильмов, фильм который нужно обновить
  // возвращаем индекс фильма, который мы должны обновить
  const index = items.findIndex((item) => item.id === update.id);

  //если не нашли
  if (index === -1) {
    return items;
  }
  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};

export const sortByDate = (dateA, dateB) => {

  return dayjs(dateA.filmInfo.release.date).diff(dayjs(dateB.filmInfo.release.date));
};
export const sortByRating = (rateA, rateB) => {

  return rateA - rateB;
};
