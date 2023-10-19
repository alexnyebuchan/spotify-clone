export function formatMilliseconds(milliseconds, format) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let formattedTime = '';
  if (format === 'minSec') {
    if (hours > 0) {
      formattedTime += `${hours} hr `;
    }
    if (minutes > 0) {
      formattedTime += `${minutes} min `;
    }
    if (seconds > 0) {
      formattedTime += `${seconds} sec`;
    }
  } else if (format === 'simple') {
    if (hours > 0) {
      formattedTime += `${hours}:`;
    }
    if (minutes > 0) {
      formattedTime += `${minutes}:`;
    } else {
      formattedTime += `${minutes}:`;
    }
    if (seconds > 0) {
      if (seconds < 9) {
        formattedTime += `0${seconds}`;
      } else {
        formattedTime += seconds;
      }
    } else {
      formattedTime += `00`;
    }
  }

  return formattedTime;
}
