import dayjs from 'dayjs';
export const updateFilmById = (items, update) => {
<<<<<<< HEAD
=======

>>>>>>> 051a8c2
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }
  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};

<<<<<<< HEAD
export const sortByDate = (dateA, dateB) => {
  dayjs(dateA.filmInfo.date).diff(dayjs(dateB.filmInfo.date));
};

export const sortByRating = (a, b) => {
  a.filmInfo.totalRating > b.filmInfo.totalRating ? 1 : -1;
};
=======
export const sortByDate = (dateA, dateB) => (
  dayjs(dateA.filmInfo.date).diff(dayjs(dateB.filmInfo.date))
);

export const sortByRating = (a, b) => (
  a.filmInfo.totalRating > b.filmInfo.totalRating ? 1 : -1
);
>>>>>>> 051a8c2

export const shake = (element) => {
  element.classList.add('shake');
};
