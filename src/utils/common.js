import dayjs from 'dayjs';
export const updateFilmById = (items, update) => {

  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }
  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};

export const sortByDate = (dateA, dateB) => (
  dayjs(dateA.filmInfo.date).diff(dayjs(dateB.filmInfo.date))
);

export const sortByRating = (a, b) => (
  a.filmInfo.totalRating > b.filmInfo.totalRating ? 1 : -1
);

export const shake = (element) => {
  element.classList.add('shake');
};
