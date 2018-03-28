export const formatDateObj = (date) => {
  const newDate = new Date(date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  let amPm = 'am';

  const convertHours = (hours) => {
    if (hours > 12) {
      amPm = 'pm';
      return hours - 12;
    } else  {
      return hours;
    }
  }

  return {
    year: newDate.getFullYear(),
    month: months[newDate.getMonth()],
    day: newDate.getDate(),
    hour: convertHours(newDate.getHours()),
    minute: newDate.getMinutes(),
    amPm: amPm,
  }
}

export const formatDate = (date) => {
  const dateObj = formatDateObj(date);
  const { year, month, day, hour, minute, amPm } = dateObj;
  return `${month} ${day}, ${year} ${hour}:${minute}${amPm}`;
}
