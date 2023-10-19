export function formatDate(date) {
  const monthIndex = date.slice(5, 7);
  let month;
  if (monthIndex === '01') {
    month = 'January';
  } else if (monthIndex === '02') {
    month = 'February';
  } else if (monthIndex === '03') {
    month = 'March';
  } else if (monthIndex === '04') {
    month = 'April';
  } else if (monthIndex === '05') {
    month = 'May';
  } else if (monthIndex === '06') {
    month = 'June';
  } else if (monthIndex === '07') {
    month = 'July';
  } else if (monthIndex === '08') {
    month = 'August';
  } else if (monthIndex === '09') {
    month = 'September';
  } else if (monthIndex === '10') {
    month = 'October';
  } else if (monthIndex === '11') {
    month = 'November';
  } else if (monthIndex === '12') {
    month = 'December';
  }
  const day = date.slice(8, 10);

  const year = date.slice(0, 4);
  return `${month} ${day}, ${year}`;
}
