export function formatDate(date: Date | string): string {
  let day, month, year;

  if (date instanceof Date) {
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
  } else if (typeof date === 'string') {
    const parsedDate = new Date(date);
    day = parsedDate.getDate();
    month = parsedDate.getMonth() + 1;
    year = parsedDate.getFullYear();
  } else {
    throw new Error('Invalid date format');
  }

  // Formatea la fecha como "DD/MM/YYYY"
  return `${day}/${month}/${year}`;
}
