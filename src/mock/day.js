let prevNumber = 0;

const generateNumber = () => {
  const number = prevNumber + 1;
  prevNumber = number;

  return number;
};

let prevDate = new Date();

const generateDate = () => {
  let date = new Date();
  date.setDate(prevDate.getDate() + 1);
  prevDate.setDate(date.getDate());

  return date;
};

export const generateDay = () => {
  return {
    number: generateNumber(),
    date: generateDate()
  };
};
