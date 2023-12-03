export const formateDateTime = (time) => {
  const originalDate = new Date(time);
  const day = originalDate.getDate();
  const month = originalDate.getMonth() + 1;
  const year = originalDate.getFullYear() % 100;

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  return formattedDate;
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const formatText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

export const titleCase = (title) => {
  return title[0]?.toUpperCase() + title?.slice(1);
};

