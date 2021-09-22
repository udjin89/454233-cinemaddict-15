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
  // console.log(dateB);
  return dayjs(dateA.filmInfo.date).diff(dayjs(dateB.filmInfo.date));
};

export const sortByRating = (a, b) => {
  // console.log(a.filmInfo.totalRating + '-' + b.filmInfo.totalRating);
  return a.filmInfo.totalRating > b.filmInfo.totalRating ? 1 : -1;
};
