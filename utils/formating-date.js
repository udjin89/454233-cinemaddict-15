import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const formatDateToRelease = (date) => dayjs(date).format('D MMMM YYYY');

const formatDateToYear = (date) => dayjs(date).format('YYYY');


export { formatDateToRelease, formatDateToYear } ;
