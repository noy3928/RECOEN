export const convertDateFormat = (date: string | undefined) => {
  if (!date) return;
  const newDate = new Date(date);

  const day = newDate.getDate();
  const monthIndex = newDate.getMonth();
  const year = newDate.getFullYear();

  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  const month = months[monthIndex];

  const convertedDate = `${day} ${month} ${year}`;

  return convertedDate;
};
